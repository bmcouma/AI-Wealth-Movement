from django.contrib import admin
from .models import LearningCourse

@admin.register(LearningCourse)
class LearningCourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'difficulty', 'duration')
    search_fields = ('title', 'category', 'difficulty')
    ordering = ('title',)
