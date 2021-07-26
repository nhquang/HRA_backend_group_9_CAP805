# APIs 

## 1. Register, login & logout, account
### POST /register
parameters: the register info json
```json
{
    "username": "test",
    "password": "123456",
    "confirmPassword": "123456",
    "activationCode": "xxx"
}
```
### POST /authentication/login
parameters: the login info json
```json
{
    "username": "test",
    "password": "123456"
}
```
return status success (200)
```json
{
    "message": "Succeeded!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ocXVhbmciLCJyb2xlIjoiaHJfc3RhZmYiLCJpYXQiOjE2MjcyNjc2MzEsImV4cCI6MTYyNzI3MTIzMX0.FAjzfkRIeF-I6q-_u_0mSUiKuCBTMYEjUeqhaTIYMqQ"
}
```
### POST /account/update_account
parameters: the update account info json
```json
{
    "username": "johndoe",
    "password": "123456",
    "confirmPassword": "123456"
}
```
headers: the update account info json
```json
{
    "Authorization": "Bearer 'token'"
}
```
return status success (200), if successful
```json
{
    "Authorization": "Bearer 'token'"
}
```
### GET /account/
headers: 
```json
{
    "message": "update account success"
}
```

return: status success (200) if successful
```json
{
    "username": "testing"
}
```

## 2. Branch

to be added

## 3. Department

### GET /departments?branchId=xxx
return: department list for the branch
```json
[
  {
    "_id": "60ce5175e9d63211349116f2",
    "branchId": "60ce287cad08cf5b0d94732a",
    "description": "Human Resources",
    "name": "Human Resources",
    "active": true
  }
]
```

### GET /departments/:id
return a department 
```json
{
    "_id": "60ce5175e9d63211349116f2",
    "branchId": "60ce287cad08cf5b0d94732a",
    "description": "Human Resources",
    "name": "Human Resources",
    "active": true
}
```

### POST /departments
description: add department

parameter: the department info json
```json
{
    "branchId": "60ce287cad08cf5b0d94732a",
    "description": "xxx",
    "name": "xxx",
    "active": true
}
```
return: the added department

### PUT /departments/:id
description: update a department

parameter: the department info json
```json
{
    "branchId": "60ce287cad08cf5b0d94732a",
    "description": "Human Resources",
    "name": "Human Resources",
    "active": true
}
```

### DELETE /departments/:id
description: delete a department

## 4. Employee(TODO)

### GET /employees/
description: return a list of employees
```json
[
    {
        "payInfo": {
            "frequency": "Monthly",
            "bankAccountNumber": "5292274159623161",
            "firstPayDate": "2017/10/08",
            "salary": 7000,
            "grossAmount": 5600
        },
        "_id": "60ce5175e9d63211349116f9",
        "deparmentId": "60ce5175e9d63211349116f8",
        "fname": "Oswell",
        "lname": "Scrowby",
        "gender": "Male",
        "role": "employee",
        "username": "oscrowby5",
        "password": "qPYKqNhY9",
        "hireDate": "2017/09/08",
        "email": "oscrowby5@cam.ac.uk",
        "streetAddress": "92 Carberry Park",
        "city": "Smiths Falls",
        "province": "Ontario",
        "country": "Canada",
        "phone": "706-483-2408",
        "stillEmployed": false
    }
]
```
headers: 
```json
{
    "Authorization": "Bearer 'token'"
}
```

### GET /employees/:id
description: return an employee
```json
{
    "payInfo": {
        "frequency": "Biweekly",
        "bankAccountNumber": "123156623156",
        "firstPayDate": "2021/09/20",
        "salary": 100000,
        "grossAmount": 3000
    },
    "_id": "60fe147886a09823c4113294",
    "fname": "testing",
    "lname": "testing",
    "gender": "male",
    "role": "hr_staff",
    "hireDate": "2021/09/07",
    "email": "testing@myseneca.ca",
    "streetAddress": "1 Eglinton Ave East",
    "city": "Toronto",
    "province": "Ontario",
    "country": "Canada",
    "phone": "123-225-15321",
    "stillEmployed": true,
    "deparmentId": "60ce5175e9d63211349116f2",
    "username": "testing",
    "password": "testing2123"
}
```
headers: 
```json
{
    "Authorization": "Bearer 'token'"
}
```
### POST /employees/add_employee
parameters:
```json
{
    "payInfo": {
        "frequency": "Biweekly",
        "bankAccountNumber": "123156623156",
        "firstPayDate": "2021/09/20",
        "salary": 100000,
        "grossAmount": 3000
    },
    "_id": "60fe147886a09823c4113294",
    "fname": "testing",
    "lname": "testing",
    "gender": "male",
    "role": "hr_staff",
    "hireDate": "2021/09/07",
    "email": "nhquang@myseneca.ca",
    "streetAddress": "1 Eglinton Ave East",
    "city": "Toronto",
    "province": "Ontario",
    "country": "Canada",
    "phone": "123-225-15321",
    "stillEmployed": true,
    "deparmentId": "60ce5175e9d63211349116f2"
}
```
headers: 
```json
{
    "Authorization": "Bearer 'token'"
}
```
return: status success (200) and the new employee object, if added successfully

### PUT /employees/update_employee
parameters:
```json
{
    "payInfo": {
        "frequency": "Biweekly",
        "bankAccountNumber": "123156623156",
        "firstPayDate": "2021/09/20",
        "salary": 100000,
        "grossAmount": 3000
    },
    "_id": "60fe147886a09823c4113294",
    "fname": "testing",
    "lname": "testing",
    "gender": "male",
    "role": "hr_staff",
    "hireDate": "2021/09/07",
    "email": "nhquang@myseneca.ca",
    "streetAddress": "1 Eglinton Ave East",
    "city": "Toronto",
    "province": "Ontario",
    "country": "Canada",
    "phone": "123-225-15321",
    "stillEmployed": true,
    "deparmentId": "60ce5175e9d63211349116f2",
    "username": "testing",
    "password": "testing2123"
}
```
headers: 
```json
{
    "Authorization": "Bearer 'token'"
}
```
return: status success (200) and the newly updated employee object, if updated successfully
### DELETE /employees/delete_employee/:id

headers: 
```json
{
    "Authorization": "Bearer 'token'"
}
```
return: status success (200), if deleted successfully