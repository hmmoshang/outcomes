# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
from django.db import models

# Create your models here.

class Outcome(models.Model):
    name = models.CharField(max_length=32)
    project = models.TextField(null=True)
    content = models.TextField(null=True)
    during = models.IntegerField(null=True)
    total = models.IntegerField(null=True)
    start_time = models.DateField(null=True,auto_now=False)
    end_time = models.DateField(null=True,auto_now=False)
    generate_time = models.DateTimeField(auto_now_add=True,null=True)




