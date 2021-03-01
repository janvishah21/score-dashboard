from django.shortcuts import render
from .serializers import ScoreSerializer
from rest_framework import generics
from .models import Score

# Create your views here.
class ScoreList(generics.ListCreateAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer

class ScoreDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer