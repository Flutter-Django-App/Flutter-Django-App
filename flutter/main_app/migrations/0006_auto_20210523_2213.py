# Generated by Django 3.2.3 on 2021-05-23 22:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main_app', '0005_comment_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='photo',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='total_likes',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='user',
        ),
        migrations.RemoveField(
            model_name='like',
            name='photo',
        ),
        migrations.RemoveField(
            model_name='like',
            name='user',
        ),
        migrations.RemoveField(
            model_name='photo',
            name='total_comments',
        ),
        migrations.RemoveField(
            model_name='photo',
            name='total_likes',
        ),
        migrations.RemoveField(
            model_name='photo',
            name='user',
        ),
        migrations.AddField(
            model_name='comment',
            name='photo_id',
            field=models.ForeignKey(default=999, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='main_app.photo'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='comment',
            name='user_id',
            field=models.ForeignKey(default=999, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='auth.user'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='like',
            name='photo_id',
            field=models.ForeignKey(default=999, on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='main_app.photo'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='like',
            name='user_id',
            field=models.ForeignKey(default=999, on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='auth.user'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='photo',
            name='user_id',
            field=models.ForeignKey(default=999, on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='auth.user'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='comment',
            name='created_date',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='photo',
            name='caption',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='photo',
            name='created_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
