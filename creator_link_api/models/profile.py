from django.db import models
from .user import User

class Profile(models.Model):
    bio = models.EmailField(max_length=254)
    views = models.IntegerField()
    user = models.OneToOneField(User, on_delete=models.CASCADE)