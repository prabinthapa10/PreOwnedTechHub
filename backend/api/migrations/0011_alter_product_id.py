# Generated by Django 5.1.4 on 2025-02-23 06:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_rename_product_brand_product_brand_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
