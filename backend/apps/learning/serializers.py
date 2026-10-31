from rest_framework import serializers
from .models import LearningCourse

class LearningCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningCourse
        fields = '__all__'
