from django.test import TestCase, Client

# Create your tests here.
class TestAuth(TestCase):
    def setUp(self):
        self.client = Client()

    def test_register(self):
        response = self.client.post("/auth/register", {'username': 'bhavyarajdev', 'password': 'bhavya123'})
        self.assertEqual(response.status_code, 200)

    def test_login(self):
        response = self.client.post("/auth/login", {"username": "preet_sheth", 'password': "preet12345"})
        self.assertEqual(response.status_code, 200)

    def test_get_channels(self):
        response = self.client.get("/messaging/get_channels")

    def test_get_ifadmin(self):
        response = self.client.post("/messaging/check_if_admin", {
  "channel_name": "second channel",
  "username": "asdgarg"
})