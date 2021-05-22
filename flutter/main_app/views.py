from django.shortcuts import render
from .models import User, Photo, Comment, Like

# Create your views here.
def home(request):
    return render(request, 'home.html')

def photos_index(request):
    users = User.objects.all()
    photos = Photo.objects.all()
    comments = Comment.objects.all()
    likes = Like.objects.all()
    return render(request, 'photos/index.html', {
        'users': users,
        'photos': photos, 
        'comments': comments, 
        'likes' : likes 
    })
