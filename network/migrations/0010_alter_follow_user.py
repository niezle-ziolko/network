# Generated by Django 5.1.4 on 2024-12-27 06:45

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0009_tweet_like_delete_like'),
    ]

    operations = [
        migrations.AlterField(
            model_name='follow',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='foo', to=settings.AUTH_USER_MODEL),
        ),
    ]
