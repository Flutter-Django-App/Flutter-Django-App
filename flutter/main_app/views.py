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
    UserUpdateSerializer,
)

## These were for AWS image upload and are no longer needed? ##
import uuid
import boto3

from django.http import HttpResponseRedirect
from django.views import generic
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin


# Photos


@api_view(["GET"])
def photos_index(request):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    photos = Photo.objects.all().order_by("-created_date")
    serializer = PhotoSerializer(photos, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def profilephoto_index(request):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    profile_photo = Profile_pic.objects.all()
    print(profile_photo)
    serializer = ProfilePhotoSerializer(profile_photo, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def create_photo(request, user_id):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    data = request.data
    user = User.objects.get(id=user_id)
    photo = Photo.objects.create(
        caption=data["caption"],
        location=data["location"],
        url=data["url"],
        user=user,
    )
    serializer = PhotoSerializer(photo, many=False)
    return Response(serializer.data)


@api_view(["POST"])
def add_profilephoto(request, user_id):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    data = request.data
    user = User.objects.get(id=user_id)
    profile_photo = Profile_pic.objects.update(user=user, url=data["url"],)
    serializer = ProfilePhotoSerializer(profile_photo, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
def delete_photo(request, photo_id):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    data = request
    Photo.objects.get(id=photo_id).delete()
    photos = Photo.objects.all()
    serializer = PhotoSerializer(photos, many=True)
    return Response(serializer.data)


# Comments / Likes


@api_view(["GET"])
def comments(request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def create_comment(request):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    data = request.data
    user = User.objects.get(pk=data["user"])
    photo = Photo.objects.get(id=data["photo"])
    comment = Comment.objects.create(
        user=user,
        photo=photo,
        comment=data["comment"],
    )
    serializer = CommentSerializer(comment, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
def delete_comment(request, photo_id):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    data = request
    Comment.objects.get(id=photo_id).delete()
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def likes(request):
    likes = Like.objects.all()
    serializer = LikeSerializer(likes, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def create_like(request, user_id, photo_id):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)
    data = request.data
    user = User.objects.get(pk=data["user"])
    photo = Photo.objects.get(pk=data["photo"])
    like = Like.objects.create(
        user=user,
        photo=photo,
    )
    serializer = LikeSerializer(like, many=False)
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
    user = User.objects.filter(id=user_id).update(
        username=data["username"],
        first_name=data["first_name"],
        last_name=data["last_name"],
        email=data["email"],
    )
    User.objects.get(id=user_id).save()
    updated_user = User.objects.get(id=user_id)
    serializer = UserSerializer(updated_user, many=False)
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

