from transcations.models import Transaction
from transcations.api.serializers import TransactionSerializer
from rest_framework import generics


class TransactionList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    