from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Creates and returns a regular user with email instead of username."""
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Creates and returns a superuser with email instead of username."""
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
