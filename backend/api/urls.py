from django.contrib import admin
from django.urls import path, include
from .views import *


urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('user_list/', UserListView.as_view()),
    path('add_product/', ProductView.as_view()),
    path('product_list/', ProductView.as_view()),
    path('product_list/<int:id>/', ProductView.as_view()),
    path('laptop_list/', LaptopView.as_view()),
    path('smartwatch_list/', SmartwatchView .as_view()),
    path('smartphone_list/', SmartPhonesView.as_view()),
    path('specific_product/<int:id>/', SpecificProduct.as_view()),

]