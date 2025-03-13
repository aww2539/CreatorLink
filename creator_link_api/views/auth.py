from rest_framework.decorators import api_view
from rest_framework.response import Response
from creator_link_api.models import User


@api_view(['POST'])
def login_user(request):
    '''Checks to see if User exists

    Method arguments:
      request -- The full HTTP request object
    '''
    email = request.data['email']
    password = request.data['password']

    

    try:
        user = User.objects.get(email=email, password=password)

        data = {
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
        }
        return Response(data)
    except:
        data = { 'valid': False }
        return Response(data)

@api_view(['POST'])
def register_user(request):
    '''Handles the creation of a new user for authentication

    Method arguments:
      request -- The full HTTP request object
    '''
    user = User.objects.create(
        first_name=request.data['first_name'],
        last_name=request.data['last_name'],
        email=request.data['email'],
        city=request.data['city'],
        state=request.data['state'],
        country=request.data['country']
    )

    data = {
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'password': user.password,
    }
    return Response(data)