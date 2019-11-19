from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Note
import json


class NoteConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'notes'

        async_to_sync(self.channel_layer.group_add)
        (self.room_group_name,
         self.channel_name
         )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)
        (self.room_group_name, 
        self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print('received')
        title = text_data_json['title']
        content = text_data_json['content']
        id = text_data_json['id']
        note = Note.objects.get(pk=id)
        note.title = title
        note.content = content
        note.save()
        print('notesaved')
        self.send(json.dumps( {
                'title': title,
                'content': content,
                'id': id
                }))
        
        print('send')
        

      
