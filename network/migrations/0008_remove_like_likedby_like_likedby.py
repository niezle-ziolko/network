# Generated by Django 4.1.1 on 2023-01-04 22:46

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0007_remove_follow_followed_by_alter_follow_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='like',
            name='likedBy',
        ),
        migrations.AddField(
            model_name='like',
            name='likedBy',
            field=models.ManyToManyField(blank=True, related_name='foo', to=settings.AUTH_USER_MODEL),
        ),
    ]