from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from score import views

urlpatterns = [
    path('scores/', views.ScoreList.as_view()),
    path('scores/<int:pk>/', views.ScoreDetail.as_view())
]