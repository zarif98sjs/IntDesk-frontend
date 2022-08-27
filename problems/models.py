import imp
from django.conf import settings
from django.db import models
from django.utils import timezone


class Company(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Role(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    # one to many relation
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories', null=False)
    
    def __str__(self):
        return self.name
class Problem(models.Model): 
    # localhost:8000/problems/problem/1/companies
    name = models.CharField(max_length=100)
    description = models.TextField()
    time_limit = models.DecimalField(max_digits=5, decimal_places=2, default=1.00)
    memory_limit = models.IntegerField(default=256)
    # time_limit = models.CharField(max_length=20, default="1s")
    # memory_limit = models.CharField(max_length=20, default="256MB")
    difficulty = models.CharField(max_length=20, default="Easy", choices=[
        ("Easy", "Easy"), ("Medium", "Medium"),("Hard", "Hard")])
    submission_count = models.IntegerField(default=0)
    solve_count = models.IntegerField(default=0)

    # many to many relation fields
    companies = models.ManyToManyField(Company, related_name="problems")
    roles = models.ManyToManyField(Role, related_name="problems")
    subcategories = models.ManyToManyField(SubCategory, related_name="problems")

    

    def __str__(self):
        return self.name

class InputOutput(models.Model):

    input = models.TextField()
    output = models.TextField()
    points = models.IntegerField(default=0)

    # one to many relation
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='input_outputs', null=False)
    
    def __str__(self):
        return self.input


class BookMark(models.Model):
    
    time_added = models.DateTimeField(default=timezone.now, editable=False)
    # one to many relations
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='bookmarks', null=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookmarks')
    
    def __str__(self):
        return self.problem.name + " : " + self.user.username


class Solution(models.Model):
    code = models.TextField()
    language = models.CharField(max_length=20, default="c")
    runtime = models.CharField(max_length=20)
    memory_usage = models.CharField(max_length=20)
    solve_status = models.CharField(
        max_length=50, default="Pending"
    )
    time_added = models.DateTimeField(default=timezone.now, editable=False)
    # one to many relations
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='solutions', null=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='solutions')
    
    def __str__(self):
        return self.problem.name + " : " + str(self.user.id)
