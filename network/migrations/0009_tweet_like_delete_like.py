# Generated by Django 4.1.1 on 2023-01-05 13:39

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0008_remove_like_likedby_like_likedby'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='like',
            field=models.ManyToManyField(blank=True, related_name='likes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Like',
        ),
    ]