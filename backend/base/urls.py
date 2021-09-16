from django.urls import path
from . import views


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    path('users/register/',views.registeruser,name="register"),
    path('users/profile/',views.getUserProfile,name="users-profile"),
    path('users/profile/update/',views.updateUserProfile,name="users-profile-update"),
    path('users/',views.getusers,name="users"),
    path('products/',views.getproducts,name="products"),
    path('orders/add/',views.addOrderItems,name="orders-add"),
    path('orders/myorders/',views.getmyorders,name="myorders"),
    path('orders/<str:pk>/',views.getOrderById,name="user-order"),
    path('products/<str:pk>/',views.getproduct,name="product"),
]