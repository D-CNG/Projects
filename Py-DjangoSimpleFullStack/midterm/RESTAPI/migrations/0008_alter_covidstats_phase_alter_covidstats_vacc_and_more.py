# Generated by Django 5.0 on 2024-01-01 13:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('RESTAPI', '0007_alter_vaccination_vacc_perc'),
    ]

    operations = [
        migrations.AlterField(
            model_name='covidstats',
            name='phase',
            field=models.ForeignKey(db_constraint=False, on_delete=django.db.models.deletion.DO_NOTHING, to='RESTAPI.phase'),
        ),
        migrations.AlterField(
            model_name='covidstats',
            name='vacc',
            field=models.ForeignKey(db_constraint=False, on_delete=django.db.models.deletion.DO_NOTHING, to='RESTAPI.vaccination'),
        ),
        migrations.AlterField(
            model_name='hospitalisation',
            name='date',
            field=models.ForeignKey(db_constraint=False, on_delete=django.db.models.deletion.DO_NOTHING, to='RESTAPI.covidstats'),
        ),
    ]