from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import RegisterSerializers, UserSerializer, ProductSerializer, CartItemSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, IsAdminUser,  AllowAny
from django.db.models import Q

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        serializer = RegisterSerializers(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
            "message": "user created",
            "status": True,
            "user": data
            }, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        data = request.data
        email = data.get('email') 
        password = data.get('password')

        if not email or not password:
            return Response({"message": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate the user using email and password
        user = User.objects.filter(email=email).first()  # Find user by email
        if user and user.check_password(password):
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": RegisterSerializers(user).data,
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh)
            }, status=status.HTTP_200_OK)

        return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user  
        serializer = UserSerializer(user)  
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class UserListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductView(APIView):
    # permission for admin 
    def get_permissions(self):
        if self.request.method in ['POST','DELETE']:
            return [IsAdminUser()] 
        return [AllowAny()] 

    def get(self, request):
        search_query = request.GET.get('search', '')
        category = request.GET.getlist("category") 
        min_price = request.GET.get("min_price")
        max_price = request.GET.get("max_price")
        brand_filter = request.GET.getlist("brand") 
        condition_filter = request.GET.getlist("condition") 
        products = Product.objects.all()

        if search_query:
            products = products.filter(
                Q(name__icontains=search_query) | Q(description__icontains=search_query)
            )
        # Category filter
        if category:
            products = products.filter(category__in=category)
        
        if min_price:
            products = products.filter(price__gte=min_price) 
        if max_price:
            products = products.filter(price__lte=max_price)

        if brand_filter:
            products = products.filter(brand__in=brand_filter)

        if condition_filter:
            products = products.filter(condition__in=condition_filter)

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        try:
            product = Product.objects.get(id = id)
            product.delete()
            return Response({"message": "Product deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

class LaptopView(APIView): 
    def get(self, request):
        products = Product.objects.filter(category="Laptop")  
        search_query = request.GET.get('search', '')
        category = request.GET.getlist("category") 
        min_price = request.GET.get("min_price")
        max_price = request.GET.get("max_price")
        brand_filter = request.GET.getlist("brand") 
        condition_filter = request.GET.getlist("condition") 
        products = Product.objects.all()

        if search_query:
            products = products.filter(
                Q(name__icontains=search_query) | Q(description__icontains=search_query)
            )
        # Category filter
        if category:
            products = products.filter(category__in=category)
        
        if min_price:
            products = products.filter(price__gte=min_price) 
        if max_price:
            products = products.filter(price__lte=max_price)

        if brand_filter:
            products = products.filter(brand__in=brand_filter)

        if condition_filter:
            products = products.filter(condition__in=condition_filter)

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SmartPhonesView(APIView): 
    def get(self, request):
        products = Product.objects.filter(category="Smartphone")
        search_query = request.GET.get('search', '')
        category = request.GET.getlist("category") 
        min_price = request.GET.get("min_price")
        max_price = request.GET.get("max_price")
        brand_filter = request.GET.getlist("brand") 
        condition_filter = request.GET.getlist("condition") 

        if search_query:
            products = products.filter(
                Q(name__icontains=search_query) | Q(description__icontains=search_query)
            )
        # Category filter
        if category:
            products = products.filter(category__in=category)
        
        if min_price:
            products = products.filter(price__gte=min_price) 
        if max_price:
            products = products.filter(price__lte=max_price)

        if brand_filter:
            products = products.filter(brand__in=brand_filter)

        if condition_filter:
            products = products.filter(condition__in=condition_filter)

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SmartwatchView(APIView): 
    def get(self, request):
        products = Product.objects.filter(category="Smartwatch")  
        search_query = request.GET.get('search', '')
        category = request.GET.getlist("category") 
        min_price = request.GET.get("min_price")
        max_price = request.GET.get("max_price")
        brand_filter = request.GET.getlist("brand") 
        condition_filter = request.GET.getlist("condition") 

        if search_query:
            products = products.filter(
                Q(name__icontains=search_query) | Q(description__icontains=search_query)
            )
        # Category filter
        if category:
            products = products.filter(category__in=category)
        
        if min_price:
            products = products.filter(price__gte=min_price) 
        if max_price:
            products = products.filter(price__lte=max_price)

        if brand_filter:
            products = products.filter(brand__in=brand_filter)

        if condition_filter:
            products = products.filter(condition__in=condition_filter)

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SpecificProduct(APIView):
    def get(self, request, id):  
        product = Product.objects.filter(id=id).first()
        if not product:
            return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductSerializer(product) 
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        product_id = request.data.get("product_id")
        # quantity = request.data.get("quantity", 1)

        product = Product.objects.get(id=product_id)
        cart, _ = Cart.objects.get_or_create(user=user)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity +=1
            # cart_item.quantity += int(quantity)
        cart_item.save()

        return Response({"message": "Item added to cart"}, status=200)
    

    def get(self, request):
        user = request.user 
        cart = Cart.objects.filter(user=user).first()  

        if cart is None:
            return Response({"message": "No cart found for the user"}, status=404)

        user_items = CartItem.objects.filter(cart=cart)

        serializer = CartItemSerializer(user_items, many=True)

        return Response(serializer.data)