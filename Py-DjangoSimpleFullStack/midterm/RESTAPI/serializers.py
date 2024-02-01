from rest_framework import serializers
from .models import *

# Serializer for date 
class DateRangeSerializer(serializers.Serializer):
    earliest_date = serializers.DateField()
    latest_date = serializers.DateField()

# Returns date_id from covidstats table
class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CovidStats
        fields = ['date_id']

# Return phase_name from phase table
class PhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase
        fields = ['phase_name']

class PhaseIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase
        fields = ['id','phase_name']


# Return vacc_perc from vaccination table
class VaccSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaccination
        fields = ['id','vacc_perc']

# Return row form covidstats table
class CovidSerializer(serializers.ModelSerializer):
    phase = PhaseIDSerializer()
    vacc = VaccSerializer()

    class Meta:
        model = CovidStats
        fields = ['date_id','positive','mortality','vacc','phase']

    def create(self, validated_data):
        phase_data = self.initial_data.get('phase')
        vacc_data = self.initial_data.get('vacc')
        covid = CovidStats(**{**validated_data,
                                'phase': Phase.objects.get(pk = phase_data['id']),
                                'vacc': Vaccination.objects.get(pk=vacc_data['id'])
                            })
        covid.save()
        return covid
    
    def update(self, instance, validated_data):
        phase_data = self.initial_data.get('phase')
        vacc_data = self.initial_data.get('vacc')
        instance.date = validated_data.get('date_id', instance.date_id)
        instance.positive = validated_data.get('positive', instance.positive)
        instance.mortality = validated_data.get('mortality', instance.mortality)
        instance.phase = Phase.objects.get(pk=phase_data['id'])
        instance.vacc = Vaccination.objects.get(pk=vacc_data['id'])
        instance.save()
        return instance

# Return row from hospital table
class HospitalSerializer(serializers.ModelSerializer):
    date = DateSerializer()
    class Meta:
        model = Hospitalisation
        fields = ['date','hospitalised','discharged','icu','oxygen_unstable','isolation']

    
    def update(self, instance, validated_data):
        date_data = self.initial_data.get('date')
        instance.hospitalised = validated_data.get('hospitalised', instance.hospitalised)
        instance.discharged = validated_data.get('discharged', instance.discharged)
        instance.icu = validated_data.get('icu', instance.icu)
        instance.oxygen_unstable = validated_data.get('oxygen_unstable', instance.oxygen_unstable)
        instance.isolation = validated_data.get('isolation', instance.isolation)
        instance.date = CovidStats.objects.get(pk=date_data['id'])
        instance.save()
        return instance

# Return hospital + covid row 
class ListSerializer(serializers.ModelSerializer):
    date = CovidSerializer()
    class Meta:
        model = Hospitalisation
        fields = ['date','hospitalised','discharged','icu','oxygen_unstable','isolation']

