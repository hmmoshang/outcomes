# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-01-26 06:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teamwork_record', '0004_auto_20180125_0708'),
    ]

    operations = [
        migrations.AddField(
            model_name='outcome',
            name='generate_time',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]