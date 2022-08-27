# Generated by Django 4.0.1 on 2022-07-13 14:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('discussions', '0003_comments_parent'),
    ]

    operations = [
        migrations.AddField(
            model_name='discussion',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='discussions', to=settings.AUTH_USER_MODEL),
        ),
    ]
