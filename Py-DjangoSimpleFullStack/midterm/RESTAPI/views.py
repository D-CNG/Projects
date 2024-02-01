from typing import Any
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.views.generic.edit import CreateView
from .models import *
from .forms import *

# Home Page
def SPA(request):
    return render(request, 'pages/spa.html')

# Form views
class PhaseCreate(CreateView):
    model = Phase
    template_name= 'pages/create_phase.html'
    form_class = PhaseForm
    success_url = '/create_phase/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phases'] = Phase.objects.all()
        return context

class CovidCreate(CreateView):
    model = CovidStats
    template_name= 'pages/create_covid.html'
    form_class = CovidForm
    success_url = '/create_covid/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['master_covid'] = CovidStats.objects.all()
        return context

class HospitalCreate(CreateView):
    model = Hospitalisation
    template_name= 'pages/create_hospital.html'
    form_class = HospitalForm
    success_url = '/create_hospital/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['master_hospital'] = Hospitalisation.objects.all()
        return context



    