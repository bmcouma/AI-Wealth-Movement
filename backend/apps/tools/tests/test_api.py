from rest_framework import status
from rest_framework.test import APITestCase

from apps.tools.models import AITool


class ToolsAPITest(APITestCase):
    def setUp(self):
        AITool.objects.create(
            id="tool-test",
            name="Test GIS Tool",
            category="GIS & Spatial",
            description="Used in automated tests.",
            url="https://example.com",
            tags=["gis"],
            featured=True,
        )

    def test_list_tools_returns_seeded_record(self):
        response = self.client.get("/api/v1/tools/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        records = response.data["results"] if isinstance(response.data, dict) else response.data
        self.assertEqual(len(records), 1)
        self.assertEqual(records[0]["id"], "tool-test")
        self.assertEqual(records[0]["name"], "Test GIS Tool")

    def test_retrieve_tool_by_id(self):
        response = self.client.get("/api/v1/tools/tool-test/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["category"], "GIS & Spatial")
