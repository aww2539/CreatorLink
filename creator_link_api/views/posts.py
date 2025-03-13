from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from creator_link_api.models import Posts, User


class PostView(ViewSet):
    def retrieve(self, request, pk):
        post = Posts.objects.get(pk=pk)
        serializer = PostSerializer(post)

        return Response(serializer.data)
        

    def list(self, request):
        posts = Posts.objects.all()
        serializer = PostSerializer(posts, many=True)

        return Response(serializer.data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Posts
        depth = 1
        fields = ('id', 'body', 'user', 'inserted_at', 'updated_at')
