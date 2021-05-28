from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from rest_framework import permissions, status, authentication
from rest_framework import serializers, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.generic.edit import CreateView, UpdateView, DeleteView

from .models import Profile_pic, User, Photo, Comment, Like
from .serializers import (
    Photo_UserSerializer,
    UserSerializer,
    CommentSerializer,
    PhotoSerializer,
    LikeSerializer,
    UserSerializerWithToken,
    ProfilePhotoSerializer,
    UserUpdateSerializer
)
import uuid
import boto3

from django.http import HttpResponseRedirect
from django.views import generic
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin

# from drf_multiple_model.views import ObjectMultipleModelAPIView


# S3_BASE_URL = "https://s3-us-west-1.amazonaws.com/"
# BUCKET = "flutter-social-django-app"


### React Request Handlers ###

# Home

## No need for this anymore ##
@api_view(["GET"])
def home(request):
    print(request)
    return render(request, "home.html")  # return ""


# Photos


@api_view(["GET"])
def photos_index(request):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    photos = Photo.objects.all().order_by('-created_date')
    serializer = PhotoSerializer(photos, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def profilephoto_index(request):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    profile_photo = Profile_pic.objects.all() # match with user_id
    serializer = ProfilePhotoSerializer(profile_photo, many=True)
    print('========================================')
    print(profile_photo)
    print(request)
    return Response(serializer.data)


@api_view(['POST'])
def create_photo(request, user_id):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,) 
    # print('--------------------------------------')
    data = request.data
    # print(data)
    user = User.objects.get(id = user_id)
    photo = Photo.objects.create(
        caption=data["caption"],
        location=data["location"],
        url=data["url"],
        user=user  ## if we are using this view; user should be an the user.id, I think this might be the entire model
    )
    serializer = PhotoSerializer(photo, many=False)
    return Response(serializer.data)

# Profile Photo
@api_view(['POST'])
def add_profilephoto(request, user_id):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,) 
    print('--------------------------------------')
    data = request.data
    print(data)
    user = User.objects.get(id = user_id)
    profile_photo = Profile_pic.objects.create(
        url=data["url"],
        user=user  
    )
    serializer = ProfilePhotoSerializer(profile_photo, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_photo(request, photo_id):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    print('--------------------------------------')
    print(request)
    print(photo_id)
    data = request
    # user = User.objects.get(username= 'andrewhuang')
    # photo = Photo.objects.get(id=photo_id)
    # print(user_id)
    Photo.objects.get(id=photo_id).delete()
    # photos = Photo.objects.filter(id=photo_id).delete()
    photos = Photo.objects.all()
    serializer = PhotoSerializer(photos, many = True)
    # print(photos)
    return Response(serializer.data)


### ADDING VIA DJANGO ###
# def add_photo(request, user_id):
#     # photo-file will be the "name" attribute on the <input type="file">
#     photo_file = request.FILES.get("photo-file", None)
#     print(f'photo_file {photo_file}')

#     if photo_file:
#         s3 = boto3.client("s3")
#         # need a unique "key" for S3 / needs image file extension too
#         key = uuid.uuid4().hex[:6] + photo_file.name[photo_file.name.rfind(".") :]
#         # just in case something goes wrong
#         try:
#             s3.upload_fileobj(photo_file, BUCKET, key)
#             # build the full url string
#             url = f"{S3_BASE_URL}{BUCKET}/{key}"
#             # we can assign to user_id or user (if you have a user object)
#             Photo.objects.create(url=url, user_id=user_id)

#         except:
#             print("An error occurred uploading file to S3")
#     return redirect("index")


# Comments / Likes

@api_view(["GET"])
def comments(request):
    # users = request.user
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    # user_serializer = UserSerializer(users, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def create_comment(request, user_id, photo_id): ## not using user_id or photo_id
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    data = request.data
    user = User.objects.get(pk=data['user'])
    photo = Photo.objects.get(id=data['photo'])
    comment = Comment.objects.create(
        user = user,
        photo = photo,
        comment = data['comment'],
    )
    serializer = CommentSerializer(comment, many = False)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_comment(request, photo_id):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    print('--------------------------------------')
    print(request)
    print(photo_id)
    # print(user_id)
    data = request
    # user = User.objects.get(username= 'andrewhuang')
    # photo = Photo.objects.get(id=photo_id)
    Comment.objects.get(id=photo_id).delete()
    # photos = Photo.objects.filter(id=photo_id).delete()
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many = True)
    # print(photos)
    return Response(serializer.data)

@api_view(["GET"])
def likes(request):
    # users = request.user
    likes = Like.objects.all()
    serializer = LikeSerializer(likes, many=True)
    # user_serializer = UserSerializer(users, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def create_like(request, user_id, photo_id):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    data = request.data
    print('----------------------')

    print(data)
    user = User.objects.get(pk=data['user'])
    photo = Photo.objects.get(pk=data['photo'])
    like = Like.objects.create(
        user = user,
        photo = photo,  
    )
    serializer = LikeSerializer(like, many = False)
    return Response(serializer.data)


# Profile


@api_view(["GET"])
def profile_page(request):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    user_profile = request.user
    serializer = UserSerializer(user_profile, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
def profile_update(request, user_id):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    data = request.data
    print('=============================')
    print(data)
    user = User.objects.filter(id=user_id).update(
        username=data["username"],
        first_name=data['first_name'],
        last_name=data["last_name"],
        email=data['email'],
    )
    User.objects.get(id=user_id).save()
    updated_user = User.objects.get(id=user_id)
    print(updated_user)
    serializer = UserSerializer(updated_user, many=False)
    # print(serializer)
    print(serializer.data)
    return Response(serializer.data)


# Sign Up / Login


def signup(request):
    error_message = ""
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # This logs in the new user
            login(request, user)
            return redirect("index")
        else:
            error_message = "Invalid sign up - try again"
    # A bad POST (bad signup) or a GET request
    form = UserCreationForm()
    context = {"form": form, "error_message": error_message}
    return render(request, "registration/signup.html", context)


# Users


@api_view(["GET"])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(["GET"])
def allusers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

class UserList(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user_id = User.objects.last().id
            user = User.objects.get(id=user_id)
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


### Unknown Commented Out Code ###

# @login_required
# def home(request):
#     print("hello")
#     print(request.user)
#     user_name = request.user
#     user = User.objects.get(username=user_name)
#     print(user)
#     return render(request, 'home.html')


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
