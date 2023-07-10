from django.http.response import JsonResponse
from django.core.serializers import serialize
from onlyapp.models import *
import json
from django.db import connection
from rest_framework.decorators import api_view

@api_view(["POST"])
def register(request):
    username = request.data.get("username")
    user = User.objects.filter(username=username)
    if user:
        return JsonResponse({}, status=409)
    password = request.data.get("password")
    if len(password)<8:
        return JsonResponse({}, status=401)
    User.objects.create_user(username=username, password=password)
    return JsonResponse({}, status=200)

@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    users = User.objects.filter(username=username)
    if not users:
        return JsonResponse({}, status=404)
    if not users[0].check_password(request.data.get('password')):
        return JsonResponse({}, status=401)
    return JsonResponse({})

@api_view(["GET"])
def getChannelList(request):
    all_channels = Channel.objects.all()
    serialized = serialize('json', all_channels)
    return JsonResponse(sorted(json.loads(serialized), key=lambda c: c['pk']), safe=False)

@api_view(["POST"])
def createChannel(request):
    user = User.objects.get(username=request.data.get('username'))
    channelName = request.data.get('channel_name')
    channel = Channel.objects.filter(name=channelName)
    if channel:
        return JsonResponse({}, status=409)
    channel = Channel.objects.create(name=channelName, admin_user=user)
    ChannelUsers.objects.create(channel_name=channel, username=user)
    return JsonResponse({})

@api_view(["POST"])
def getMessages(request):
    channel = Channel.objects.get(name=request.data.get("channel_name"))
    messages = Message.objects.filter(channel_name=channel)
    serialized = serialize('json', messages)
    arr = json.loads(serialized)
    arr.sort(key=lambda m: m['fields']['created_time'])
    return JsonResponse(arr, safe=False)

@api_view(["POST"])
def sendMessage(request):
    user = User.objects.get(username=request.data.get('username'))
    channel = Channel.objects.get(name=request.data.get('channel_name'))
    obj = Message.objects.create(message=request.data.get("message"), channel_name=channel, username=user)
    return JsonResponse({"fields": {"username": request.data.get("username"), "message": obj.message, "created_time":
        obj.created_time}})

@api_view(['POST'])
def addUserChannel(request):
    channel = Channel.objects.get(name=request.data.get('channel_name'))
    user = User.objects.get(username=request.data.get('username'))
    ChannelUsers.objects.create(channel_name=channel, username=user)
    return JsonResponse({})

@api_view(['POST'])
def checkIfMember(request):
    channel=Channel.objects.filter(name=request.data.get('channel_name'))
    user=User.objects.filter(username=request.data.get('username'))
    if not channel or not user:
        return JsonResponse(False, safe=False)
    obj = ChannelUsers.objects.filter(channel_name=channel[0], username=user[0])
    return JsonResponse(True if obj else False, safe=False)

@api_view(["POST"])
def checkIfAdmin(request):
    channel=Channel.objects.get(name=request.data.get('channel_name'))
    adminUser = User.objects.get(username=request.data.get("username"))
    if channel.admin_user!=adminUser:
        return JsonResponse(False, safe=False)
    return JsonResponse(True, safe=False)

@api_view(["POST"])
def addRule(request):
    ChannelRules.objects.create(
        provider_name=ProvidersApplication.objects.get(name=request.data.get("provider_name")),
        channel_name=Channel.objects.get(name=request.data.get("channel_name")),
        gt_rule=request.data.get("gt_rule"),
        lt_rule=request.data.get("lt_rule")
    )
    return JsonResponse({}, status=200)

@api_view(["POST"])
def getChannelApps(request):
    with connection.cursor() as cursor:
        cursor.execute(f"""
        select * 
        from (
            (select * from channel_rules where channel_name_id="{request.data.get("channel_name")}") t left join providers
            on providers.name=t.provider_name_id
        )
        """)
        ans = cursor.fetchall()
    return JsonResponse(list(map(lambda arr: {
        "rule_name": arr[4],
        "app_name": arr[6],
        "gt_rule": arr[1],
        "lt_rule": arr[2]
    }, ans)), safe=False)