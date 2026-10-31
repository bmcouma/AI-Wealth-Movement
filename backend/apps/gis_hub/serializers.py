from rest_framework import serializers
from .models import GisResource

class GisResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = GisResource
        fields = "__all__"
