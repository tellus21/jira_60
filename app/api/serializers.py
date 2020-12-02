from rest_framework import serializers
from .models import Profile, Company, CompanyReservation, Docktor, Inspection, Progress, ExaminationType, Course
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    # 日付を見やすく
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'created_at', 'updated_at']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    # 日付を見やすく
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'user_profile', 'nickname', 'department',
                  'img', 'authority', 'created_at', 'updated_at']
        extra_kwargs = {'user_profile': {'read_only': True}}


class CompanySerializer(serializers.ModelSerializer):
    # 日付を見やすく
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Company
        fields = "__all__"


class CompanyReservationSerializer(serializers.ModelSerializer):
    # 選択した数字ではなく、名前で出るようにオーバーライド
    payment_method = serializers.CharField(
        source='get_payment_method_display', read_only=True)
    result_destination = serializers.CharField(
        source='get_result_destination_display', read_only=True)
    # リレーション先の名前が出るように
    company_name = serializers.ReadOnlyField(
        source='company.name', read_only=True)
    # 日付を見やすく
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = CompanyReservation
        fields = "__all__"


class DocktorSerializer(serializers.ModelSerializer):
    # 日付を見やすく
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Docktor
        fields = "__all__"


class InspectionSerializer(serializers.ModelSerializer):
    # 日付を見やすく
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Inspection
        fields = "__all__"


class ExaminationTypeSerializer(serializers.ModelSerializer):
    # 日付を見やすく
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = ExaminationType
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    # 日付を見やすく
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Course
        fields = "__all__"


class ProgressSerializer(serializers.ModelSerializer):
    # 選択した数字ではなく、名前で出るようにオーバーライド
    # examination_type = serializers.CharField(
    #     source='get_examination_type_display', read_only=True)
    # examination_classification = serializers.CharField(
    #     source='get_examination_classification_display', read_only=True)
    # needs_billing = serializers.CharField(
    #     source='get_needs_billing_display', read_only=True)
    # result_destination = serializers.CharField(
    #     source='get_result_destination_display', read_only=True)
    # insurance_type = serializers.CharField(
    #     source='get_insurance_type_display', read_only=True)
    company_reservation_company_name = serializers.ReadOnlyField(
        source='company_reservation_company.name', read_only=True)
    company_name = serializers.ReadOnlyField(
        source='company.name', read_only=True)
    docktor_name = serializers.ReadOnlyField(
        source='docktor.name', read_only=True)
    next_inspection_name = serializers.ReadOnlyField(
        source='next_inspection.name', read_only=True)
    course_name = serializers.CharField(
        source='course.name', read_only=True)
    # 日付を見やすく
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Progress
        fields = "__all__"


# class ReservationSysDataSerializer(serializers.ModelSerializer):
#     # 日付を見やすく
#     created_at = serializers.DateTimeField(
#         format="%Y-%m-%d %H:%M", read_only=True)
#     updated_at = serializers.DateTimeField(
#         format="%Y-%m-%d %H:%M", read_only=True)

#     class Meta:
#         model = ReservationSysData
#         fields = "__all__"


# class ProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Profile
#         fields = ['id', 'user_profile', 'img']
#         extra_kwargs = {'user_profile': {'read_only': True}}


# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = ['id', 'item']


# class TaskSerializer(serializers.ModelSerializer):
#     category_item = serializers.ReadOnlyField(
#         source='category.item', read_only=True)
#     owner_username = serializers.ReadOnlyField(
#         source='owner.username', read_only=True)
#     responsible_username = serializers.ReadOnlyField(
#         source='responsible.username', read_only=True)
#     status_name = serializers.CharField(
#         source='get_status_display', read_only=True)
#     created_at = serializers.DateTimeField(
#         format="%Y-%m-%d %H:%M", read_only=True)
#     updated_at = serializers.DateTimeField(
#         format="%Y-%m-%d %H:%M", read_only=True)

#     class Meta:
#         model = Task
#         fields = ['id', 'task', 'description', 'criteria', 'status', 'status_name', 'category', 'category_item',
#                   'estimate', 'responsible', 'responsible_username', 'owner', 'owner_username', 'created_at', 'updated_at']
#         extra_kwargs = {'owner': {'read_only': True}}
