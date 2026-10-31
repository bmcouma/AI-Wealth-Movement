# backend/apps/tools/serializers.py
from rest_framework import serializers
from .models import AITool

class AIToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = AITool
        fields = [
            "id",
            "name",
            "category",
            "description",
            "detailed_specs",
            "pricing",
            "is_beginner_friendly",
            "featured",
            "tags",
            "url",
        ]
