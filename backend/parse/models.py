from pyexpat import model
from django.db import models

class Resume(models.Model):
    title = models.CharField(max_length=120)
    file = models.FileField()





def _str_(self):
    return self.title 

# Create your models here.
