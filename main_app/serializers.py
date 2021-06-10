from django.db.models.query import prefetch_related_objects
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import Profile_pic, User, Photo, Comment, Like, Tag


class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    username = serializers.CharField(write_only=True)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    email = serializers.CharField(write_only=True)
    groups = serializers.CharField(write_only=True)
    user_permissions = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"


class PhotoSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)
    select_related_fields = ("user",)
    comments = CommentSerializer(many=True)
    likes = LikeSerializer(many=True)
    tags = TagSerializer(many=True)
    prefetch_related_fields = ("comments", "tags", "likes")

    class Meta:
        model = Photo
        fields = "__all__"


class Photo_UserSerializer(serializers.Serializer):
    photos = PhotoSerializer(many=True)
    user = UserSerializer(many=False)


class ProfilePhotoSerializer(serializers.Serializer):
    user = UserSerializer(many=False)
    select_related_fields = ("user")
   
    image_url = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = Profile_pic
        fields = ('user', 'url')

    def get_image_url(self, obj):
        return obj.url
