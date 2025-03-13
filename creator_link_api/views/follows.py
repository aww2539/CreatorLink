from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from creator_link_api.models import Follows, User


class FollowsView(ViewSet):
    def retrieve(self, request, pk):
        follow = Follows.objects.get(pk=pk)
        serializer = FollowSerializer(follow)

        return Response(serializer.data)
        

    def list(self, request):
        
        follows = Follows.objects.all()
        serializer = FollowSerializer(follows, many=True)

        return Response(serializer.data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')

class FollowSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Follows
        depth = 1
        fields = ('id', 'follow', 'follower')
