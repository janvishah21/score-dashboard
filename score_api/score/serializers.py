from rest_framework import serializers
from .models import Score

class ScoreSerializer(serializers.ModelSerializer):
  class Meta:
    model = Score
    fields = ('roll_no', 'name', 'maths_score', 'physics_score', 'chemistry_score')