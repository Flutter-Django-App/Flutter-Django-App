from django.urls import path
from . import views
from .views import current_user, UserList

urlpatterns = [
  path('', views.home, name='home'),
  path('photos/', views.photos_index, name='index'),
  path('accounts/signup/', views.signup, name='signup'),
  path('current_user/', current_user),
  path('users/', UserList.as_view())
] 