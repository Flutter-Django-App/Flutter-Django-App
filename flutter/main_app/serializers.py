from rest_framework import serializers
from .models import User, Photo, Comment, Like

class UserSerializer(serializers.ModelSerializer):
  class Meta: 
    model = User
    fields = '__all__'

class PhotoSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Photo
    fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Comment
    fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Like
    fields = '__all__'

class Photo_UserSerializer(serializers.Serializer):
  photos = PhotoSerializer(many=True)
  user = UserSerializer(many=False)