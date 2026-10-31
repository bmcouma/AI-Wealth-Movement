from rest_framework import viewsets
from .models import LearningCourse
from .serializers import LearningCourseSerializer
from rest_framework.permissions import AllowAny

class LearningCourseViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only endpoint for LearningCourse objects"""
    queryset = LearningCourse.objects.all()
    serializer_class = LearningCourseSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'
