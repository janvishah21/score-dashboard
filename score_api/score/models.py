from django.db import models

# Create your models here.
class Score(models.Model):
    roll_no = models.CharField(max_length=8, primary_key=True)
    name = models.CharField(max_length=20)
    maths_score = models.IntegerField()
    physics_score = models.IntegerField()
    chemistry_score = models.IntegerField()

    def __str__(self):
        return self.name