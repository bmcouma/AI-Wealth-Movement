# backend/apps/gis_hub/models.py

from django.db import models


class GisResource(models.Model):
    """Model representing a GIS resource from platformData.ts"""

    id = models.CharField(max_length=64, primary_key=True)
    title = models.CharField(max_length=255)
    level = models.CharField(max_length=100)
    tech_stack = models.JSONField(default=list, blank=True)
    summary = models.TextField(blank=True)
    use_case = models.TextField(blank=True)
    read_time = models.CharField(max_length=50, blank=True)
    # steps stored as JSON list of dicts {title, description, language, codeSnippet}
    steps = models.JSONField(default=list, blank=True)

    class Meta:
        verbose_name = "GIS Resource"
        verbose_name_plural = "GIS Resources"
        ordering = ["title"]

    def __str__(self):
        return self.title

