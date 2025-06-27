from django.db import models
import uuid
from core.constants import CURRENCY_CHOICES

# Create your models here.
class Account(models.Model):
    
    account_id=models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False,unique=True)
    account_name=models.CharField(max_length=50,unique=True)
    currency=models.CharField(max_length=3,choices=CURRENCY_CHOICES)
    balance=models.FloatField(default=0.00)


    def __str__(self):
       return self.account_name
   