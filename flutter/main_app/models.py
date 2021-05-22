from django.db import models
from datetime import date
from django.contrib.auth.models import User


# # Create your models here.
# class User(models.Model):
#     first_name = models.CharField(max_length=25)
#     last_name = models.CharField(max_length=25)
#     email = models.CharField(
#         max_length=25, 
#         blank=False
#     )
#     password = models.CharField(
#         max_length=25,
#         # default=8,
#         blank=False
#     )
#     username = models.CharField(
#         max_length=25,
#         unique=True,
#         blank=False
#     )
#     created_date = models.DateField('user created date')

#     def __str__(self):
#         return self.username

class Photo(models.Model):
    total_likes = models.IntegerField()
    total_comments = models.IntegerField()
    caption = models.CharField(max_length=140)
    location = models.CharField(max_length=100)
    #below url is for storing the photo resource from AWS
    url = models.CharField(max_length=200)
    created_date = models.DateField('photo created date')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.caption

    # def __str__(self):
    #     return f"Photo for plant_id: {self.plant_id} @{self.url}"

class Comment(models.Model):
    total_likes = models.IntegerField()
    comment = models.TextField(
        max_length=140,
        blank=False
    )
    created_date = models.DateField('comment created date')
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.comment

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE)

# class Tag(models.Model):
#     name = models.CharField(max_length=15)
