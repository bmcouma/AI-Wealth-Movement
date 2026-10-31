from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

@api_view(["GET"])
@permission_classes([AllowAny])
def current_account(request):
    user = request.user
    if not user or not user.is_authenticated:
        return Response({"authenticated": False, "user": None})

    return Response({
        "authenticated": True,
        "user": {
            "id": user.pk,
            "username": user.get_username(),
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        },
    })
