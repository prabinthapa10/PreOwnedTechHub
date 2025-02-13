from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializers(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)  # Add confirm password field
    class Meta:
        model = User
        fields = ['email', 'password', 'confirm_password', 'first_name', 'last_name', 'phone_number', 'address', 'gender']

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Password and confirm password do not match")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')  # Remove confirm_password field
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone_number=validated_data.get('phone_number', ''),
            address=validated_data.get('address', ''),
            gender=validated_data['gender']
        )
        return user
