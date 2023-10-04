from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import NoteSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from backend.db_connection import db
import datetime
from bson import json_util, ObjectId


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def getNotes(request):
#     user = request.user
#     notes = user.note_set.all()
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)


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
        inserted_note = self.NOTES.insert_one(note_data)
        response_data = {
            "message": "Note created successfully",
            "note_id": str(inserted_note.inserted_id),
        }
        return Response(response_data, status=status.HTTP_201_CREATED)


class NoteDetailView(APIView):
    NOTES = db["notes"]

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


@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/api/notes",
        "/api/register",
        "/api/token",
        "/api/token/refresh",
    ]
    return Response(routes)
