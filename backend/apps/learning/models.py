from django.db import models


class LearningCourse(models.Model):
    """Model representing a learning course as defined in platformData.ts"""

    id = models.CharField(primary_key=True, max_length=50)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=50)
    duration = models.CharField(max_length=50)
    description = models.TextField()
    # outcomes stored as a JSON list of strings
    outcomes = models.JSONField(default=list, blank=True)
    # modules stored as a JSON list of objects with id, title, duration, overview
    modules = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.title
