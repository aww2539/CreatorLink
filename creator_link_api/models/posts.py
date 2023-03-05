from django.db import models
from django.contrib.auth.models import User

class Posts(models.Model):
    body = models.EmailField(max_length=254)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    inserted_at = models.DateTimeField(auto_now_add=True)
    inserted_at = models.DateTimeField(auto_now_add=False)