from django.db import models
from problems.models import Role, SubCategory, Category
from django.conf import settings
from django.utils.timezone import now


class Assessment(models.Model):
    skill_name = models.CharField(max_length=100)
    passed_by = models.IntegerField(default=0)
    taken_by = models.IntegerField(default=0)    
    image_link = models.URLField(null=True)

    # many to many relations field
    roles = models.ManyToManyField(Role, related_name="assessment")
    categories = models.ManyToManyField(Category, related_name="assessment")
    
    def __str__(self):
        return self.skill_name


class Question(models.Model):
    DIFFICULTY_LEVEL = (
        ('E', 'Easy'),
        ('M', 'Medium'),
        ('H', 'Hard'),
    )
    description = models.TextField()
    time = models.IntegerField(default = 0)
    points = models.IntegerField(default = 0)
    difficulty_level = models.CharField(max_length = 1, choices = DIFFICULTY_LEVEL)

    # one to many relation
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE,  related_name='question', null = False, default= "1")
    
    def save(self, *args, **kwargs):
        # fix point based on difficulty level
        if self.difficulty_level == 'E':
            self.points = 5
        elif self.difficulty_level == 'M':
            self.points = 10
        elif self.difficulty_level == 'H':
            self.points = 20
        super().save(*args, **kwargs)

    def __str__(self):
        return self.description

class Option(models.Model):
    description = models.TextField()

    def __str__(self):
        return self.description


class QuesOption(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='quesoption')
    option = models.ForeignKey(Option, on_delete = models.PROTECT, related_name='quesoption')
    is_correct = models.BooleanField()

    def __str__(self):
        return self.question.description


class UserAssessment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='taken_assessment', null=True)
    assessment = models.ForeignKey(Assessment, on_delete = models.CASCADE, related_name='taken_assessment')
    taken_time = models.DateTimeField(default=now, editable=False)
    passed = models.BooleanField(default = False)