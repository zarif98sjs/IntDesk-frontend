from django.urls import path, include
from rest_framework import routers
from django.contrib import admin
from django.urls import path
from assessments.views import AssessmentViewSet, AssessmentMineList

router = routers.DefaultRouter()
router.register('assessment', AssessmentViewSet)
# router.register('user_taken_assessments', AssessmentMineList)


urlpatterns = [
    path('', include(router.urls)),
    path('user_taken_assessments/', AssessmentMineList.as_view()),
]