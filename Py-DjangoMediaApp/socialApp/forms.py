from django import forms
from django.forms import ModelForm
from .models import *
from django.contrib.auth.models import User


class UserForm(forms.ModelForm):
    
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

class ProfileForm(forms.ModelForm):
    
    class Meta:
        model = AppUser
        fields = ['bio','profileimg']

class PostForm(forms.ModelForm):
 
    class Meta:
        model = Post
        fields = ['caption', 'image']
