from django.core.files.uploadedfile import SimpleUploadedFile
from core.models import Web_User
from core.forms import UserRegistrationForm

# Test image upload
test_image = SimpleUploadedFile("test.jpg", b"file_content", content_type="image/jpeg")

data = {
    'first_name': 'Test',
    'last_name': 'User',
    'username': 'testuser123',
    'email': 'test@test.com',
    'password1': 'testpass123',
    'password2': 'testpass123',
    'user_type': 'staff',
    'user_contact': '1234567890'
}

form = UserRegistrationForm(data, {'path': test_image})
print("Form valid:", form.is_valid())
if not form.is_valid():
    print("Errors:", form.errors)
else:
    user = form.save()
    print("User created:", user.username)
    print("Path saved:", user.path)
