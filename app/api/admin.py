from django.contrib import admin
from .models import Profile, Company, CompanyReservation, Course, Docktor, Inspection, Progress

# admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Company)
admin.site.register(Course)
admin.site.register(Docktor)
admin.site.register(Inspection)
admin.site.register(Progress)