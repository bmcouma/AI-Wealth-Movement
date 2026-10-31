from rest_framework.routers import DefaultRouter
from .views import AIJobViewSet

router = DefaultRouter()
router.register("", AIJobViewSet, basename="opportunity")
urlpatterns = router.urls
