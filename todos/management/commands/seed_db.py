import json
from pathlib import Path

from django.core.management.base import BaseCommand

from todos.models import Todo

TODOS = [
    "Pretend to learn a new language.",
    "Buy grapes.",
    "Skip exercise routine.",
    "Forge all documents.",
    "Give away rice.",
]

class Command(BaseCommand):
    help = 'Adds 5 todos to the database'

    def handle(self, *args, **options):
        for todo in TODOS:
            Todo.objects.create(task=todo)
