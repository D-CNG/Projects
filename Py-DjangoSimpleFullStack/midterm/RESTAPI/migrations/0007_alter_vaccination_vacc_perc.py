# Generated by Django 5.0 on 2024-01-01 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('RESTAPI', '0006_alter_vaccination_vacc_perc'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vaccination',
            name='vacc_perc',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=4),
            preserve_default=False,
        ),
    ]
