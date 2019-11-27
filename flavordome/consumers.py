from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

class RoomConsumer(WebsocketConsumer) :
  def connect(self):
    self.room_name = self.scope['url_route']['kwargs']['room_name']
    self.room_group_name = f'chat_{self.room_name}'
    
    async_to_sync(self.channel_layer.group_add)(
      self.room_group_name,
      self.channel_name
    )
    
    self.accept()

  def disconnect(self, close_code):
    async_to_sync(self.channel_layer.group_send)(
      self.room_group_name,
      {
        'type':'chat_message',
        'method':'removePlayer',
        'payload': None
      }
    )
    async_to_sync(self.channel_layer.group_discard)(
      self.room_group_name,
      self.channel_name
    )
  
  def receive(self, text_data):
    data = json.loads(text_data)
    message = data['payload']
    method = data['method']
    
    async_to_sync(self.channel_layer.group_send)(
      self.room_group_name,
      {
        'type':'chat_message',
        'method':method,
        'payload':message
      }
    )
  
  def chat_message(self, event):
    message = event['payload']
    method = event['method']
    
    self.send(text_data=json.dumps({
      'method':method,
      'payload':message
    }))