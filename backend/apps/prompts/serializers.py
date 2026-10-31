# backend/apps/prompts/serializers.py
from rest_framework import serializers
from .models import PromptItem

class PromptItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromptItem
        fields = [
            "id",
            "title",
            "category",
            "task",
            "template",
            "variables",
            "default_values",
            "instructions",
        ]
