from django.urls import path, include
from users.views import UserDetailAPI,RegisterUserAPIView, UserViewSet
from rest_framework import routers
from rest_framework.authtoken import views

router = routers.DefaultRouter()
router.register('user', UserViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path("details/",UserDetailAPI.as_view()),
    path("register/",RegisterUserAPIView.as_view()),
    path("login/", views.obtain_auth_token)
]