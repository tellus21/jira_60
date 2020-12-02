from django.shortcuts import render
from rest_framework import status, permissions, generics, viewsets
from .serializers import UserSerializer, ProfileSerializer, CompanySerializer, CompanyReservationSerializer,  DocktorSerializer,ExaminationTypeSerializer,CourseSerializer, InspectionSerializer, ProgressSerializer
from rest_framework.response import Response
from .models import Profile, Company, CompanyReservation, Docktor, ExaminationType,Course, Inspection, Progress
from django.contrib.auth.models import User
from . import custompermissions


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)


class ListUserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LoginUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        response = {'message': 'PUT method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)

    def destroy(self, request, *args, **kwargs):
        response = {'message': 'DELETE method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'PATCH method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanyReservationViewSet(viewsets.ModelViewSet):
    queryset = CompanyReservation.objects.all()
    serializer_class = CompanyReservationSerializer


class DocktorViewSet(viewsets.ModelViewSet):
    queryset = Docktor.objects.all()
    serializer_class = DocktorSerializer

class ExaminationTypeViewSet(viewsets.ModelViewSet):
    queryset = ExaminationType.objects.all()
    serializer_class = ExaminationTypeSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class InspectionViewSet(viewsets.ModelViewSet):
    queryset = Inspection.objects.all()
    serializer_class = InspectionSerializer


class ProgressViewSet(viewsets.ModelViewSet):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer
    # permission_classes = (permissions.IsAuthenticated,
    #                       custompermissions.OwnerPermission,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'PATCH method is not allowed'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


# class ReservationSysDataViewSet(viewsets.ModelViewSet):
#     queryset = ReservationSysData.objects.all()
#     serializer_class = ReservationSysDataSerializer

# class ProfileViewSet(viewsets.ModelViewSet):
#     queryset = Profile.objects.all()
#     serializer_class = ProfileSerializer

#     def perform_create(self, serializer):
#         serializer.save(user_profile=self.request.user)

#     def destroy(self, request, *args, **kwargs):
#         response = {'message': 'DELETE method is not allowed'}
#         return Response(response, status=status.HTTP_400_BAD_REQUEST)

#     def partial_update(self, request, *args, **kwargs):
#         response = {'message': 'PATCH method is not allowed'}
#         return Response(response, status=status.HTTP_400_BAD_REQUEST)


# class CategoryViewSet(viewsets.ModelViewSet):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer

#     def destroy(self, request, *args, **kwargs):
#         response = {'message': 'DELETE method is not allowed'}
#         return Response(response, status=status.HTTP_400_BAD_REQUEST)

#     def update(self, request, *args, **kwargs):
#         response = {'message': 'PUT method is not allowed'}
#         return Response(response, status=status.HTTP_400_BAD_REQUEST)

#     def partial_update(self, request, *args, **kwargs):
#         response = {'message': 'PATCH method is not allowed'}
#         return Response(response, status=status.HTTP_400_BAD_REQUEST)


# class TaskViewSet(viewsets.ModelViewSet):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer
#     permission_classes = (permissions.IsAuthenticated,
#                           custompermissions.OwnerPermission,)

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)

#     def partial_update(self, request, *args, **kwargs):
#         response = {'message': 'PATCH method is not allowed'}
#         return Response(response, status=status.HTTP_400_BAD_REQUEST)
