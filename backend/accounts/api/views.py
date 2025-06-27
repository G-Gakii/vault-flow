from accounts.models import Account
from accounts.api.serializers import AccountSerializers
from rest_framework import generics


class AccountList(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializers
    
    