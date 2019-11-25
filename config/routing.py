from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import flavordome.routing

application = ProtocolTypeRouter({
  'websocket':AuthMiddlewareStack(
    URLRouter(
      flavordome.routing.websocket_urlpatterns
    )
  )
})