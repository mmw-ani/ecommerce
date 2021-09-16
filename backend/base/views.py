from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from .products import products
from .models import Product,Order,OrderItem,ShippingAddress
from .serializers import ProductSerializer,UserSerializer,UserSerializerWithToken,OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user,many=False)

    data = request.data
    user.first_name = data['name']
    user.username=data['email']
    user.email=data['email']
    if(data['password']!=''):
        user.password=make_password(data['password'])

    user.save()
    return Response(serializer.data)


@api_view(['POST'])
def registeruser(request):
    try:
        data = request.data
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializers = UserSerializerWithToken(user,many=False)
        return Response(serializers.data)

    except:
        message = {'detail':'User exists'}
        return Response(message,status= status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getusers(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getproducts(request):
    product = Product.objects.all()
    serializer = ProductSerializer(product,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getproduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems)==0:
        return Response({'details':'No order items'},status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            itemsPrice=data['itemsPrice'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )

        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order = order,
                name=product.name,
                qty=i['qty'],
                price = i['price'],
                image = product.image.url,
            )

        product.countInStock-=item.qty
        product.save()

        serializer = OrderSerializer(order,many=False)
        return Response(serializer.data)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getmyorders(request):
    user = request.user
    order = user.order_set.all()
    serializer = OrderSerializer(order,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    
    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user==user:
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            return Response({'detail':'Not authorised to view this order'},status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order does not exist'},status=status.HTTP_400_BAD_REQUEST)

    