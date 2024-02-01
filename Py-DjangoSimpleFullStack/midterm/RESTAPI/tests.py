import json
from django.test import TestCase
from django.urls import reverse
from django.urls import reverse_lazy

from rest_framework.test import APIRequestFactory
from rest_framework.test import APITestCase

from .model_factories import *
from .serializers import *

# Serialiser unit test
class RestfulSerialiserTest(APITestCase):
    covid_row = None
    covidserializer = None

    def setUp(self):
        # dummy data creation
        self.covid_row = CovidFactory(pk = "2023-12-25")
        self.phase = PhaseFactory(phase_name = "Phase 1")
        self.hospital_row = HospitalisationFactory(date=self.covid_row)

        # dummy data serialized
        self.covidserializer = CovidSerializer(instance=self.covid_row)
        self.phaseserializer = PhaseSerializer(instance=self.phase)
        self.hospitalserializer = HospitalSerializer(instance=self.hospital_row)

    def tearDown(self):
        Phase.objects.all().delete()
        Vaccination.objects.all().delete()
        CovidStats.objects.all().delete()
        Hospitalisation.objects.all().delete
        PhaseFactory.reset_sequence(0)
        VaccinationFactory.reset_sequence(0)
        CovidFactory.reset_sequence(0)
        HospitalisationFactory.reset_sequence(0)

    def test_phaseSerializer(self):
        data = self.phaseserializer.data
        self.assertEqual(set(data.keys()), set({'phase_name'}))

    def test_covidSerializer(self):
        data = self.covidserializer.data
        self.assertEqual(set(data.keys()), set({'date_id','positive','mortality','vacc','phase'}))

    def test_hospitalSerializer(self):
        data = self.hospitalserializer.data
        self.assertEqual(set(data.keys()), set({'hospitalised','discharged','icu','oxygen_unstable','isolation','date'}))

        
# api unit test
class RestfulTest(APITestCase):
    covid_row = None
    hospital_row = None
    phase_url = ''
    covid_good_url=''
    covid_bad_url=''
    hospital_good_url=''
    hospital_bad_url=''

    def setUp(self):
        # dummy data creation
        self.covid_row = CovidFactory(pk = "2023-12-25")
        self.delete_row = CovidFactory(pk = "2023-12-26")
        self.hospital_row = HospitalisationFactory(date=self.covid_row)

        # urls to test
        self.phase_url = '/api/phase'

        self.covid_good_url = reverse('covid-row',kwargs={'pk':'2023-12-25'})
        self.covid_bad_url = 'api/covid/H'
        self.covid_delete_url = reverse('covid-row',kwargs={'pk':'2023-12-26'})
        
        self.hospital_good_url = reverse('hospital-row',kwargs={'pk':'2023-12-25'})
        self.hospital_bad_url = 'api/hospital/H'

    def tearDown(self):
        Phase.objects.all().delete()
        Vaccination.objects.all().delete()
        CovidStats.objects.all().delete()
        Hospitalisation.objects.all().delete
        PhaseFactory.reset_sequence(0)
        VaccinationFactory.reset_sequence(0)
        CovidFactory.reset_sequence(0)
        HospitalisationFactory.reset_sequence(0)
        

    def test_phaseReturnSuccess(self):
        response = self.client.get(self.phase_url, format='json')
        self.assertEqual(response.status_code,200)

    def test_covidReturnSuccess(self):
        response = self.client.get(self.covid_good_url, format='json')
        response.render()
        # ensure page is loaded
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content) #load dummy data
        self.assertEqual(data['positive'],0)
        self.assertEqual(data['mortality'],0)

    def test_covidReturnFail(self):
        response = self.client.get(self.covid_bad_url, format='json')
        self.assertEqual(response.status_code,404)

    def test_covidDeleteSuccessful(self):
        response = self.client.delete(self.covid_delete_url, format='json')
        self.assertEqual(response.status_code,204)

    def test_hospitalReturnSuccess(self):
        response = self.client.get(self.hospital_good_url, format='json')
        response.render()
        self.assertEqual(response.status_code,200)
        data = json.loads(response.content) #load dummy data
        self.assertEqual(data['icu'],0)
        self.assertEqual(data['discharged'],10)

    def test_hospitalReturnFail(self):
        response = self.client.get(self.hospital_bad_url, format='json')
        self.assertEqual(response.status_code,404)

    

    

