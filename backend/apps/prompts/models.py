# backend/apps/prompts/models.py
from django.db import models

from django.db.models import JSONField

class PromptItem(models.Model):
    """Model representing a prompt template from platformData.ts"""
    id = models.CharField(max_length=64, primary_key=True)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    task = models.TextField(blank=True, null=True)
    template = models.TextField()
    variables = models.JSONField(default=list, blank=True)
    default_values = JSONField(default=dict, blank=True)
    instructions = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "Prompt Item"
        verbose_name_plural = "Prompt Items"
        ordering = ["title"]

    def __str__(self):
        return self.title

