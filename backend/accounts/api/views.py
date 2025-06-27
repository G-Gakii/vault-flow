from accounts.models import Account
from accounts.api.serializers import AccountSerializers
from rest_framework import generics
from rest_framework import filters

class AccountList(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializers
    
    filter_backends = [filters.SearchFilter]
    search_fields = ['from_account', 'to_account','from_currency','to_currency']