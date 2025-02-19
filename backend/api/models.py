from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import BaseUserManager
import os

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None  # Remove username field
    email = models.EmailField(unique=True)  # Make email the primary identifier
    first_name = models.CharField(max_length=100, blank=True)  # First Name
    last_name = models.CharField(max_length=100, blank=True)  # Last Name
    phone_number = models.CharField(max_length=15, blank=True)  # Phone Number
    address = models.TextField(blank=True)  # Address
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])
    added_date = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"  # Use email for authentication
    REQUIRED_FIELDS = []  # No required fields other than email and password

    objects = UserManager()  # Assign the custom manager

    def __str__(self):
        return self.email


def product_image_upload_path(instance, filename):
    category = instance.product_category.lower().replace(" ", "_")
    return os.path.join("products", category, filename)

class Product(models.Model):
    product_name = models.CharField(max_length=100)
    product_description = models.TextField()
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Set a default image
    product_image = models.ImageField(upload_to=product_image_upload_path, default="products/default.jpg")
    
    product_category = models.CharField(
        max_length=100, 
        choices=[
            ("Smartphone", "Smartphone"),
            ("Laptop", "Laptop"),
            ("Tablet", "Tablet"),
            ("Smartwatch", "Smartwatch"),
        ]
    )
    product_brand = models.CharField(max_length=100)
    product_condition = models.CharField(max_length=100)
    added_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product_name
