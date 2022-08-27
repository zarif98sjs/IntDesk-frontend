from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

class User(User):

    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    about = models.TextField(blank=True)
    occupation = models.CharField(max_length=100, blank=True)
    current_workplace = models.CharField(max_length=100, blank=True)
    website_link = models.URLField(blank=True)
    github_link = models.URLField(blank=True)
    languages = ArrayField(models.CharField(max_length=100), blank=True, null=True)
    skills = ArrayField(models.CharField(max_length=100), blank=True, null=True)