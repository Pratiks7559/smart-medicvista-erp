# Sales Return Rate Type Matching

## Overview
This feature implements intelligent rate matching in the Sales Return form based on customer type and product batch information.

## How It Works

### 1. Customer Rate Type Detection
- When a customer is selected, their rate type (TYPE-A, TYPE-B, TYPE-C) is automatically detected
- The rate type is displayed in a dedicated field for user reference
- Visual feedback shows which rate type will be applied

### 2. Product and Batch Selection
- When a product is selected, available batches are loaded
- Each batch can have specific rates (Rate A, Rate B, Rate C) stored in `SaleRateMaster`
- If no batch-specific rates exist, MRP is used as fallback

### 3. Automatic Rate Matching
The system matches customer type to appropriate rate:

| Customer Type | Rate Applied | Fallback Hierarchy |
|---------------|--------------|-------------------|
| TYPE-A / Retailer | Rate A | MRP |
| TYPE-B / Wholesaler | Rate B | Rate A → MRP |
| TYPE-C / Distributor | Rate C | Rate B → Rate A → MRP |

### 4. Example Scenario
```
Customer: Yash (TYPE-C)
Product: Paracetamol
Batch: 111

Batch 111 rates:
- Rate A: ₹10.00
- Rate B: ₹9.00  
- Rate C: ₹8.50

Result: Rate C (₹8.50) is automatically applied
```

## Implementation Details

### Frontend (JavaScript)
- `loadCustomerRateType()`: Detects and displays customer rate type
- `loadBatchRateForCustomer()`: Fetches and applies appropriate rate
- `onBatchChange()`: Triggers rate matching when batch is selected
- Visual indicators show rate matching status

### Backend (Django)
- `get_customer_rate_info()`: API endpoint that returns batch rates
- Enhanced error handling and logging
- Fallback hierarchy implementation

### Database Models
- `CustomerMaster.customer_type`: Stores customer rate type
- `SaleRateMaster`: Stores batch-specific rates (A, B, C)
- `PurchaseMaster`: Provides MRP fallback

## User Experience Features

### Visual Feedback
- ✅ Rate indicators show which rate type was applied
- ⚠️ Warnings when customer not selected
- 🔄 Loading indicators during rate fetching
- 💡 Helpful tips and examples

### Keyboard Shortcuts
- **F2**: Quick product search
- **Alt+W**: Batch selector modal
- **Esc**: Close modals/clear fields
- **Ctrl+S**: Save form

### Smart Workflow
1. **Select Customer First** → Rate type is detected
2. **Choose Product** → Available batches loaded
3. **Select Batch** → Rate automatically matched
4. **Verify Rate** → Visual confirmation shown

## Testing

Run the test script to verify functionality:
```bash
python test_rate_matching.py
```

## Benefits

1. **Accuracy**: Eliminates manual rate entry errors
2. **Efficiency**: Automatic rate matching saves time
3. **Consistency**: Ensures correct rates for customer types
4. **User-Friendly**: Clear visual feedback and guidance
5. **Flexible**: Supports multiple fallback options

## Configuration

### Setting Up Customer Types
Ensure customers have proper rate types:
- TYPE-A or Retailer
- TYPE-B or Wholesaler  
- TYPE-C or Distributor

### Setting Up Batch Rates
Configure batch-specific rates in `SaleRateMaster`:
```python
SaleRateMaster.objects.create(
    productid=product,
    product_batch_no="111",
    rate_A=10.00,
    rate_B=9.00,
    rate_C=8.50
)
```

## Troubleshooting

### Common Issues
1. **No rate applied**: Check if customer has rate type set
2. **Wrong rate**: Verify batch-specific rates in database
3. **Rate not updating**: Ensure JavaScript is enabled

### Debug Information
- Check browser console for detailed logs
- API responses include debug information
- Test script provides comprehensive validation

## Future Enhancements
- Bulk rate updates
- Rate history tracking
- Advanced rate calculation rules
- Integration with pricing strategies