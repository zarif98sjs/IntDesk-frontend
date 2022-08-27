from django.urls import path, include
from rest_framework import routers
from problems.views import ProblemViewSet
from django.contrib import admin
from django.urls import path

router = routers.DefaultRouter()
router.register('problem', ProblemViewSet)


urlpatterns = [
    path('', include(router.urls))
]