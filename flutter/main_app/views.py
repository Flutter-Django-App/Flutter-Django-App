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

 
