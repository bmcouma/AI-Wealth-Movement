from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class ContactMessageAPITest(APITestCase):
    def setUp(self):
        self.url = reverse('contact-submit')
        self.valid_payload = {
            "name": "Alice",
            "email": "alice@example.com",
            "subject": "Test Subject",
            "message": "Hello world"
        }

    def test_valid_submission(self):
        response = self.client.post(self.url, data=self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data)
        self.assertEqual(response.data['name'], self.valid_payload['name'])
        self.assertEqual(response.data['email'], self.valid_payload['email'])
        self.assertEqual(response.data['subject'], self.valid_payload['subject'])
        self.assertEqual(response.data['message'], self.valid_payload['message'])

    def test_missing_fields(self):
        payload = {"name": "Bob", "email": "bob@example.com"}
        response = self.client.post(self.url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('subject', response.data)
        self.assertIn('message', response.data)

    def test_invalid_email(self):
        payload = self.valid_payload.copy()
        payload['email'] = 'not-an-email'
        response = self.client.post(self.url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

    def test_empty_fields(self):
        payload = {"name": "", "email": "", "subject": "", "message": ""}
        response = self.client.post(self.url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        for field in ['name', 'email', 'subject', 'message']:
            self.assertIn(field, response.data)

    def test_unsupported_method(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
