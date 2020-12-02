# Generated by Django 3.0.7 on 2020-12-02 08:21

import api.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='企業名')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='作成日時')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日時')),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cd', models.IntegerField(unique=True, verbose_name='コースコード')),
                ('name', models.CharField(max_length=100, verbose_name='コース名')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='作成日時')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日時')),
            ],
        ),
        migrations.CreateModel(
            name='Docktor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='名前')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='作成日時')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日時')),
            ],
        ),
        migrations.CreateModel(
            name='ExaminationType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cd', models.IntegerField(unique=True, verbose_name='受診種別コード')),
                ('name', models.CharField(max_length=50, verbose_name='受診種別名')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='作成日時')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日時')),
            ],
        ),
        migrations.CreateModel(
            name='Inspection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='検査名')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='作成日時')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日時')),
            ],
        ),
        migrations.CreateModel(
            name='Progress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reservation_sys_id', models.IntegerField(blank=True, verbose_name='予約システムID')),
                ('date', models.DateField(verbose_name='受診日')),
                ('karte_number', models.IntegerField(blank=True, verbose_name='カルテ番号')),
                ('patient_name', models.CharField(max_length=50, verbose_name='患者名')),
                ('examination_type', models.CharField(blank=True, choices=[('1', '未確定'), ('10080101', '人間ドック'), ('10080102', '健康診断'), ('10080104', '4000')], default='1', max_length=20, verbose_name='受診種別')),
                ('examination_classification', models.CharField(blank=True, choices=[('1', '未確定'), ('2', '個人'), ('3', '企業')], default='1', max_length=20, verbose_name='受診区分')),
                ('reservation_sys_company_name', models.CharField(blank=True, max_length=20, verbose_name='予約システム会社名')),
                ('needs_billing', models.CharField(choices=[('1', '未確定'), ('2', '有'), ('3', '無')], default='1', max_length=20, verbose_name='請求書有無')),
                ('result_destination', models.CharField(blank=True, choices=[('1', '未確定'), ('2', '個人'), ('3', '企業'), ('4', '個人/企業')], default='1', max_length=20, verbose_name='結果送付先')),
                ('remarks', models.CharField(blank=True, max_length=200, verbose_name='備考')),
                ('insurance_type', models.CharField(blank=True, choices=[('1', '未確定'), ('2', '特定国保'), ('3', '特定社保'), ('4', '協け'), ('5', '付加対象外')], default='1', max_length=20, verbose_name='保険種別')),
                ('has_scanned', models.BooleanField(verbose_name='スキャン')),
                ('has_requested_docktor', models.BooleanField(verbose_name='医師依頼')),
                ('has_requested_check', models.BooleanField(verbose_name='チェック依頼')),
                ('has_prepared', models.BooleanField(verbose_name='発送準備')),
                ('has_checked_final', models.BooleanField(verbose_name='最終チェック')),
                ('has_sent_individual', models.BooleanField(verbose_name='結果送付(個人)')),
                ('has_sent_company', models.BooleanField(verbose_name='結果送付(企業)')),
                ('has_sent_invoice', models.BooleanField(verbose_name='請求書送付')),
                ('memo', models.CharField(blank=True, max_length=200, verbose_name='メモ')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='作成日時')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日時')),
                ('company', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.PROTECT, related_name='company', to='api.Company', verbose_name='企業')),
                ('course', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.PROTECT, to='api.Course', to_field='cd', verbose_name='コース')),
                ('docktor', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.PROTECT, related_name='docktor', to='api.Docktor', verbose_name='担当医師')),
                ('next_inspection', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.PROTECT, related_name='inspection', to='api.Inspection', verbose_name='次の検査')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nickname', models.CharField(max_length=50, verbose_name='ニックネーム')),
                ('department', models.CharField(max_length=50, verbose_name='所属')),
                ('img', models.ImageField(blank=True, null=True, upload_to=api.models.upload_avatar_path)),
                ('authority', models.CharField(choices=[('1', '開発者'), ('2', '管理者'), ('3', 'ユーザ')], default='1', max_length=20, verbose_name='権限')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='作成日時')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日時')),
                ('user_profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_profile', to=settings.AUTH_USER_MODEL, verbose_name='ユーザプロフィール')),
            ],
        ),
        migrations.CreateModel(
            name='CompanyReservation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reservation_year', models.IntegerField(verbose_name='予約年')),
                ('pattern', models.IntegerField(verbose_name='パターン')),
                ('payment_method', models.CharField(choices=[('1', '未確定'), ('2', '窓口'), ('3', '請求')], default='1', max_length=20, verbose_name='支払方法')),
                ('result_destination', models.CharField(choices=[('1', '未確定'), ('2', '個人'), ('3', '企業'), ('4', '個人/企業')], default='1', max_length=20, verbose_name='結果送付先')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='作成日時')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日時')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='company_reservation_company', to='api.Company', verbose_name='企業名')),
            ],
        ),
    ]