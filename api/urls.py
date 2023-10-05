from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("", views.getRoutes, name="routes"),
    path("notes/", views.NotesListView.as_view(), name="notes_view"),
    path("notes/<str:pk>", views.NoteDetailView.as_view(), name="note-details-view"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
