# Generated by Django 5.1.4 on 2025-03-20 10:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_order_purchase_order_id_order_staus'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='staus',
            new_name='status',
        ),
    ]
