from django.urls import path
from . import views

urlpatterns = [
  path('', views.home, name='home'),
  path('photos/', views.photos_index, name='index'),
  path('photos/create/', views.create_photo, name='create_photo'),
  path('profile/', views.profile_page, name='profile'),
  path('profile/update/', views.profile_update, name='profile_update'),
  path('accounts/signup/', views.signup, name='signup'),
]