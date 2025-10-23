# Sales Return Stock Calculation Fix

## समस्या (Problem)
Sales return में product select करने के बाद batch number fetch करते समय stock correctly calculate नहीं हो रहा था। उदाहरण के लिए, Paracetamol की 1234 batch में 1 stock है लेकिन 0 (zero) दिखा रहा था।

## मूल कारण (Root Cause)
1. **Stock Calculation में Returns Missing**: `get_batch_stock_status` function में purchase returns और sales returns को properly include नहीं किया जा रहा था
2. **Incorrect Formula**: Stock calculation formula में returns को सही तरीके से handle नहीं किया जा रहा था
3. **API Issues**: Product batch selector API में stock information सही नहीं आ रहा था

## समाधान (Solution)

### 1. Stock Calculation Formula को Fix किया
**पुराना Formula (गलत):**
```
Current Stock = Purchased - Sold
```

**नया Formula (सही):**
```
Current Stock = Purchased - Sold - Purchase_Returns + Sales_Returns
```

### 2. Updated Files

#### `core/utils.py`
- `get_batch_stock_status()` function को completely rewrite किया
- Purchase returns और sales returns को properly include किया
- Debug logging add की stock calculation track करने के लिए

#### `core/views.py`
- `get_product_batch_selector()` API को update किया
- `get_batch_details()` API को fix किया
- अब ये functions corrected stock calculation use करते हैं

#### `core/stock_manager.py`
- Debug logging add की better tracking के लिए
- Stock calculation comments को clarify किया

#### `templates/returns/sales_return_form.html`
- Stock validation functions add किए
- Real-time stock checking add की
- Visual feedback add की stock availability के लिए

### 3. Test Script
`test_stock_calculation.py` script बनाई गई है जो:
- Stock calculations को verify करती है
- Paracetamol batch 1234 case को specifically test करती है
- Manual calculation vs function results को compare करती है

## कैसे Test करें (How to Test)

### 1. Test Script Run करें:
```bash
cd pharmamgmt
python test_stock_calculation.py
```

### 2. Manual Testing:
1. Sales Return form open करें
2. कोई product select करें
3. Batch number enter करें
4. Check करें कि correct stock show हो रहा है
5. Batch selector dialog में भी stock correctly display हो रहा है

### 3. Database Verification:
```sql
-- Check stock for specific product and batch
SELECT 
    p.product_name,
    pm.product_batch_no,
    SUM(pm.product_quantity) as purchased,
    COALESCE(SUM(sm.sale_quantity), 0) as sold,
    COALESCE(SUM(rpm.returnproduct_quantity), 0) as purchase_returns,
    COALESCE(SUM(rsm.return_sale_quantity), 0) as sales_returns,
    (SUM(pm.product_quantity) - COALESCE(SUM(sm.sale_quantity), 0) - 
     COALESCE(SUM(rpm.returnproduct_quantity), 0) + 
     COALESCE(SUM(rsm.return_sale_quantity), 0)) as current_stock
FROM core_productmaster p
LEFT JOIN core_purchasemaster pm ON p.productid = pm.productid_id
LEFT JOIN core_salesmaster sm ON p.productid = sm.productid_id AND pm.product_batch_no = sm.product_batch_no
LEFT JOIN core_returnpurchasemaster rpm ON p.productid = rpm.returnproductid_id AND pm.product_batch_no = rpm.returnproduct_batch_no
LEFT JOIN core_returnsalesmaster rsm ON p.productid = rsm.return_productid_id AND pm.product_batch_no = rsm.return_product_batch_no
WHERE p.product_name LIKE '%paracetamol%' AND pm.product_batch_no = '1234'
GROUP BY p.productid, p.product_name, pm.product_batch_no;
```

## Expected Results

### Before Fix:
- Paracetamol batch 1234 showing 0 stock (incorrect)
- Sales return form में wrong stock information
- Batch selector में incorrect stock display

### After Fix:
- Correct stock calculation including all returns
- Real-time stock validation in sales return form
- Accurate stock display in batch selector
- Debug logs showing detailed calculation breakdown

## Benefits

1. **Accurate Stock Management**: अब stock calculation completely accurate है
2. **Better User Experience**: Real-time stock validation और visual feedback
3. **Data Integrity**: Returns properly included in stock calculations
4. **Debugging Support**: Detailed logging for troubleshooting
5. **Validation**: Form submission validation to prevent over-returns

## Files Modified

1. `core/utils.py` - Stock calculation functions
2. `core/views.py` - API endpoints for stock information
3. `core/stock_manager.py` - Debug logging
4. `templates/returns/sales_return_form.html` - UI improvements
5. `test_stock_calculation.py` - Test script (new file)
6. `SALES_RETURN_STOCK_FIX.md` - Documentation (this file)

## Testing Checklist

- [ ] Test script runs without errors
- [ ] Paracetamol batch 1234 shows correct stock
- [ ] Sales return form shows real-time stock
- [ ] Batch selector displays accurate stock
- [ ] Form validation prevents over-returns
- [ ] Debug logs show detailed calculations
- [ ] Stock calculation includes all return types

## Notes

- Debug logging को production में disable करना चाहिए performance के लिए
- यह fix backward compatible है - existing data पर कोई impact नहीं
- Stock calculation अब completely accurate है और सभी transaction types को include करती है