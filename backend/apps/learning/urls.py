from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LearningCourseViewSet

router = DefaultRouter()
router.register(r'', LearningCourseViewSet, basename='learning')

urlpatterns = [
    path('', include(router.urls)),
]
