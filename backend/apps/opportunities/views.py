from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import AIJob
from .serializers import AIJobSerializer

class AIJobViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AIJob.objects.all()
    serializer_class = AIJobSerializer
    permission_classes = [AllowAny]
    lookup_field = "id"
    search_fields = ["title", "category", "location", "description"]
    ordering_fields = ["title", "category", "location"]
