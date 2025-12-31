# 🏥 Smart MedicVista ERP

A comprehensive Django-based ERP system for pharmaceutical and herbal product management with modern landing pages.

## 🌟 Features

### Core Modules
- 📦 **Inventory Management** - Real-time stock tracking with batch management
- 💰 **Purchase Management** - Invoice creation, supplier management, payments
- 🛒 **Sales Management** - Customer orders, invoicing, payment tracking
- 📊 **Financial Reports** - Comprehensive financial analytics and reports
- 👥 **Customer & Supplier Management** - Complete CRM functionality
- 🔄 **Returns Management** - Purchase and sales returns handling
- 📋 **Challan System** - Delivery challan management
- 💳 **Payment & Receipt Tracking** - Complete payment lifecycle management

### Advanced Features
- 🎨 **3 Modern Landing Pages** - Unique, responsive designs
- 📈 **Real-time Analytics** - Dashboard with live statistics
- 🔍 **Advanced Search** - Fast product and batch search
- 📱 **Responsive Design** - Mobile-friendly interface
- 🔐 **User Management** - Role-based access control
- 📄 **PDF Generation** - Invoices, receipts, and reports
- 📊 **Excel Export** - Data export functionality
- 🔔 **Low Stock Alerts** - Automated inventory notifications

## 🚀 Tech Stack

- **Backend**: Django 4.x
- **Database**: SQLite (Production: MySQL/PostgreSQL)
- **Frontend**: HTML5, CSS3, JavaScript
- **UI Framework**: Bootstrap 5
- **Icons**: Font Awesome 6
- **Charts**: Chart.js

## 📋 Prerequisites

- Python 3.8+
- pip
- virtualenv (recommended)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/Pratiks7559/smart-medicvista-erp.git
cd smart-medicvista-erp
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Run migrations**
```bash
python manage.py migrate
```

5. **Create superuser**
```bash
python manage.py createsuperuser
```

6. **Collect static files**
```bash
python manage.py collectstatic
```

7. **Run development server**
```bash
python manage.py runserver
```

Visit: `http://127.0.0.1:8000/`

## 🌐 Landing Pages

- **Landing 1**: `/` - Classic herbal theme with golden accents
- **Landing 2**: `/landing2` - Modern natural wellness design
- **Landing 3**: `/landing3` - Futuristic tech-inspired layout

## 📱 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Inventory Management
![Inventory](screenshots/inventory.png)

### Sales Invoice
![Sales](screenshots/sales.png)

## 🔧 Configuration

### Settings
Edit `pharmamgmt/settings.py`:

```python
# For production
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com']

# Database (MySQL example)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

## 📦 Deployment

### GoDaddy Deployment
1. Upload files via FTP
2. Create `passenger_wsgi.py`
3. Configure `.htaccess`
4. Run migrations
5. Collect static files

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Pratik Zope**
- GitHub: [@Pratiks7559](https://github.com/Pratiks7559)

## 🙏 Acknowledgments

- Django Framework
- Bootstrap Team
- Font Awesome
- All contributors

## 📞 Support

For support, email: support@medicvista.com or join our Slack channel.

---

⭐ Star this repo if you find it helpful!
