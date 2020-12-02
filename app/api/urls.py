from django.urls import path, include
from rest_framework import routers
from .views import CreateUserView, ListUserView, LoginUserView, ProfileViewSet, UserViewSet,CompanyViewSet, CompanyReservationViewSet, ExaminationTypeViewSet,CourseViewSet, DocktorViewSet, InspectionViewSet, ProgressViewSet
# from .views import TaskViewSet, CategoryViewSet, CreateUserView, ListUserView, LoginUserView, ProfileViewSet

router = routers.DefaultRouter()
# router.register('users', UserViewSet)
router.register('profile', ProfileViewSet)
router.register('users', UserViewSet)
router.register('companies', CompanyViewSet)
router.register('company_reservations', CompanyReservationViewSet)
router.register('docktors', DocktorViewSet)
router.register('examination_types', ExaminationTypeViewSet)
router.register('courses', CourseViewSet)
router.register('inspections', InspectionViewSet)
router.register('progresses', ProgressViewSet)
# router.register('reservation_sys_data', ReservationSysDataViewSet)


# router.register('category', CategoryViewSet)
# router.register('tasks', TaskViewSet)
# router.register('profile', ProfileViewSet)

urlpatterns = [
    path('create/', CreateUserView.as_view(), name='create'),
    path('users/', ListUserView.as_view(), name='users'),
    path('loginuser/', LoginUserView.as_view(), name='loginuser'),
    path('', include(router.urls)),
]
