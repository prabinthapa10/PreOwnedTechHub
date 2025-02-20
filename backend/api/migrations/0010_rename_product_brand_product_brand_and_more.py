# Generated by Django 5.1.4 on 2025-02-20 01:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_product_stock'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='product_brand',
            new_name='brand',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='added_date',
            new_name='date',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='product_description',
            new_name='description',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='product_image',
            new_name='image',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='product_condition',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='product_price',
            new_name='price',
        ),
        migrations.RemoveField(
            model_name='product',
            name='keyboard_type',
        ),
        migrations.RemoveField(
            model_name='product',
            name='product_category',
        ),
        migrations.RemoveField(
            model_name='product',
            name='product_name',
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.CharField(choices=[('Smartphone', 'Smartphone'), ('Laptop', 'Laptop'), ('Tablet', 'Tablet')], default='Laptop', max_length=100),
        ),
        migrations.AddField(
            model_name='product',
            name='condition',
            field=models.CharField(choices=[('New', 'New'), ('Used - Like New', 'Used - Like New'), ('Used - Good', 'Used - Good'), ('Used - Fair', 'Used - Fair')], default='New', max_length=100),
        ),
        migrations.AlterField(
            model_name='product',
            name='stock',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
