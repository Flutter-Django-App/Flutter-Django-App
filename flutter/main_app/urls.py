from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    # Home
    path("", views.home, name="home"),
    # Photos
    path("photos/", views.photos_index, name="index"),
    path("photos/create/", views.create_photo, name="create_photo"),
    path("photos/<int:user_id>/add_photo/", csrf_exempt(views.create_photo), name="create_photo"),
    path("photos/<int:photo_id>/delete_photo/", views.delete_photo, name="delete_photo"),
    # path('photos/<int:pk>/delete_photo/', views.PhotoDelete.as_view(), name='delete_photo'),

    # Comments
    path("comments/", views.comments, name="comments"),
    path("comments/<int:user_id>/create/<int:photo_id>/", views.create_comment, name="create_comment"),
    path("comments/<int:photo_id>/delete_comment/", views.delete_comment, name="delete_comment"),

    # Likes
    path("likes/", views.likes, name="likes"),
    path("likes/<int:user_id>/create/<int:photo_id>/", views.create_like, name="create_like"),
    # Profile
    path("profile/", views.profile_page, name="profile"),
    # path("profile/update/", views.profile_update, name="profile_update"),
    path("profile/<int:user_id>/", views.profile_update, name="profile_update"),
    # Sign Up
    path("accounts/signup/", views.signup, name="signup"),
    # Users
    path("current_user/", views.current_user),
    path("users/", views.UserList.as_view()),
    path("allusers/", views.allusers, name="allusers"),
]

