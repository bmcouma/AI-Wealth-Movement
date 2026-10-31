# backend/apps/opportunities/models.py
from django.db import models


class AIJob(models.Model):
    """Model for AI job/opportunity entries"""
    id = models.CharField(max_length=64, primary_key=True)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    type = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    experience = models.CharField(max_length=100)
    salary_range = models.CharField(max_length=100, blank=True, null=True)
    skills = models.JSONField(default=list, blank=True)
    description = models.TextField()
    responsibilities = models.JSONField(default=list, blank=True)
    qualifications = models.JSONField(default=list, blank=True)
    posted_date = models.CharField(max_length=200, blank=True, null=True)
    is_sample = models.BooleanField(default=False)
    url = models.URLField(max_length=300, blank=True, null=True)

    class Meta:
        verbose_name = "AI Job"
        verbose_name_plural = "AI Jobs"
        ordering = ["title"]

    def __str__(self):
        return self.title

