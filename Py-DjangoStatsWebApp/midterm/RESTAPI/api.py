from django.db.models import Min, Max, Sum, Avg
from django.apps import apps
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics 
from rest_framework import mixins
from .models import *
from .serializers import *
    
#aphase list in api
class PhaseList(mixins.CreateModelMixin,
                generics.ListAPIView):
    queryset = Phase.objects.all()
    serializer_class = PhaseSerializer

    def post(self,request,*args,**kwargs):
        return self.create(request,*args,**kwargs)
    
# date range in api
class DateRange(mixins.RetrieveModelMixin,
                 generics.ListAPIView):
    
    def get(self, request):
        earliest_date = CovidStats.objects.aggregate(earliest_date=Min('date_id'))['earliest_date']
        latest_date = CovidStats.objects.aggregate(latest_date=Max('date_id'))['latest_date']
        
        # ensure data is a date
        serializer = DateRangeSerializer(data={'earliest_date': earliest_date, 'latest_date': latest_date})
        serializer.is_valid(raise_exception=True)
        
        return Response(serializer.data)

# covid row in api
class CovidDetails(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  generics.GenericAPIView):
    
    queryset = CovidStats.objects.all()
    serializer_class = CovidSerializer

    def post(self,request,*args,**kwargs):
        return self.create(request,*args,**kwargs)
    
    def get(self,request,*args,**kwargs):
        return self.retrieve(request,*args,**kwargs)
    
    def put(self,request,*args,**kwargs):
        return self.update(request,*args,**kwargs)
    
    def delete(self,request,*args,**kwargs):
        return self.destroy(request,*args,**kwargs)

# hospital row in api
class HospitalDetails(mixins.RetrieveModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    
    queryset = Hospitalisation.objects.all()
    serializer_class = HospitalSerializer
    
    def get(self,request,*args,**kwargs):
        return self.retrieve(request,*args,**kwargs)
    
    def delete(self,request,*args,**kwargs):
        return self.destroy(request,*args,**kwargs)
    
    
# hospital + covid row
class DetailList(mixins.RetrieveModelMixin,
                 generics.ListAPIView):
    
    queryset = Hospitalisation.objects.all()
    serializer_class = ListSerializer

    def get(self,request,*args,**kwargs):
        return self.retrieve(request,*args,**kwargs)

# return min max sum and avg of columns in db  
class Stats(generics.ListAPIView):

    def get(self, request, *args, **kwargs):
        column_name = kwargs.get('column')
        model_name = kwargs.get('model')
        # check to see if user model is valid
        try:
            model = apps.get_model('RESTAPI', model_name)
        except LookupError:
            return Response({"error": "Invalid model provided."}, status=400)

        # check to see if user column is valid
        model_fields = [field.name for field in model._meta.get_fields()]
        if column_name not in model_fields:
            return Response({"error": column_name + " is an invalid column name."}, status=400)

        # get the respective statistics
        stat_data = model.objects.aggregate(min_value=Min(column_name),
                                                    max_value=Max(column_name),
                                                    total_sum=Sum(column_name),
                                                    avg_value=Avg(column_name))
        
        return Response(stat_data)
  


