# backend/apps/prompts/views.py
from rest_framework import viewsets, filters
from .models import PromptItem
from .serializers import PromptItemSerializer

class PromptItemViewSet(viewsets.ReadOnlyModelViewSet):
    """Read‑only viewset for prompt items"""
    queryset = PromptItem.objects.all()
    serializer_class = PromptItemSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "category", "task", "variables"]
    ordering_fields = ["title", "category"]
    ordering = ["title"]
