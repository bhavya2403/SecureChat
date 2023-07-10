from django.urls import path
from onlyapp.views import *

urlpatterns = [
    path("register", register),
    path("login", login),
    path("get_channels", getChannelList),
    path("create_channel", createChannel),
    path("get_messages", getMessages),
    path("send_message", sendMessage),
    path("add_user_channel", addUserChannel),
    path("check_if_member", checkIfMember),
    path("check_if_admin", checkIfAdmin),
    path("add_rule", addRule),
    path("get_channel_apps", getChannelApps)
]