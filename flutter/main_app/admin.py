from django.contrib import admin

# Register your models here.
from .models import Profile_pic, User, Photo, Comment, Like, Tag

# admin.site.register(User)
admin.site.register(Photo)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Tag)
admin.site.register(Profile_pic)