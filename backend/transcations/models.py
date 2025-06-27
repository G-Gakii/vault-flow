from django.db import models
import uuid
from accounts.models import Account
from core.constants import CURRENCY_CHOICES,STATUS_CHOICES

# Create your models here.
class Transaction(models.Model):
    transaction_id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False,unique=True)
    from_account=models.ForeignKey(Account,on_delete=models.CASCADE, related_name='outgoing_transactions')
    to_account=models.ForeignKey(Account, on_delete=models.CASCADE, related_name='incoming_transactions')
    amount=models.FloatField()
    from_currency=models.CharField(choices=CURRENCY_CHOICES,max_length=3)
    to_currency=models.CharField(choices=CURRENCY_CHOICES,max_length=3)
    exchange_rate=models.FloatField()
    converted_amount=models.FloatField()
    note=models.TextField(blank=True,null=True)
    status=models.CharField(choices=STATUS_CHOICES,max_length=20)
    scheduled_date=models.DateTimeField(null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    
    
    class Meta:
        ordering =["-created_at"]
    
    
    def __str__(self):
        return f"{self.from_currency} {self.amount}"




 


















