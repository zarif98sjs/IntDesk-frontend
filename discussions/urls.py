from django.urls import path, include
from rest_framework import routers
from discussions.views import DiscussionViewSet,DiscussionMineList
from django.contrib import admin
from django.urls import path

router = routers.DefaultRouter()
router.register('discussion', DiscussionViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('myq/', DiscussionMineList.as_view()),
]