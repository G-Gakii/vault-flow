from rest_framework import serializers
from transcations.models import Transaction

from django.db import transaction
from accounts.models import Account
from core.constants import STATIC_RATES



class TransactionSerializer(serializers.ModelSerializer):
    from_account_name = serializers.CharField(write_only=True)
    to_account_name = serializers.CharField(write_only=True)
    from_account =serializers.StringRelatedField(read_only=True)
    to_account =serializers.StringRelatedField(read_only=True)
    from_currency = serializers.CharField(read_only=True)
    to_currency = serializers.CharField(read_only=True)
    exchange_rate = serializers.FloatField(read_only=True)
    converted_amount = serializers.FloatField(read_only=True)
    status = serializers.CharField(read_only=True)
    class Meta:
         model = Transaction
         fields = '__all__'
       
    @transaction.atomic 
    def create(self,validated_data):
        from_name = validated_data.pop('from_account_name')
        to_name = validated_data.pop('to_account_name')
        
        # Lookup accounts based on name
        try:
            from_account = Account.objects.get(account_name=from_name)
        except Account.DoesNotExist:
            raise serializers.ValidationError({"from_account_name": "Account not found."})

        try:
            to_account = Account.objects.get(account_name=to_name)
        except Account.DoesNotExist:
            raise serializers.ValidationError({"to_account_name": "Account not found."})

        
     
        amount = validated_data['amount']
        note=validated_data.get('note','')
        
        #get to and from currency
        from_currency=from_account.currency
        to_currency=to_account.currency
        
        validated_data['from_currency'] = from_currency
        validated_data['to_currency'] = to_currency
        
        
        if from_account == to_account:
            raise serializers.ValidationError({"from_account_name": "You cannot transfer money to yourself."})
        
        if amount < 1:
            raise serializers.ValidationError({"amount":"Minimum amount to transfer is 1"})
        
        if from_account.balance < amount:
           
            validated_data['status'] = "Failed"
            validated_data['note'] = note 
            validated_data['exchange_rate'] = 0.0
            validated_data['converted_amount'] = 0.0
            
            return super().create({
                **validated_data,
    'from_account': from_account,
    'to_account': to_account
            })
        
        try:
        # Get FX rate using forex-python
            if from_currency == to_currency:
                rate = 1.0  
            else:
                
                rate = STATIC_RATES[(from_currency, to_currency)]
        except Exception as e:
                
                validated_data['status'] = "Failed"
                validated_data['note'] = note + f" | FX error: No rate for {from_currency} → {to_currency}"

                validated_data['exchange_rate'] = 0.0
                validated_data['converted_amount'] = 0.0
                return super().create({
                    **validated_data,
        'from_account': from_account,
        'to_account': to_account
                })  
            
        
        #convert and save
        converted_amount = amount * rate
        from_account.balance -= amount
        to_account.balance += converted_amount
        from_account.save()
        to_account.save()
        
        
        validated_data['exchange_rate'] = rate
        validated_data['converted_amount'] = converted_amount
        validated_data['status'] = "Completed" 
        
        validated_data['note'] = note

        return super().create({**validated_data,
    'from_account': from_account,
    'to_account': to_account},)    