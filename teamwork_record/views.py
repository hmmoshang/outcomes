# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
def index(request):
    return render(request,'outcomes_record.html',{'hello':'hello'})
def submit(request):
    from teamwork_record import models
    end_time = request.POST.get('end_time')
    start_time = request.POST.get('start_time')
    name = request.POST.getlist('name')
    content = request.POST.getlist('content')
    hour = request.POST.getlist('hour')
    total = request.POST.getlist('total')
    project = request.POST.getlist('project')
    for index in range(len(project)):
        models.Outcome.objects.create(name=name[index], project=project[index], content=content[index], during=hour[index], total=total[index],start_time=start_time,end_time=end_time)

    return HttpResponse(name)
