import factory
from django.test import TestCase
from django.conf import settings
from django.core.files import File

from .models import *
# unit test dummy data
class PhaseFactory(factory.django.DjangoModelFactory):
     phase_name = "Phase 1"

     class Meta:
          model = Phase

class VaccinationFactory(factory.django.DjangoModelFactory):
     vacc_perc = 0.83

     class Meta:
          model = Vaccination

class CovidFactory(factory.django.DjangoModelFactory):
     date_id = 2023-12-25
     positive = 0
     mortality = 0
     vacc = factory.SubFactory(VaccinationFactory)
     phase = factory.SubFactory(PhaseFactory)

     class Meta:
          model = CovidStats

class HospitalisationFactory(factory.django.DjangoModelFactory):
     hospitalised = 3
     discharged = 10
     icu = 0
     oxygen_unstable = 0
     isolation = 2
     date = factory.SubFactory(CovidFactory)

     class Meta:
          model = Hospitalisation