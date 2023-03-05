from django.db import models
from .profile import Profile

class ProfileLinks(models.Model):
    name = models.CharField(max_length=55)
    url = models.CharField(max_length=255)
    order = models.IntegerField()
    clicks = models.IntegerField()
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)