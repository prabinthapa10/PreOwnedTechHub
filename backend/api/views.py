import json
import uuid
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import RegisterSerializers, UserSerializer, ProductSerializer, CartItemSerializer, OrderSerializer, OrderItemSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, IsAdminUser,  AllowAny
from django.db.models import Q
from decimal import Decimal
from django.shortcuts import redirect


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
        ram_filter = request.GET.getlist("ram") 
        storage_filter = request.GET.getlist("storage") 
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

        if ram_filter:
            products = products.filter(ram__in=ram_filter)

        if storage_filter:
            products = products.filter(storage__in=storage_filter)

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

# fitler options
class FilterOptionsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        price_ranges = ["Under 50000", "50000 - 100000", "100000 - 200000", "Over 200000"]
        category = request.GET.get("category", None)

        
        if not category:
            categories = Product.objects.values_list("category", flat=True).distinct()
            brands = Product.objects.values_list("brand", flat=True).distinct()
            conditions = Product.objects.values_list("condition", flat=True).distinct()
            rams = Product.objects.values_list("ram", flat=True).distinct()
            storages = Product.objects.values_list("storage", flat=True).distinct()

            return Response(
                {
                    "categories": list(categories),
                    "priceRange": price_ranges,
                    "brands": list(brands),
                    "conditions": list(conditions),
                    "ram": list(rams),
                    "storage": list(storages),
                },
                status=status.HTTP_200_OK
            )

        # Filter products by category
        products = Product.objects.filter(category=category)

        # Get distinct filter options
        brands = products.values_list("brand", flat=True).distinct()
        conditions = products.values_list("condition", flat=True).distinct()
        rams = products.values_list("ram", flat=True).distinct()
        storages = products.values_list("storage", flat=True).distinct()

        # Response
        filter_options = {
            "categories": category,
            "priceRange": price_ranges,
            "brands": list(brands),
            "conditions": list(conditions),
            "ram": list(rams),
            "storage": list(storages),
        }

        return Response(filter_options, status=status.HTTP_200_OK)

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
        quantity = request.data.get("quantity", 1)

        product = Product.objects.get(id=product_id)
        cart, _ = Cart.objects.get_or_create(user=user)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += int(quantity)
        cart_item.save()

        return Response({"message": "Item added to cart"}, status=200)
    

    def get(self, request):
        user = request.user 
        cart = Cart.objects.filter(user=user).first()  

        if cart is None:
            return Response({"message": "No cart found for the user"}, status=404)

        user_items = CartItem.objects.select_related('product').filter(cart=cart)

        serializer = CartItemSerializer(user_items, many=True)

        return Response(serializer.data)
    
    def delete(self, request, product_id):
        user = request.user

        # Check if the product exists
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)

        # Get user's cart
        cart = Cart.objects.filter(user=user).first()
        if not cart:
            return Response({"error": "Cart not found"}, status=404)

        # Check if the product is in the cart
        cart_item = CartItem.objects.filter(cart=cart, product=product).first()
        if not cart_item:
            return Response({"error": "Item not found in cart"}, status=404)

        # Delete the cart item
        cart_item.delete()

        return Response({"message": "Item removed from cart"}, status=200)
    
    def patch(self, request, cart_item_id):
        try:
            cart_item = CartItem.objects.get(id=cart_item_id, cart__user=request.user)
            new_quantity = request.data.get("quantity")

            if new_quantity is None:
                return Response({"error": "Quantity is required"}, status=400)

            try:
                new_quantity = int(new_quantity)
                if new_quantity <= 0:
                    return Response({"error": "Quantity must be greater than 0"}, status=400)
            except ValueError:
                return Response({"error": "Invalid quantity format"}, status=400)

            cart_item.quantity = new_quantity
            cart_item.save()
            return Response({"message": "Quantity updated successfully"}, status=200)

        except CartItem.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=404)

class OrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        # Fetch cart and cart items
        cart = Cart.objects.filter(user=user).first()
        if not cart:
            return Response({"error": "Cart not found"}, status=400)
            
        cart_items = CartItem.objects.filter(cart=cart)
        
        # Validate cart has items
        if not cart_items.exists():
            return Response({"error": "Your cart is empty"}, status=400)
            
        # Get address details from request data
        address = request.data.get("address")
        city = request.data.get("city")
        zip_code = request.data.get("zip_code")
        country = request.data.get("country")
        status = "Pending"
        discount = request.data.get("discount", 0)
        total_amount = request.data.get("total_amount", 0)

        # Convert to Decimal
        discount = Decimal(discount)
        total_amount = Decimal(total_amount)

        # Calculate grand total
        grand_total = total_amount - discount
        
        # Generate a unique purchase order ID
        purchase_order_id = f"ORD-{uuid.uuid4().hex[:8].upper()}"
        
        try:
            # Create the order
            order = Order.objects.create(
                user=user,
                purchase_order_id=purchase_order_id,
                total_amount=total_amount,
                address=address,
                city=city,
                zip_code=zip_code,
                country=country,
                status=status,
                discount=discount,
                grand_total=grand_total
            )
            
            # Create order items
            order_items = []
            for item in cart_items:
                order_item = OrderItem(
                    order=order,
                    product_name=item.product.name,
                    price=Decimal(item.product.price),
                    quantity=item.quantity
                )
                order_items.append(order_item)
            
            # Bulk create order items for better performance
            OrderItem.objects.bulk_create(order_items)
            
            # Clear the cart after successful order creation
            cart_items.delete()
            
            # Return success response with order details
            return Response({
                "message": "Order placed successfully!",
                "order_id": order.id,
                "purchase_order_id": purchase_order_id,
                "total_amount": float(total_amount),
                "items_count": len(order_items)
            }, status=201)
            
        except Exception as e:
            return Response({
                "error": "Failed to create order",
                "details": str(e)
            }, status=500)

    def get(self, request):
        user = request.user 
        # to get latest order
        order = Order.objects.filter(user=user).last()  
        if order is None:
            return Response({"message": "No order found for the user"}, status=404)

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=200)
 
class KhaltiPaymentInitiateView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        # Get data from the request body
        data = request.data
        purchase_order_id= data.get("purchase_order_id")
        url = "https://dev.khalti.com/api/v2/epayment/initiate/"
        payload = json.dumps({
            "return_url": data.get("return_url"),
            "website_url": data.get("website_url"),
            "amount": str(Decimal(data.get("amount", 10)) * 100),
            "purchase_order_id": data.get("purchase_order_id"),
            "purchase_order_name": data.get("purchase_order_name"),
            "customer_info": {
                "name":data.get("name"),
                "email":data.get("email"),  
            },
        })

        # Khalti API headers
        headers = {
            'Authorization': 'key 48a2f16a130d4cb18fb99eddbc09a754',
            'Content-Type': 'application/json',
        }   

        response = requests.post(url, headers=headers, data=payload)

        print('husddhushkfkh ', response.text)
        new_response = json.loads(response.text)
        print(new_response)
        return Response({"payment_url": new_response['payment_url']}, status=status.HTTP_200_OK)
    
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')  # Disable CSRF for this view
class KhaltiPaymentVerifyView(APIView):
    def post(self, request):
        try:
            # Parse request data
            data = request.data
            pidx = data.get("pidx")
            latest_order = Order.objects.latest('created_at')
            if not pidx:
                return Response({"error": "Missing pidx"}, status=status.HTTP_400_BAD_REQUEST)

            # Khalti API details
            KHALTI_URL = "https://a.khalti.com/api/v2/epayment/lookup/"
            HEADERS = {
                "Authorization": "Key 48a2f16a130d4cb18fb99eddbc09a754",
                "Content-Type": "application/json",
            }

            # Send request to Khalti
            response = requests.post(KHALTI_URL, json={"pidx": pidx}, headers=HEADERS)
            # userOrder = Order.objects.get(purchase_order_id=purchase_order_id)
            latest_order.status = "Completed"
            latest_order.save()
            # Handle response
            if response.status_code == 200:
                payment_data = response.json()

                # Check if the payment was successful
                if payment_data.get("status") == "Completed":
                    return Response({"message": "Payment Verified", "data": payment_data}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Payment Not Completed", "data": payment_data}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"error": "Failed to verify payment"}, status=response.status_code)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)