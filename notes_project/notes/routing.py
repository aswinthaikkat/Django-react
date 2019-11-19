from django.urls import path
from .consumer import NoteConsumer

websocket_urlpatterns = [
    path('ws/notes', NoteConsumer)
]
