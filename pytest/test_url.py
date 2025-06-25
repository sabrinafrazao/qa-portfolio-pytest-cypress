import pytest
from rest_framework.test import APIClient
from rest_framework import status


client = APIClient()

# Verificando se a url está funcionando
@pytest.mark.django_db
def test_url_api_is_correct():
   url = "http://127.0.0.1:8000/sector/"


   response = client.get(url)
   assert response.status_code == status.HTTP_200_OK

