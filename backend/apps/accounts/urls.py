from django.urls import path
from .views import current_account

urlpatterns = [
    path("me/", current_account, name="current-account"),
]
