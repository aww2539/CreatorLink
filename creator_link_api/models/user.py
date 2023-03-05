from django.db import models

class User(models.Model):
    email = models.EmailField(max_length=254)
    username = models.CharField(max_length=400)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    password = models.CharField(max_length=30)