import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pharmamgmt.settings')
django.setup()

from core.models import Web_User

# Check current user's path
user = Web_User.objects.first()
if user:
    print(f"User: {user.username}")
    print(f"Path field: {user.path}")
    print(f"Path exists: {bool(user.path)}")
    if user.path:
        print(f"Path URL: {user.path.url}")
        print(f"Path name: {user.path.name}")
