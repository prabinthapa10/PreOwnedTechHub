# Generated by Django 5.1.4 on 2025-02-18 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='added_date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
