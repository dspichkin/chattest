import json
from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse

from chattest.models import Chat

def fileupload(request):
    if request.method == 'POST' and request.FILES['file']:
        myfile = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        return JsonResponse({
          "status": True,
          'uploaded_file_url': uploaded_file_url
        })
    return JsonResponse({
      "status": False,
    })

def chat(request):
    chats = []
    for chat in Chat.objects.all():
        chats.append({
          "id": chat.id,
          "message": chat.message
        })
    return JsonResponse({
      "logs": chats
    })