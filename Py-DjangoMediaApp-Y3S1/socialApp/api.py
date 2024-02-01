from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *


# returns user profile bio and image
@api_view(['GET','PUT'])
def UserProfile(request, pk):
    try:
        user_object = User.objects.get(username=pk)
        user_profile = AppUser.objects.get(user=user_object)

    except user_profile.DoesNotExist:
        return HttpResponse(status=404)
        
    if request.method == 'GET':
        serializer = UserSerializer(user_profile)
        return Response(serializer.data)
    
    elif request.method == "PUT":
        serializer = UserSerializer(user_profile,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


#returns who user is following
@api_view(['GET'])
def UserFollow(request, pk):
    try:
        followers = FollowersCount.objects.filter(follower=pk)

    except followers.DoesNotExist:
        return HttpResponse(status=404)
        
    if request.method == 'GET':
        serializer = FollowSerializer(followers, many=True)
        return Response(serializer.data)
    
#returns users media
@api_view(['GET','POST'])
def UserMedia(request, pk):

    if request.method == 'POST':
        serializer = MediaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        posts = Post.objects.filter(user=pk)

    except posts.DoesNotExist:
        return HttpResponse(status=404)
        
    if request.method == 'GET':
        serializer = MediaSerializer(posts, many=True)
        return Response(serializer.data)



# class UserDetails(mixins.RetrieveModelMixin,
#                 mixins.UpdateModelMixin,
#                 generics.GenericAPIView):
    
#     queryset = AppUser.objects.all()
#     serializer_class = UserSerializer

#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)

#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)

# class Media(mixins.CreateModelMixin,
#             mixins.RetrieveModelMixin,
#             generics.GenericAPIView):
    
#     queryset = Post.objects.all()
#     serializer_class = MediaSerializer

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)
    
#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)

