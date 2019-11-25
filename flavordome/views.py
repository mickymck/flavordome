from django.shortcuts import render
from django.utils.safestring import mark_safe
import json

# Create your views here.

def home(request):
  return render(request, 'base.html')
    
def test(request):
  return render(request, 'test.html')

def room(request, room_name):
  return render(request, 'room.html', {
    'room_name_json':mark_safe(json.dumps(room_name))
  })