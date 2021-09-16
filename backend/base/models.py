from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Product(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=200,null=True,blank=True)
    image = models.ImageField(null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    price = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    brand = models.CharField(max_length=200,null=True,blank=True)
    category = models.CharField(max_length=200,null=True,blank=True)
    subcategory = models.CharField(max_length=200,null=True,blank=True)
    rating = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    numReviews = models.IntegerField(null=True,blank=True,default=0)
    countInStock = models.IntegerField(null=True,blank=True,default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.name

class Review(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=200,blank=True,null=True)
    comment = models.TextField(blank=True,null=True)
    rating = models.IntegerField(blank=True,null=True,default=0)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.rating)

class Order(models.Model):
    user= models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    paymentMethod = models.CharField(max_length=200,blank=True,null=True)
    taxPrice = models.DecimalField(max_digits=7,decimal_places=2,blank=True,null=True)
    shippingPrice = models.DecimalField(max_digits=7,decimal_places=2,blank=True,null=True)
    totalPrice = models.DecimalField(max_digits=7,decimal_places=2,blank=True,null=True)
    itemsPrice = models.DecimalField(max_digits=7,decimal_places=2,blank=True,null=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key= True,editable=False)

    def __str__(self):
        return str(self.createdAt)

class OrderItem(models.Model):
    name = models.CharField(max_length=200,blank=True,null=True)
    order = models.ForeignKey(Order,on_delete=models.SET_NULL,null=True)
    price = models.DecimalField(max_digits=7,decimal_places=2,blank=True,null=True)
    qty = models.IntegerField(blank=True,null=True,default=0)
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    image = models.CharField(max_length=200,blank=True,null=True)
    _id = models.AutoField(primary_key= True,editable=False)

    def __str__(self):
        return self.name

class ShippingAddress(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE,null=True,blank=True)
    address = models.CharField(max_length=200,blank=True,null=True)
    city = models.CharField(max_length=200,blank=True,null=True)
    postalCode =models.IntegerField(blank=True,null=True,default=0)
    country = models.CharField(max_length=200,blank=True,null=True)
    shippingPrice = models.DecimalField(max_digits=7,decimal_places=2,blank=True,null=True)
    _id = models.AutoField(primary_key= True,editable=False)

    def __str__(self):
        return str(self.address)