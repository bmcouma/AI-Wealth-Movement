# backend/apps/tools/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AIToolViewSet

router = DefaultRouter()
router.register(r"", AIToolViewSet, basename="tool")

urlpatterns = [
    path("", include(router.urls)),
]
