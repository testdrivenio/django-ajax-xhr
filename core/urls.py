from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

from todos.views import home, todo, todos

urlpatterns = [
    path('admin/', admin.site.urls),
    path('todos/<int:todoId>/', todo, name="todo"),
    path('todos/', todos, name="todos"),
    path('', home),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
