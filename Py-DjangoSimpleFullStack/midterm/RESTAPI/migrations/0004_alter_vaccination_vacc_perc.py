# Generated by Django 5.0 on 2024-01-01 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('RESTAPI', '0003_alter_vaccination_vacc_perc'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vaccination',
            name='vacc_perc',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
