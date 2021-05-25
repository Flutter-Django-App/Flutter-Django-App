from django.urls import path
from . import views

urlpatterns = [
    # Home
    path("", views.home, name="home"),
    # Photos
    path("photos/", views.photos_index, name="index"),
    path("photos/create/", views.create_photo, name="create_photo"),
    path("photos/<int:user_id>/add_photo/", views.add_photo, name="add_photo"),
    # Comments
    path("comments/", views.comments, name="comments"),
    path("comments/create/", views.create_comment, name="create_comment"),
    # Likes
    path("likes/", views.likes, name="likes"),
    # Profile
    path("profile/", views.profile_page, name="profile"),
    path("profile/update/", views.profile_update, name="profile_update"),
    # Sign Up
    path("accounts/signup/", views.signup, name="signup"),
    # Users
    path("current_user/", views.current_user),
    path("users/", views.UserList.as_view()),
    path("allusers/", views.allusers, name="allusers"),
]

