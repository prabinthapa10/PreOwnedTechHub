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
    username = None  
    email = models.EmailField(unique=True)  
    first_name = models.CharField(max_length=100, blank=True)  
    last_name = models.CharField(max_length=100, blank=True)  
    phone_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)  # Address
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])
    added_date = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"  
    REQUIRED_FIELDS = [] 

    objects = UserManager()

    def __str__(self):
        return self.email


def product_image_upload_path(instance, filename):
    category = instance.category.lower().replace(" ", "_")
    return os.path.join("products", category, filename)

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    image = models.ImageField(upload_to=product_image_upload_path, default="products/default.jpg")
    
    category = models.CharField(
        max_length=100, 
        choices=[
            ("Smartphone", "Smartphone"),
            ("Laptop", "Laptop"),
            ("Smartwatch", "Smartwatch"),
        ],
        default="Laptop"
    )
    brand = models.CharField(max_length=100)
    condition = models.CharField(max_length=100,        
        choices=[
            ("New", "New"),
            ("Used - Like New", "Used - Like New"),
            ("Used - Good", "Used - Good"),
            ("Used - Fair", "Used - Fair"),
        ],
        default="New")
    stock = models.PositiveIntegerField(default=0)
    date = models.DateTimeField(auto_now=True)

    processor = models.CharField(max_length=255, blank=True, null=True)
    ram = models.CharField(max_length=50, blank=True, null=True)
    storage = models.CharField(max_length=50, blank=True, null=True)
    battery = models.CharField(max_length=50, blank=True, null=True)
    screen_size = models.CharField(max_length=20, blank=True, null=True)
    operating_system = models.CharField(max_length=100, blank=True, null=True)

    camera = models.CharField(max_length=50, blank=True, null=True)
    sim_slots = models.CharField(max_length=20, blank=True, null=True)

    gpu = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    front_image = models.ImageField(upload_to=product_image_upload_path)
    back_image = models.ImageField(upload_to=product_image_upload_path) 
    side_image = models.ImageField(upload_to=product_image_upload_path) 
    extra_image = models.ImageField(upload_to=product_image_upload_path) 


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Cart for {self.user.email}"
    def __str__(self):
        return f"image for {self.product.name}"
    
    def total_price(self):
        return sum(item.total_price() for item in self.items.all())

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.product.name}"

    def total_price(self):
        return self.product.price * self.quantity