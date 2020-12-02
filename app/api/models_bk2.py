from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxLengthValidator, MaxValueValidator, MinValueValidator, integer_validator
import uuid

from django.db.models.fields import BooleanField, CharField, IntegerField


class Company(models.Model):  # 会社
    name = models.CharField(max_length=50)
    furigana = models.CharField(max_length=50, blank=True)
    person_in_charge = models.CharField(max_length=20, blank=True)
    phone_number = models.IntegerField
    fax_number = models.IntegerField
    address = models.CharField(max_length=100)
    examination_content = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)
    fee = models.CharField(max_length=50, blank=True)
    paymnt_method = models.CharField(max_length=50, blank=True)
    certificate_fee = models.CharField(max_length=50, blank=True)
    roster = models.BooleanField
    advance_send = models.CharField(max_length=50, blank=True)
    number_of_copies = models.IntegerField
    send_results = models.BooleanField
    notes = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return self.name


class Patient(models.Model):  # 患者
    name = models.CharField(max_length=20)
    furigana = models.CharField(max_length=40)
    company_name = models.ForeignKey(Company, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ConsultationType(models.Model):  # 受診種別
    type = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.type


class Course(models.Model):  # コース
    type = models.ForeignKey(ConsultationType, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Docktor(models.Model):  # 医師
    name = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Examination(models.Model):  # 診察
    date = models.DateField
    karte_number = models.IntegerField
    patient_name = models.ForeignKey(Patient, on_delete=models.CASCADE)
    consultation_type = models.ForeignKey(
        ConsultationType, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    docktor = models.ForeignKey(Docktor, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.patient_name
