import pytest
from rest_framework.test import APIClient

client = APIClient()
url = "http://127.0.0.1:8000/sector/"

# CT001.001 Setor criado com sucesso 
@pytest.mark.django_db
def test_create_sectors_is_correct():
    sectors_data = dict(
        name="Sector A",
        code="S001",
        description="Sample description",
        active=True
    )
    response = client.post(url, sectors_data)
    data = response.data

    assert response.status_code == 201
    assert data["name"] == sectors_data["name"]
    assert data["code"] == sectors_data["code"]
    assert data["description"] == sectors_data["description"]
    assert data["active"] == sectors_data["active"]


# CT001.002 Setor criado com Dados Inválidos: campo code vazio
@pytest.mark.django_db
def test_create_sectors_is_incorrect():
    sectors_data = dict(
        name="Sector A",
        code="",
        description="Sample description",
        active=True
    ) 
    response = client.post(url, sectors_data)
    assert response.status_code == 400

 
# CT001.002 Setor criado com Dados Inválidos: campo code acima de 10 algoritmos
@pytest.mark.django_db
def test_create_invalid_code_above_10_number():
    sectors_data = dict(
        name="Sector A",
        code="12345678901",
        description="Sample description",
        active=True
    ) 
    response = client.post(url, sectors_data)
    assert response.status_code == 400

  
# CT001.002 Setor criado com Dados Inválidos: campo code alfanuméricos   
@pytest.mark.django_db
def test_create_invalid_code_alphanumeric():
    sectors_data = dict(
        name="Sector A",
        code="AB12",
        description="Sample description",
        active=True
    ) 
    response = client.post(url, sectors_data)
    assert response.status_code == 400
   
   
# CT001.002 Setor criado com Dados Inválidos: campo name acima de 40 letras   
@pytest.mark.django_db   
def test_create_invalid_name():
    sectors_data = dict(
        name="A" * 41,
        code="S001",
        description="Sample description",
        active=True
    ) 
    response = client.post(url, sectors_data)
    assert response.status_code == 400
    
    
# CT001.002 Setor criado com Dados Inválidos: campo description acima de 120 caracteres
@pytest.mark.django_db   
def test_create_invalid_description():
    sectors_data = dict(
        name="Sector A",
        code="S001",
        description="D" * 123,
        active=True
    ) 
    response = client.post(url, sectors_data)
    assert response.status_code == 400
    
   
# CT002.001 Excluir um setor existente
@pytest.mark.django_db
def test_delete_sectors_is_correct():
    sectors_data = dict(
        name="Sector A",
        code="S001",
        description="Sample description",
        active=True
    )
    response = client.post(url, sectors_data)
    data = response.data
    
    sector_id = data['id']
    delete_url = f"/sector/{sector_id}/" 

    response = client.delete(delete_url)
    assert response.status_code == 204 

    response = client.get(delete_url)
    assert response.status_code == 404  


# CT002.002 Exclusão de setor inexistente
@pytest.mark.django_db
def test_deletion_of_nonexistent_sectors():
    sectors_data = dict(
        name="Sector A",
        code="S001",
        description="Sample description",
        active=True
    )
    response = client.post(url, sectors_data)
    data = response.data

    sector_id = data['id']
    sector_id_inexistente = sector_id + 1
    delete_url = f"/sector/{sector_id_inexistente}/"

    response = client.delete(delete_url)
    assert response.status_code == 404 
    
    
# CT003.001 Atualizar um setor existente
@pytest.mark.django_db
def test_update_sectors_is_correct():
    sectors_data = dict(
        name="Sector A",
        code="S001",
        description="Sample description",
        active=True
    )
    response = client.post(url, sectors_data)
    data = response.data 

    sector_id = data['id']
    update_url = f"/sector/{sector_id}/"  

    updated_data = dict(
        name="Sector B",
        code="S010",
        description="Updated description",
        active=False
    )
    response = client.put(update_url, updated_data)
    assert response.status_code == 200 
    
    response = client.get(update_url)
    updated_sector_data = response.data

    assert updated_sector_data['name'] == updated_data['name']
    assert updated_sector_data['code'] == updated_data['code']
    assert updated_sector_data['description'] == updated_data['description']
    assert updated_sector_data['active'] == updated_data['active'] 
    
    
# CT003.002 Atualização de Dados Inválidos
@pytest.mark.django_db
def test_update_sectors_is_incorrect():
    sectors_data = dict(
        name="Sector A",
        code="S001",
        description="Sample description",
        active=True
    )
    response = client.post(url, sectors_data)
    assert response.status_code == 201
    
    sectors_data_update = dict(
        name="Sector B",
        code="S002",
        description="Sample description",
        active=True
    )
    response_update = client.post(url, sectors_data_update)
    data_update = response_update.data
    assert response_update.status_code == 201

    sector_id = data_update['id']
    update_url = f"/sector/{sector_id}/"  

    updated_data = dict(
        name="Sector A",  # Nome duplicado
        code="S003",
        description="Sample description",
        active=True
    )
    response_update = client.put(update_url, updated_data)
    assert response_update.status_code == 400
     
# CT002.001 - Ler setor
@pytest.mark.django_db
def test_read_record_sectors_is_correct():
    sectors_data = dict(
        name="Sector A",
        code="S001",
        description="Sample description",
        active=True
    )
    client.post(url, sectors_data)

    read_url = f"/sector/"
    response = client.get(read_url)

    assert response.status_code == 200
    data = response.json()
    assert len(data) is not None


# CT002.002 - Ler Setor Inexistente
@pytest.mark.django_db
def test_read_of_nonexistent_record_sectors():
    sectors_data = dict(
        name="Sector A",
        code="S001",
        description="Sample description",
        active=True
    )
    response = client.post(url, sectors_data)
    data = response.data

    sector_id = data['id']
    sector_id_inexistente = sector_id + 1
    read_url = f"/sector/{sector_id_inexistente}/"
    response = client.get(read_url)

    assert response.status_code == 404
    assert response.json() == {'detail': 'Not found.'}
  
    
# CT005.001 - Pesquisar campo existente   
@pytest.mark.django_db
def test_filter_is_correct():
    sectors_data = dict(
        name="Sector A",
        code="S001",
        description="Sample description",
        active=True
    )
    response = client.post(url, sectors_data)
    data = response.json() 
    
    filter_code = f"/sector/?name__icontains=&code=S001&active=&description__icontains="
    filter_name = f"/sector/?name__icontains=Sector&code=&active=&description__icontains="
    filter_description = f"/sector/?name__icontains=&code=&active=&description__icontains=sample"
    filter_active = f"/sector/?name__icontains=&code=&active=true&description__icontains="
    
    response_filter_code = client.get(filter_code)
    response_filter_name = client.get(filter_name)
    response_filter_description = client.get(filter_description)
    response_filter_active = client.get(filter_active)
    
    data_filter_code = response_filter_code.json()
    data_filter_name = response_filter_name.json()
    data_filter_description = response_filter_description.json()
    data_filter_active = response_filter_active.json()
    
    assert data in data_filter_code
    assert data in data_filter_name
    assert data in data_filter_description
    assert data in data_filter_active
 
# CT005.002 - Pesquisar campo inexistente 
@pytest.mark.django_db
def test_filter_sector_nonexistent():
    sectors_data = dict(
        name="Sector A",
        code="S001",
        description="Sample description",
        active=True
    )
    client.post(url, sectors_data)
  
    url_filter = f"/sector/?name__icontains=&code=S999&active=&description__icontains="
    response = client.get(url_filter)
    assert response.status_code == 200
