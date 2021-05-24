from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from .models import User, Photo, Comment, Like
from rest_framework import permissions, status
from django.views import generic
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import Photo_UserSerializer, UserSerializer, CommentSerializer, PhotoSerializer, LikeSerializer, UserSerializerWithToken
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from drf_multiple_model.views import ObjectMultipleModelAPIView


# Create your views here.

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @login_required
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
def allusers(request):
    # users = request.user
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    # user_serializer = UserSerializer(users, many=False)
    return Response(serializer.data)
    
@api_view(['GET'])
def photos_index(request):
    # users = request.user
    photos = Photo.objects.all()
    serializer = PhotoSerializer(photos, many=True)
    # user_serializer = UserSerializer(users, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def comments(request):
    # users = request.user
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    # user_serializer = UserSerializer(users, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def likes(request):
    # users = request.user
    likes = Like.objects.all()
    serializer = LikeSerializer(likes, many=True)
    # user_serializer = UserSerializer(users, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def create_photo(request):
  print("hitting")
  data = request.data
  photo = Photo.objects.create(
    caption=data['caption'],
    location=data['location'],
    url=data['url'],
    user=User.objects.get(id)
  )
  serializer = PhotoSerializer(photo, many=False)
  return Response(serializer.data)

@api_view(['POST'])
def create_comment(request):
  print("hitting")
  data = request.data
  comment = Comment.objects.create(
    comment=data['comment']
  )
  serializer = CommentSerializer(comment, many=False)
  return Response(serializer.data)

# @login_required
@api_view(['GET'])
def profile_page(request):
    user_profile = request.user
    serializer = UserSerializer(user_profile, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def profile_update(request):
  data = request.data
  print(data)
  user = User.objects.update_or_create(
    username=data['username'],
    first_name=data['first_name'],
    last_name=data['last_name'],
  )
  serializer = UserSerializer(data, many=False)
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

 
