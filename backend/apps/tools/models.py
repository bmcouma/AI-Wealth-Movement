# backend/apps/tools/models.py
from django.db import models


class AITool(models.Model):
    """Model representing an AI tool entry from platformData.ts"""
    id = models.CharField(max_length=64, primary_key=True)
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    description = models.TextField()
    detailed_specs = models.TextField(blank=True, null=True)
    pricing = models.CharField(max_length=100, blank=True, null=True)
    is_beginner_friendly = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    tags = models.JSONField(default=list, blank=True)
    url = models.URLField(max_length=300, blank=True, null=True)

    class Meta:
        verbose_name = "AI Tool"
        verbose_name_plural = "AI Tools"
        ordering = ["name"]

    def __str__(self):
        return self.name

