# backend/apps/tools/admin.py
from django.contrib import admin
from .models import AITool

@admin.register(AITool)
class AIToolAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "category", "pricing", "featured")
    search_fields = ("name", "category", "description")
    list_filter = ("category", "featured", "is_beginner_friendly")
