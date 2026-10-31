from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import GisResource
from .serializers import GisResourceSerializer

class GisResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GisResource.objects.all()
    serializer_class = GisResourceSerializer
    permission_classes = [AllowAny]
    lookup_field = "id"
    search_fields = ["title", "level", "summary", "use_case"]
    ordering_fields = ["title", "level"]
