from django.contrib import admin
from .models import *

class PhaseAdmin(admin.ModelAdmin):
    list_display = ('phase_name',)

class VaccAdmin(admin.ModelAdmin):
    list_display = ('vacc_perc',)

class CovidAdmin(admin.ModelAdmin):
    list_display = ('date_id','positive','mortality',)

class HospitalAdmin(admin.ModelAdmin):
    list_display = ('hospitalised','icu','oxygen_unstable','discharged','isolation')

admin.site.register(Phase,PhaseAdmin)
admin.site.register(Vaccination,VaccAdmin)
admin.site.register(CovidStats,CovidAdmin)
admin.site.register(Hospitalisation,HospitalAdmin)
