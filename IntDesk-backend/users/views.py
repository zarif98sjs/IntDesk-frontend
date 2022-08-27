from cgitb import lookup
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from users.serializers import UserSerializer,RegisterSerializer
from users.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from rest_framework import viewsets, status
from django.db import transaction
from django.shortcuts import get_object_or_404

# Class based view to Get User Details using Token Authentication
class UserDetailAPI(APIView):
  authentication_classes = (TokenAuthentication,)
  permission_classes = (AllowAny,)

  def get(self,request,*args,**kwargs):
    user = User.objects.get(id=request.user.id)
    serializer = UserSerializer(user)
    return Response(serializer.data)

  def put(self,request,*args,**kwargs):
    user = User.objects.get(id=request.user.id)
    data = request.data
    if data.get('username') is not None : user.username = data['username']
    if data.get('email') is not None : user.email = data['email']
    if data.get('first_name') is not None : user.first_name = data['first_name']
    if data.get('last_name') is not None : user.last_name = data['last_name']
    # if data.get('password') is not None : user.password = data['password']
    if data.get('city') is not None : user.city = data['city']
    if data.get('country') is not None : user.country = data['country']
    if data.get('about') is not None : user.about = data['about']
    if data.get('occupation') is not None : user.occupation = data['occupation']
    if data.get('current_workplace') is not None : user.current_workplace = data['current_workplace']
    if data.get('website_link') is not None : user.website_link = data['website_link']
    if data.get('github_link') is not None : user.github_link = data['github_link']
    if data.get('languages') is not None : user.languages = data['languages']
    if data.get('skills') is not None : user.skills = data['skills']
    user.save()
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)

#Class based view to register user
class RegisterUserAPIView(generics.CreateAPIView):
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  authentication_classes = (TokenAuthentication,)
  permission_classes = (AllowAny,)
  lookup_field = 'username'
  

