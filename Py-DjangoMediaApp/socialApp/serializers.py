from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields =['bio','profileimg']

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowersCount
        fields =['user']

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['image']