from django import forms
from django.forms import ModelForm
from .models import *

class PhaseForm(ModelForm):
    class Meta:
        model = Phase
        fields = ['phase_name']

class CovidForm(ModelForm):
    class Meta:
        model = CovidStats
        fields = ['date_id','positive','mortality','vacc','phase']

class HospitalForm(ModelForm):
    class Meta:
        model = Hospitalisation
        fields = ['date','hospitalised','discharged','icu','oxygen_unstable','isolation']
    
