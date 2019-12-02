from django.shortcuts import render
from django.utils.safestring import mark_safe
from config.settings import EMAIL_HOST_USER
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
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

@csrf_exempt
def send_results(request):
  if request.method == 'POST':
    data = json.loads(request.body)
    print(data)
    subject = "Flavordome Results"
    message = ''
    email = data['email']
    for line in data['email-string']:
      message = message + line + '\n'
  send_mail(subject,
    message,
    EMAIL_HOST_USER,
    [email],
    fail_silently = False)
