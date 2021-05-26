# Generated by Django 3.2.3 on 2021-05-25 23:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main_app', '0013_alter_photo_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='tags', to='main_app.Tag'),
        ),
        migrations.AlterField(
            model_name='photo',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL),
        ),
    ]
