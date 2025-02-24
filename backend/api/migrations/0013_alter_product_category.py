# Generated by Django 5.1.4 on 2025-02-24 06:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_product_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.CharField(choices=[('Smartphone', 'Smartphone'), ('Laptop', 'Laptop'), ('Smartwatch', 'Smartwatch')], default='Laptop', max_length=100),
        ),
    ]
