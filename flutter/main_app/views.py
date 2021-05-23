from django.shortcuts import render, redirect
from django.views import generic
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from rest_framework.response import Response
from .models import User, Photo, Comment, Like
from .serializers import Photo_UserSerializer, UserSerializer, CommentSerializer, PhotoSerializer, LikeSerializer
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from drf_multiple_model.views import ObjectMultipleModelAPIView

# Create your views here.

@login_required
def home(request):
    print("hello")
    print(request.user)
    user_name = request.user
    user = User.objects.get(username=user_name)
    print(user)
    return render(request, 'home.html')


# @login_required
# def photos_index(request):
#     users = User.objects.all()
#     photos = Photo.objects.all()
#     comments = Comment.objects.all()
#     likes = Like.objects.all()
#     return render(request, 'photos/index.html', {
#         'users': users,
#         'photos': photos, 
#         'comments': comments, 
#         'likes' : likes 
#     })


# @login_required
@api_view(['GET'])
def photos_index(request):
    # users = request.user
    photos = Photo.objects.all()
    serializer = PhotoSerializer(photos, many=True)
    # user_serializer = UserSerializer(users, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def home_page(request):
  user_name = request.user
  # print(user_name)
  user = User.objects.first()
  # print(user)
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)


# @api_view(['GET'])
# def photos_index(request):
#     # class TextAPIView(ObjectMultipleModelAPIView):
#         querylist = [
#             {'queryset': Photo.objects.all(),
#             'serializer_class': PhotoSerializer},
#             {'queryset': request.user,
#             'serializer_class': UserSerializer},
#         ]
#         return Response(querylist.data) 

def signup(request):
  error_message = ''
  if request.method == 'POST':
    form = UserCreationForm(request.POST)
    if form.is_valid():
      user = form.save()
      # This logs in the new user
      login(request, user)
      return redirect('index')
    else:
      error_message = 'Invalid sign up - try again'
  # A bad POST (bad signup) or a GET request
  form = UserCreationForm()
  context = {'form': form, 'error_message': error_message}
  return render(request, 'registration/signup.html', context)

 
