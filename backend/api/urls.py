from django.contrib import admin
from django.urls import path, include
from .views import *


urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('user_list/', UserListView.as_view()),
    path('add_product/', ProductView.as_view()),
]