from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from creator_link_api.models import Profile, ProfileLinks, User


class ProfileView(ViewSet):
    def retrieve(self, request, pk):

        profile = Profile.objects.get(pk=pk)
        serializer = ProfileSerializer(profile)

        return Response(serializer.data)
        

    def list(self, request):
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)

        return Response(serializer.data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = ('id', 'bio', 'views', 'user')
