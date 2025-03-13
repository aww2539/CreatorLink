from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers, status
from creator_link_api.models import Profile, ProfileLinks, User


class ProfileLinksView(ViewSet):
    def retrieve(self, request, pk):
        profile_link = ProfileLinks.objects.get(pk=pk)
        serializer = ProfileLinkSerializer(profile_link)

        return Response(serializer.data)
        

    def list(self, request):
        profile_id = self.request.query_params.get("profile_id", None)

        if profile_id is not None:
            links = ProfileLinks.objects.filter(profile__id=profile_id)

            serializer = ProfileLinkSerializer(links, many=True)
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

class ProfileLinkSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:

        model = ProfileLinks
        depth = 1
        fields = ('id', 'name', 'url', 'order', 'clicks', 'profile')
