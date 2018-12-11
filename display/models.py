from django.core.files.storage import FileSystemStorage
from django.db import models

from trafficlight import settings


class Dispaly(models.Model):
    name = models.CharField(max_length=10)
    state = models.CharField(max_length=15)
    time = models.CharField(max_length=10)
    image = models.FileField(
        storage=FileSystemStorage(location=settings.MEDIA_ROOT),
        upload_to='media',
        default='settings.MEDIA_ROOT/default.jpg'
    )

    class Meta:
        db_table = "Display"
