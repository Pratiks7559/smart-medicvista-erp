# GST Invoice Integration Instructions

## Add this button to your invoice detail page (invoice_detail.html):

```html
<!-- Add this in the action buttons section -->
<a href="{% url 'print_gst_purchase_invoice' invoice.invoiceid %}" 
   class="btn btn-success" 
   target="_blank">
    <i class="fas fa-file-invoice"></i> GST Invoice
</a>

<!-- For PDF download (if WeasyPrint is installed) -->
<a href="{% url 'download_gst_invoice_pdf' invoice.invoiceid %}" 
   class="btn btn-danger">
    <i class="fas fa-file-pdf"></i> Download PDF
</a>
```

## Install WeasyPrint (Optional for PDF):

```bash
pip install weasyprint
```

## Add PDF URL to urls.py:

```python
from .pdf_generator import download_gst_invoice_pdf

urlpatterns = [
    # ... existing urls
    path('purchases/<int:invoice_id>/gst-pdf/', download_gst_invoice_pdf, name='download_gst_invoice_pdf'),
]
```

## Features Included:

✅ A5 Landscape format
✅ Black & white design
✅ GST-compliant structure
✅ HSN code column
✅ CGST/SGST breakdown
✅ GST summary table (grouped by rate)
✅ Amount in words (Indian format)
✅ Bank details section
✅ Terms & conditions
✅ Authorized signature
✅ Print-optimized CSS
✅ Real pharmacy bill layout

## Test the Invoice:

1. Go to any purchase invoice detail page
2. Click "GST Invoice" button
3. Print using Ctrl+P
4. Select A5 Landscape in print settings
5. Print or Save as PDF

## Customization:

Edit `gst_purchase_invoice.html` to:
- Change company logo
- Modify terms & conditions
- Adjust font sizes
- Add/remove fields
- Change colors (for screen view)

## Notes:

- Invoice automatically calculates GST based on purchase data
- Supports multiple GST rates in same invoice
- Amount in words uses Indian numbering (Crore, Lakh, Thousand)
- Print-optimized for thermal and laser printers
- Compatible with all modern browsers
