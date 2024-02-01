from django.urls import include, path
from . import views
from . import api

urlpatterns = [
    path('home/',views.index, name = 'index'),
    path('login/', views.user_login, name = 'login'),
    path('register/',views.register,name = 'register'),
    path('logout/', views.user_logout, name='logout'),
    path('settings/',views.settings,name = 'settings'),
    path('search/', views.search, name='search'),
    path('profile/<str:pk>', views.profile, name='profile'),
    path('chat/<str:pk>', views.chat, name='profile'),
    path('upload/',views.upload,name = 'upload'),
    path('follow', views.follow, name='follow'),
    
    path('api/<str:pk>', api.UserProfile, name='profiledetails'),
    path('api/follow/<str:pk>', api.UserFollow, name='followdetails'),
    path('api/media/<str:pk>', api.UserMedia, name='userposts'),
    path('app/', views.SPA, name='spa'),
    
]