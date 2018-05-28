import json
from channels import route
from chattest.models import Chat

# This function will display all messages received in the console
def message_handler(message):
    obj = json.loads(message['text'])
    m = {
        "author": "receive",
        "message": obj.get("message"),
        "image": obj.get("image")
    }
    obj = Chat.objects.create(message=m)
    m['id'] = obj.id
    message.reply_channel.send({
        "text": "{}".format(json.dumps(m))
    })


channel_routing = [
    route("websocket.receive", message_handler)  # we register our message handler
]