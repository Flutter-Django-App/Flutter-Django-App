from django.urls import path
from . import views
# from .views import current_user, UserList

urlpatterns = [
  path('', views.home, name='home'),
  path('photos/', views.photos_index, name='index'),
  path('comments/', views.comments, name='comments'),
  path('comments/create', views.create_comment, name='create_comment'),
  path('likes/', views.likes, name='likes'),
  path('photos/create/', views.create_photo, name='create_photo'),
  path('profile/', views.profile_page, name='profile'),
  path('profile/update/', views.profile_update, name='profile_update'),
  path('accounts/signup/', views.signup, name='signup'),
  path('current_user/', current_user),
  path('users/', UserList.as_view()),
  path('allusers/', views.allusers, name='allusers'),
] 