# APIs 

## 1. Register & login & logout
### POST /register
parameter: the register info json
```json
{
    "username": "test",
    "password": "123456",
    "confirmPassword": "123456",
    "activationCode": "xxx"
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

to be added