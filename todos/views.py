import json

from django.http import HttpResponseBadRequest, JsonResponse
from django.shortcuts import get_object_or_404, render

from todos.models import Todo


def home(request):
    return render(request, "home.html")


def todos(request):
    # request.is_ajax() is deprecated since django 3.1
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_ajax:
        if request.method == 'GET':
            todos = list(Todo.objects.all().values())
            return JsonResponse({'context': todos})
        if request.method == 'POST':
            data = json.load(request)
            todo = data.get('payload')
            Todo.objects.create(task=todo['task'], completed=todo['completed'])
            return JsonResponse({'status': 'Todo added!'})
        return JsonResponse({'status': 'Invalid request'}, status=400)
    else:
        return HttpResponseBadRequest('Invalid request')


def todo(request, todoId):
    # request.is_ajax() is deprecated since django 3.1
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_ajax:
        todo = get_object_or_404(Todo, id=todoId)

        if request.method == 'PUT':
            data = json.load(request)
            updated_values = data.get('payload')

            todo.task = updated_values['task']
            todo.completed = updated_values['completed']
            todo.save()

            return JsonResponse({'status': 'Todo updated!'})

        if request.method == 'DELETE':
            todo.delete()
            return JsonResponse({'status': 'Todo deleted!'})
        return JsonResponse({'status': 'Invalid request'}, status=400)
    else:
        return HttpResponseBadRequest('Invalid request')
