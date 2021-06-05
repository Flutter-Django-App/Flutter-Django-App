from django.db import models
from datetime import date
from django.contrib.auth.models import User


class Tag(models.Model):
    tag = models.CharField(max_length=85)

    def __str__(self):
        return f"Tag: {self.tag}"


class Photo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    caption = models.CharField(max_length=500)
    location = models.CharField(max_length=100)
    url = models.CharField(max_length=200, null=False)

    created_date = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name="tags")

    def __str__(self):
        return f"Photo for user_id: {self.user_id} @{self.url}"


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    photo = models.ForeignKey(
        Photo, on_delete=models.CASCADE, related_name="comments"
    )
    comment = models.TextField(max_length=140, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (
            f"Comment on Photo-{self.photo_id} by User-{self.user_id}: {self.comment}"
        )


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name="likes")

    def __str__(self):
        return f"Photo-{self.photo_id} liked by User-{self.user_id}"


class Profile_pic(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="profile_pic"
    )
    url = models.CharField(max_length=200, null=False)

    def __str__(self):
        return f"Profile Photo-{self.user_id}: {self.url}"
