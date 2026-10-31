# backend/apps/tools/views.py
from rest_framework import viewsets, filters
from .models import AITool
from .serializers import AIToolSerializer

class AIToolViewSet(viewsets.ReadOnlyModelViewSet):
    """Read‑only viewset for AI tools"""
    queryset = AITool.objects.all()
    serializer_class = AIToolSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "category", "description", "tags"]
    ordering_fields = ["name", "category"]
    ordering = ["name"]
