# backend/config/settings.py
"""Django settings for the AI Wealth Movement backend."""
import os
from pathlib import Path

import environ
from django.core.exceptions import ImproperlyConfigured

env = environ.Env(
    DEBUG=(bool, True),
    SECRET_KEY=(str, "changeme-dev-only"),
    DATABASE_URL=(str, "sqlite:///db.sqlite3"),
    ALLOWED_HOSTS=(list, ["127.0.0.1", "localhost"]),
    CORS_ALLOWED_ORIGINS=(list, []),
)

BASE_DIR = Path(__file__).resolve().parent.parent

for env_path in (BASE_DIR / ".env", BASE_DIR.parent / ".env"):
    if env_path.exists():
        environ.Env.read_env(str(env_path))

DEBUG = env("DEBUG")
SECRET_KEY = env("SECRET_KEY")
WEAK_SECRET_KEYS = {"changeme", "changeme-secret-key", "changeme-dev-only", ""}
if not DEBUG and SECRET_KEY in WEAK_SECRET_KEYS:
    raise ImproperlyConfigured(
        "Set a unique SECRET_KEY before running with DEBUG=False."
    )
ALLOWED_HOSTS = env("ALLOWED_HOSTS")
CORS_ALLOWED_ORIGINS = env("CORS_ALLOWED_ORIGINS")

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "django_filters",
    # Project apps
    "apps.tools",
    "apps.prompts",
    "apps.opportunities",
    "apps.learning",
    "apps.gis_hub",
    "apps.accounts",
    "apps.contact",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

# Database configuration – using dj-database-url style parsing via environ
DATABASES = {
    "default": env.db(),
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Django REST Framework configuration
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 20,
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
}

# CORS configuration – restrict to origins defined in env
if not CORS_ALLOWED_ORIGINS:
    CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]

CORS_ALLOW_CREDENTIALS = True

# Logging – simple console logger
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
}
