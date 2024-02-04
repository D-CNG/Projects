# Generated by Django 5.0 on 2024-01-01 13:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('RESTAPI', '0010_remove_covidstats_phase_remove_covidstats_vacc'),
    ]

    operations = [
        migrations.AddField(
            model_name='covidstats',
            name='phase_id',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.DO_NOTHING, to='RESTAPI.phase'),
            preserve_default=False,
        ),
    ]