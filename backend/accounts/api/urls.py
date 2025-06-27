from django.urls import path
from accounts.api.views import AccountList

urlpatterns = [
    path("",AccountList.as_view(),name="account")
]
