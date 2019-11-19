from django.urls import path
from .views import NoteRetrieveUpdateDestroyAPIView, NoteListCreateAPIView
urlpatterns = [
    path('', NoteListCreateAPIView.as_view(), name='NoteListCreateAPIView'),
    path('<int:pk>/', NoteRetrieveUpdateDestroyAPIView.as_view(),
         name='NoteRetrieveUpdateDestroyAPIView'),
]
