from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.contrib.auth.decorators import login_required
from weasyprint import HTML
import tempfile

@login_required
def download_gst_invoice_pdf(request, invoice_id):
    """Generate and download GST invoice as PDF using WeasyPrint"""
    from core.gst_invoice_view import print_gst_purchase_invoice
    
    # Get the rendered HTML
    response = print_gst_purchase_invoice(request, invoice_id)
    html_string = response.content.decode('utf-8')
    
    # Generate PDF
    html = HTML(string=html_string)
    pdf = html.write_pdf()
    
    # Create HTTP response
    response = HttpResponse(pdf, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="GST_Invoice_{invoice_id}.pdf"'
    
    return response

# Alternative: Direct PDF generation
@login_required
def generate_gst_invoice_pdf(request, invoice_id):
    """Generate GST invoice PDF directly"""
    from core.models import InvoiceMaster, PurchaseMaster, Pharmacy_Details
    from collections import defaultdict
    from decimal import Decimal
    
    invoice = get_object_or_404(InvoiceMaster, invoiceid=invoice_id)
    purchases = PurchaseMaster.objects.filter(product_invoiceid=invoice_id).order_by('productid')
    pharmacy = Pharmacy_Details.objects.first()
    
    # [Same calculation logic as in gst_invoice_view.py]
    # ... (copy the calculation code here)
    
    # Render template
    html_string = render_to_string('purchases/gst_purchase_invoice.html', {
        'invoice': invoice,
        'items': items_with_calculations,
        'gst_summary': dict(gst_summary),
        'total_taxable': total_taxable,
        'total_cgst': total_cgst,
        'total_sgst': total_sgst,
        'grand_total': grand_total,
        'amount_in_words': amount_in_words,
        'pharmacy': pharmacy,
    })
    
    # Generate PDF
    html = HTML(string=html_string)
    pdf = html.write_pdf()
    
    # Return PDF response
    response = HttpResponse(pdf, content_type='application/pdf')
    response['Content-Disposition'] = f'inline; filename="GST_Invoice_{invoice.invoice_no}.pdf"'
    
    return response
