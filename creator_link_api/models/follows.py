from django.db import models
from django.contrib.auth.models import User

class Follows(models.Model):
    follow = models.ForeignKey(User, related_name='follow', on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)