# backend/config/urls.py
"""Project URL configuration for the AI Wealth Movement backend.
All API routes are under the '/api/v1/' namespace.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def health(request):
    return JsonResponse({"status": "ok", "detail": "Backend is operational"})

urlpatterns = [
    path("admin/", admin.site.urls),
    path("health/", health, name="health"),
    path("api/v1/tools/", include("apps.tools.urls")),
    path("api/v1/prompts/", include("apps.prompts.urls")),
    path("api/v1/opportunities/", include("apps.opportunities.urls")),
    path("api/v1/learning/", include("apps.learning.urls")),
    path("api/v1/gis/", include("apps.gis_hub.urls")),
    path("api/v1/accounts/", include("apps.accounts.urls")),
    path("api/v1/contact/", include("apps.contact.urls")),
]
