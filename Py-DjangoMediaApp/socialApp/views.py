from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .models import *
from .forms import *
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from itertools import chain
from django.views.generic import ListView
from django.views.generic import DateDetailView

def SPA(request):
    return render(request, 'spa.html')

# login,log out register
def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return HttpResponseRedirect('../home')
        else:
            return HttpResponse("Invalid login details supplied.")
    else:
        return render(request, 'login.html')
    
def register(request):
    if request.method == 'POST':
        # once data is collected create user form with data sent
        user_form = UserForm(data=request.POST)
        if user_form.is_valid():
            #saves new user
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            #creates new profile object for new user
            new_profile = AppUser.objects.create(user=user,id_user = user.id)
            new_profile.save()

            return HttpResponseRedirect('/login/')

        else:
            print(user_form.errors)
    else:
        # use user form to collect data
        user_form = UserForm()

    return render(request, 'register.html',
                  {'user_form': user_form})



@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/login/')

#######################################
# Home,profile of users
@login_required
def index(request):
    user_profile = AppUser.objects.get(user=request.user)

    user_following_list = []
    feed = []

    user_following = FollowersCount.objects.filter(follower=request.user.username)

    for users in user_following:
        user_following_list.append(users.user)

    for usernames in user_following_list:
        feed_lists = Post.objects.filter(user=usernames)
        feed.append(feed_lists)

    feed_list = list(chain(*feed))


    return render(request, 'home.html',{'user_profile': user_profile,
                                        'posts':feed_list,
                                        'followings':user_following_list})

@login_required(login_url='signin')
def profile(request, pk):
    user_object = User.objects.get(username=pk)
    user_profile = AppUser.objects.get(user=user_object)
    user_posts = Post.objects.filter(user=pk)
    user_post_length = len(user_posts)

    follower = request.user.username
    user = pk

    if FollowersCount.objects.filter(follower=follower, user=user).first():
        button_text = 'Unfollow'
    else:
        button_text = 'Follow'

    user_followers = len(FollowersCount.objects.filter(user=pk))
    user_following = len(FollowersCount.objects.filter(follower=pk))
    context = {
        'user_object': user_object,
        'user_profile': user_profile,
        'user_posts': user_posts,
        'user_post_length': user_post_length,
        'button_text': button_text,
        'user_followers': user_followers,
        'user_following': user_following,
    }
    return render(request, 'profile.html', context)
#######################################
#upload,settings and search function
@login_required
def settings(request):
    user_profile = AppUser.objects.get(user=request.user)
    if request.method == 'POST':
        profile_form = ProfileForm(request.POST or None,request.FILES or None, instance=user_profile)
        if profile_form.is_valid():
            profile_form.save()
            return HttpResponseRedirect('/settings/')
        else:
            return HttpResponse('Form is invalid')
    else:
        profile_form = ProfileForm(instance=user_profile)
        
    return render(request, 'settings.html', {'profile_form': profile_form})

@login_required
def upload(request):
    if request.method == 'POST':
        user = request.user.username
        form = PostForm(request.POST or None, request.FILES or None)
 
        if form.is_valid():
            form = Post.objects.create(user=user, image=request.FILES.get('image'), caption=request.POST['caption'])
            form.save()
            return HttpResponseRedirect('../home')
    else:
        form = PostForm()

    return render(request, 'upload.html', {'form': form})


@login_required()
def search(request):
    if request.method == 'POST':
        username = request.POST['username']
        username_object = User.objects.filter(username__icontains=username)

        username_profile = []
        username_profile_list = []

        for users in username_object:
            username_profile.append(users.id)

        for ids in username_profile:
            profile_lists = AppUser.objects.filter(id_user=ids)
            username_profile_list.append(profile_lists)
        
        username_profile_list = list(chain(*username_profile_list))
    return render(request, 'search.html', {'username_profile_list': username_profile_list})

@login_required(login_url='signin')
def follow(request):
    if request.method == 'POST':
        follower = request.POST['follower']
        user = request.POST['user']

        if FollowersCount.objects.filter(follower=follower, user=user).first():
            delete_follower = FollowersCount.objects.get(follower=follower, user=user)
            delete_follower.delete()
            return HttpResponseRedirect('/profile/'+user)
        else:
            new_follower = FollowersCount.objects.create(follower=follower, user=user)
            new_follower.save()
            return HttpResponseRedirect('/profile/'+user)
    else:
        return HttpResponseRedirect('/home/')

@login_required
def chat(request):
    return render(request, 'settings.html')