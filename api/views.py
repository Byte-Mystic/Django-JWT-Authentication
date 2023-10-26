from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from backend.db_connection import db
import datetime
from bson import json_util, ObjectId
import requests
from django.test import RequestFactory
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from .serializers import MyTokenObtainPairSerializer
import json


class GoogleLoginCallbackView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get("code")
        if code:
            access_token = self.exchange_code_for_token(code)
            if access_token:
                google_user_info = self.get_google_user_info(access_token)
                user = self.create_user_from_google_info(google_user_info)

                token_serializer = MyTokenObtainPairSerializer()
                refresh_token = token_serializer.get_token(user)

                payload = {"refresh": str(refresh_token)}
                response = requests.post(
                    "http://127.0.0.1:8000/api/token/refresh/", json=payload
                )
                if response.status_code == 200:
                    response_json = response.json()
                    refresh_token = response_json["refresh"]
                    access_token = response_json["access"]

                    token = {
                        "refresh": str(refresh_token),
                        "access": str(access_token),
                    }
                return JsonResponse({"user": google_user_info, "token": token})
        return JsonResponse({"error": "Invalid code"}, status=400)

    def exchange_code_for_token(self, code):
        token_endpoint = "https://oauth2.googleapis.com/token"
        client_id = (
            "534552463083-bu6k1l16c9tbjh6u71eture9lkojt5ni.apps.googleusercontent.com"
        )
        client_secret = "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"
        redirect_uri = "http://localhost:3000/v1/users/login/google/callback/"

        data = {
            "code": code,
            "client_id": client_id,
            "client_secret": client_secret,
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code",
        }

        response = requests.post(token_endpoint, data=data)
        token_data = response.json()
        access_token = token_data.get("access_token")
        return access_token

    def create_user_from_google_info(self, google_user_info):
        email = google_user_info.get("email")
        username = google_user_info.get("name", email.split("@")[0])

        user, created = User.objects.get_or_create(
            email=email,
            defaults={"username": username},
        )
        return user

    def get_google_user_info(self, access_token):
        userinfo_endpoint = "https://www.googleapis.com/oauth2/v3/userinfo"
        headers = {"Authorization": f"Bearer {access_token}"}

        response = requests.get(userinfo_endpoint, headers=headers)
        user_info = response.json()
        return user_info


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class NotesListView(APIView):
    NOTES = db["notes"]

    @permission_classes([IsAuthenticated])
    def get(self, request):
        user_email = request.user.email
        notes = list(self.NOTES.find({"email": user_email}).sort("updated", -1))
        serialized_notes = [json_util.dumps(note) for note in notes]
        return Response(serialized_notes)

    def post(self, request):
        json_parser = JSONParser()
        note_data = json_parser.parse(request)
        note_data["created"] = datetime.datetime.now(tz=datetime.timezone.utc)
        note_data["updated"] = datetime.datetime.now(tz=datetime.timezone.utc)
        note_data["email"] = request.user.email
        inserted_note = self.NOTES.insert_one(note_data)
        response_data = {
            "message": "Note created successfully",
            "note_id": str(inserted_note.inserted_id),
        }
        return Response(response_data, status=status.HTTP_201_CREATED)


class NoteDetailView(APIView):
    NOTES = db["notes"]

    @permission_classes([IsAuthenticated])
    def get(self, request, pk):
        note = self.NOTES.find_one({"_id": ObjectId(pk)})
        if note:
            serialized_note = json_util.dumps(note)
            return Response(serialized_note, status=status.HTTP_200_OK)
        else:
            return Response(
                {"detail": "Note not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, pk):
        json_parser = JSONParser()
        update_data = json_parser.parse(request)
        if "_id" in update_data:
            del update_data["_id"]
        update_data["updated"] = datetime.datetime.now(tz=datetime.timezone.utc)
        result = self.NOTES.update_one({"_id": ObjectId(pk)}, {"$set": update_data})
        if result.modified_count > 0:
            return Response(
                {"detail": "Updated Successfully"}, status=status.HTTP_200_OK
            )
        return Response({"detail": "Note not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        note = self.NOTES.delete_one({"_id": ObjectId(pk)})
        if note:
            return Response(
                {"detail": "Deleted Successfully"}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"detail": "Note not found"}, status=status.HTTP_404_NOT_FOUND
            )


class VoiceView(APIView):
    NOTES = db["voice"]

    @permission_classes([IsAuthenticated])
    def get(self, request):
        ...

    def post(self, request):
        ...


@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/api/voice",
        "/api/voice-process",
        "/api/notes",
        "/api/register",
        "/api/token",
        "/api/token/refresh",
    ]
    return Response(routes)
