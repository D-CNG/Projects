# Generated by Django 5.0 on 2024-01-01 17:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('RESTAPI', '0014_alter_covidstats_phase_id_alter_covidstats_vacc_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='covidstats',
            old_name='phase_id',
            new_name='phase',
        ),
    ]
