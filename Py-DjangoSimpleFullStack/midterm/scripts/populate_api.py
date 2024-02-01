import os
import sys
import django
import csv
from collections import defaultdict

sys.path.append('../midterm')
os.environ.setdefault('DJANGO_SETTINGS_MODULE','midterm.settings')
django.setup()

from RESTAPI.models import *

data_file = '../covid_stats.csv'
data_file_2 = '../hospitalisation.csv'

covid = defaultdict(list)
hospitalisation = defaultdict(list)
vaccination = set()
phase = set()

with open(data_file) as csv_file:
    reader_covid = csv.reader(csv_file, delimiter=',')
    header = reader_covid.__next__()
    for row in reader_covid:
        vaccination.add(row[3])
        phase.add(row[4])
        covid[row[0]] = row[1:5]
        
Hospitalisation.objects.all().delete()
CovidStats.objects.all().delete()
Phase.objects.all().delete()
Vaccination.objects.all().delete()



phase_rows = {}
vaccination_rows = {}
covid_rows = {}

for data in phase:
    row = Phase.objects.create(phase_name=data)
    row.save()
    phase_rows[data] = row

for entry in vaccination:
    row = Vaccination.objects.create(vacc_perc=entry)
    row.save()
    vaccination_rows[entry]=row

for date, item in covid.items():
    row = CovidStats.objects.create(date_id = date, positive=item[0], mortality=item[1],
                                    vacc = vaccination_rows[item[2]],
                                    phase = phase_rows[item[3]])
    row.save()
    covid_rows[date]=row

with open(data_file_2) as csv_file:
    reader_hospital = csv.reader(csv_file, delimiter=',')
    header = reader_hospital.__next__()
    for row in reader_hospital:
        hospitalisation[row[0]] = row[1:6]
        
for date, item in hospitalisation.items():
    row = Hospitalisation.objects.create(date = covid_rows[date], hospitalised = item[0], 
                                            discharged = item[1], icu = item[2],
                                            oxygen_unstable = item[3], isolation = item[4])
    row.save()

