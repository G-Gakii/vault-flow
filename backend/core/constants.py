CURRENCY_CHOICES = (
    ("KES", "Kenyan Shilling"),
    ("USD", "US Dollar"),
    ("NGN", "Naira"),
)
STATUS_CHOICES=(
    ("Completed","Completed"),
    ("Failed","Failed"),
    ("Scheduled","Scheduled")
    
)

STATIC_RATES = {
    ("KES", "USD"): 0.0069,    
    ("USD", "KES"): 145.0,
    ("KES", "NGN"): 5.20,
    ("NGN", "KES"): 0.192,
    ("USD", "NGN"): 750.0,
    ("NGN", "USD"): 0.0013,
}

