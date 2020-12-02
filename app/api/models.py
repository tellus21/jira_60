from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
import uuid

from django.db.models.fields.related import ForeignKey


def upload_avatar_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['avatars', str(instance.user_profile.id) + str(".") + str(ext)])


class Profile(models.Model):
    AUTHORITY = (
        ('1', '開発者'),
        ('2', '管理者'),
        ('3', 'ユーザ'),
    )
    user_profile = models.OneToOneField(
        User, verbose_name='ユーザプロフィール', related_name='user_profile',
        on_delete=models.CASCADE
    )
    nickname = models.CharField(verbose_name='ニックネーム', max_length=50)
    department = models.CharField(verbose_name='所属', max_length=50)
    img = models.ImageField(blank=True, null=True,
                            upload_to=upload_avatar_path)
    authority = models.CharField(
        verbose_name='権限', max_length=20, choices=AUTHORITY, default='1')

    created_at = models.DateTimeField(verbose_name='作成日時', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='更新日時', auto_now=True)

    def __str__(self):
        return self.user_profile.username


# class User(models.Model):
#     AUTHORITY = (
#         ('1', '開発者'),
#         ('2', '管理者'),
#         ('3', 'ユーザ'),
#     )
#     name = models.CharField(verbose_name='名前', max_length=50)


#     def __str__(self):
#         return self.name


class Company(models.Model):
    name = models.CharField(verbose_name='企業名', max_length=50)
    created_at = models.DateTimeField(
        verbose_name='作成日時', auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(
        verbose_name='更新日時', auto_now=True, blank=True)

    def __str__(self):
        return self.name


class CompanyReservation(models.Model):
    METHOD = (
        ('1', '未確定'),
        ('2', '窓口'),
        ('3', '請求'),
    )
    DESTINATION = (
        ('1', '未確定'),
        ('2', '個人'),
        ('3', '企業'),
        ('4', '個人/企業'),
    )
    company = models.ForeignKey(
        Company, verbose_name='企業名', on_delete=models.PROTECT, related_name='company_reservation_company')
    reservation_year = models.IntegerField(verbose_name='予約年')
    pattern = models.IntegerField(verbose_name='パターン')
    payment_method = models.CharField(
        verbose_name='支払方法', max_length=20, choices=METHOD, default='1')
    result_destination = models.CharField(
        verbose_name='結果送付先', max_length=20, choices=DESTINATION, default='1')
    created_at = models.DateTimeField(verbose_name='作成日時', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='更新日時', auto_now=True)

    def __str__(self):
        return self.company.name + '_' + str(self.reservation_year) + '_' + str(self.pattern)


class Docktor(models.Model):
    name = models.CharField(verbose_name='名前', max_length=50)
    created_at = models.DateTimeField(verbose_name='作成日時', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='更新日時', auto_now=True)

    def __str__(self):
        return self.name


class Inspection(models.Model):
    name = models.CharField(verbose_name='検査名', max_length=50)
    created_at = models.DateTimeField(verbose_name='作成日時', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='更新日時', auto_now=True)

    def __str__(self):
        return self.name

class ExaminationType(models.Model):
    cd = models.IntegerField(verbose_name='受診種別コード', unique=True)
    name = models.CharField(verbose_name='受診種別名', max_length=50)
    created_at = models.DateTimeField(verbose_name='作成日時', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='更新日時', auto_now=True)

    def __str__(self):
        return self.name

class Course(models.Model):
    cd = models.IntegerField(verbose_name='コースコード', unique=True)
    name = models.CharField(verbose_name='コース名', max_length=100)
    created_at = models.DateTimeField(verbose_name='作成日時', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='更新日時', auto_now=True)

    def __str__(self):
        return self.name


class Progress(models.Model):
    TYPE = (
        ('1', '未確定'),
        ('10080101', '人間ドック'),
        ('10080102', '健康診断'),
        ('10080104', '4000'),
    )
    CLASSIFICATION = (
        ('1', '未確定'),
        ('2', '個人'),
        ('3', '企業'),
    )
    BILLING = (
        ('1', '未確定'),
        ('2', '有'),
        ('3', '無'),
    )
    DESTINATION = (
        ('1', '未確定'),
        ('2', '個人'),
        ('3', '企業'),
        ('4', '個人/企業'),
    )
    INSURANCE_TYPE = (
        ('1', '未確定'),
        ('2', '特定国保'),
        ('3', '特定社保'),
        ('4', '協け'),
        ('5', '付加対象外'),
    )

    reservation_sys_id = models.IntegerField(
        verbose_name='予約システムID', blank=True)
    date = models.DateField(verbose_name='受診日')
    karte_number = models.IntegerField(verbose_name='カルテ番号', blank=True)
    patient_name = models.CharField(verbose_name='患者名', max_length=50)
    # examination_type = models.CharField(
    #     verbose_name='受診種別', max_length=20, choices=TYPE, default='1', blank=True)
    examination_type = models.CharField(
        verbose_name='受診種別', max_length=20, choices=TYPE, default='1', blank=True)
    course = models.ForeignKey(
        Course, verbose_name='コース', to_field='cd', on_delete=models.PROTECT, blank=True)
    examination_classification = models.CharField(
        verbose_name='受診区分', max_length=20, choices=CLASSIFICATION, default='1', blank=True)
    company = models.ForeignKey(
        Company, verbose_name='企業', on_delete=models.PROTECT, related_name='company', blank=True)
    reservation_sys_company_name = models.CharField(
        verbose_name='予約システム会社名', max_length=20, blank=True)
    needs_billing = models.CharField(
        verbose_name='請求書有無', max_length=20, choices=BILLING, default='1')
    result_destination = models.CharField(
        verbose_name='結果送付先', max_length=20, choices=DESTINATION, default='1', blank=True)
    remarks = models.CharField(verbose_name='備考', max_length=200, blank=True)
    insurance_type = models.CharField(
        verbose_name='保険種別', max_length=20, choices=INSURANCE_TYPE, default='1', blank=True)
    has_scanned = models.BooleanField(verbose_name='スキャン')
    has_requested_docktor = models.BooleanField(verbose_name='医師依頼')
    has_requested_check = models.BooleanField(verbose_name='チェック依頼')
    has_prepared = models.BooleanField(verbose_name='発送準備')
    has_checked_final = models.BooleanField(verbose_name='最終チェック')
    has_sent_individual = models.BooleanField(verbose_name='結果送付(個人)')
    has_sent_company = models.BooleanField(verbose_name='結果送付(企業)')
    has_sent_invoice = models.BooleanField(verbose_name='請求書送付')
    docktor = models.ForeignKey(
        Docktor, verbose_name='担当医師', on_delete=models.PROTECT, related_name='docktor', blank=True)
    next_inspection = models.ForeignKey(
        Inspection, verbose_name='次の検査', on_delete=models.PROTECT, related_name='inspection', blank=True)
    memo = models.CharField(verbose_name='メモ', max_length=200, blank=True)
    created_at = models.DateTimeField(
        verbose_name='作成日時', auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(
        verbose_name='更新日時', auto_now=True, blank=True)

    def __str__(self):
        return self.patient_name


# class ReservationSysData(models.Model):
#     date = models.DateField(verbose_name='受診日', max_length=50)
#     reservation_sys_id = models.CharField(verbose_name='予約シスID', max_length=12)
#     patient_name = models.CharField(verbose_name='患者名', max_length=50)
#     memo = models.CharField(verbose_name='メモ', max_length=200, blank=True)
#     company_name = models.CharField(
#         verbose_name='企業名', max_length=50, blank=True)
#     examination_type_cd = models.CharField(
#         verbose_name='検査種別コード', max_length=8)
#     course_cd = models.CharField(verbose_name='コースコード', max_length=8)
#     created_at = models.DateTimeField(verbose_name='作成日時', auto_now_add=True)
#     updated_at = models.DateTimeField(verbose_name='更新日時', auto_now=True)

#     def __str__(self):
#         return self.patient_name


# def upload_avatar_path(instance, filename):
#     ext = filename.split('.')[-1]
#     return '/'.join(['avatars', str(instance.user_profile.id) + str(.) + str(ext)])


# class Profile(models.Model):
#     user_profile = models.OneToOneField(
#         User, related_name='user_profile',
#         on_delete=models.CASCADE
#     )
#     img = models.ImageField(blank=True, null=True,
#                             upload_to=upload_avatar_path)

#     def __str__(self):
#         return self.user_profile.username


# class Category(models.Model):
#     item = models.CharField(max_length=100)

#     def __str__(self):
#         return self.item


# class Task(models.Model):
#     STATUS = (
#         ('1', 'Not started'),
#         ('2', 'On going'),
#         ('3', 'Done'),
#     )
#     id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
#     task = models.CharField(max_length=100)
#     description = models.CharField(max_length=300)
#     criteria = models.CharField(max_length=100)
#     status = models.CharField(max_length=40, choices=STATUS, default='1')
#     category = models.ForeignKey(Category, on_delete=models.CASCADE)
#     estimate = models.IntegerField(validators=[MinValueValidator(0)])
#     owner = models.ForeignKey(
#         User, on_delete=models.CASCADE, related_name='owner')
#     responsible = models.ForeignKey(
#         User, on_delete=models.CASCADE, related_name='responsible')
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.task
