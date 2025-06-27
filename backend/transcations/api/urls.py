from django.urls import path
from transcations.api.views import TransactionList

urlpatterns = [
    path("",TransactionList.as_view(),name="transcation")
]
