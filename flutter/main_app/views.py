from django.shortcuts import render
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Photo, Comment, Like
from .serializers import UserSerializer, CommentSerializer, PhotoSerializer, LikeSerializer

# Create your views here.

# def home(request):
#     return render(request, 'home.html')

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

@api_view(['GET'])
def photos_index(request):
    photos = Photo.objects.all()
    serializer = PhotoSerializer(photos, many=True)
    return Response(serializer.data)

 
