from django.urls import include, path
from . import views
from . import api

urlpatterns = [
    path('',views.SPA, name='index'),
    path('api/phase', api.PhaseList.as_view(), name='phase-list'),
    path('api/date', api.DateRange.as_view(), name='date-range'),
    path('api/covid/<str:pk>', api.CovidDetails.as_view(), name='covid-row'),
    path('api/hospital/<str:pk>', api.HospitalDetails.as_view(), name='hospital-row'),
    path('api/list/<str:pk>', api.DetailList.as_view(), name='detailed-list'),
    path('api/stats/<str:model>/<str:column>', api.Stats.as_view(), name='covid-stats'),
    path('create_phase/', views.PhaseCreate.as_view(), name='create_phase'),
    path('create_covid/', views.CovidCreate.as_view(), name='create_covid'),
    path('create_hospital/', views.HospitalCreate.as_view(), name='create_hospital')
    
]