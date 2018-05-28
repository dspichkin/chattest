from django.db import models
from jsonfield import JSONField

class Chat(models.Model):
    message = JSONField()