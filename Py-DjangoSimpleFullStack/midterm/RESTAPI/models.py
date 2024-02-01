from django.db import models

class Phase(models.Model):
    phase_name = models.CharField(max_length=256, null=False, blank=False)

    def __str__(self):
        return self.phase_name

class Vaccination(models.Model):
    vacc_perc = models.DecimalField(null=False, blank = False,max_digits=4, decimal_places=2)


class CovidStats(models.Model):
    date_id = models.DateField(null=False, blank=False, primary_key = True)
    positive = models.IntegerField(null=False, blank = True)
    mortality = models.IntegerField(null=False, blank = True)
    vacc = models.ForeignKey(Vaccination, on_delete=models.DO_NOTHING,db_constraint=False)
    phase = models.ForeignKey(Phase, on_delete=models.DO_NOTHING,db_constraint=False)
    
class Hospitalisation(models.Model):
    hospitalised = models.IntegerField(null=False, blank = True)
    discharged = models.IntegerField(null=False, blank = True)
    icu = models.IntegerField(null=False, blank = True)
    oxygen_unstable = models.IntegerField(null=False, blank = True)
    isolation = models.IntegerField(null=False, blank = True)
    date = models.ForeignKey(CovidStats, on_delete= models.DO_NOTHING,db_constraint=False, primary_key = True)



