from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Channel(models.Model):
    class Meta:
        db_table = 'channel'
    name = models.CharField(max_length=30, primary_key=True)
    admin_user = models.ForeignKey(User, on_delete=models.CASCADE)

class Message(models.Model):
    class Meta:
        db_table = 'message'
    message = models.CharField(max_length=200)
    channel_name = models.ForeignKey(Channel, on_delete=models.CASCADE)
    username = models.ForeignKey(User, on_delete=models.CASCADE, to_field='username', default='None')
    created_time = models.DateTimeField(auto_now=True)

class ChannelUsers(models.Model):
    class Meta:
        db_table = 'channel_users'
    channel_name = models.ForeignKey(Channel, on_delete=models.CASCADE)
    username = models.ForeignKey(User, on_delete=models.CASCADE)

class ProvidersApplication(models.Model):
    class Meta:
        db_table = 'providers'
    name = models.CharField(max_length=20, primary_key=True)
    app_name = models.CharField(max_length=50)

class ChannelRules(models.Model):
    class Meta:
        db_table = 'channel_rules'
    provider_name = models.ForeignKey(ProvidersApplication, on_delete=models.CASCADE)
    channel_name=models.ForeignKey(Channel, on_delete=models.CASCADE)
    gt_rule = models.IntegerField()
    lt_rule = models.IntegerField()
