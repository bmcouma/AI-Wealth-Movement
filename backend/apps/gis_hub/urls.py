from rest_framework.routers import DefaultRouter
from .views import GisResourceViewSet

router = DefaultRouter()
router.register("", GisResourceViewSet, basename="gis-resource")
urlpatterns = router.urls
