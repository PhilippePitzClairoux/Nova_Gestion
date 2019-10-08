## User

GET localhost:8080/v1/user
```javascript
[
  {
    "idUser": 1,
    "email": "admin@gmail.com",
    "password": "test#123",
    "typeUser": {
      "idTypeUser": 1,
      "name": "Admin"
    },
    "employee": {
      "idEmployee": 1,
      "name": "Jean-Pierre",
      "surname": "Vilanova"
    }
  },
 ...
]
```
GET localhost:8080/v1/user/{idUser}
```javascript
{
  "idUser": 1,
  "email": "admin@gmail.com",
  "password": "test#123",
  "typeUser": {
    "idTypeUser": 1,
    "name": "Admin"
  },
  "employee": {
    "idEmployee": 1,
    "name": "Jean-Pierre",
    "surname": "Vilanova"
  }
}
```
POST localhost:8080/v1/user
body: 
```javascript
{
  "idUserType" : 1,
  "idEmployee" : 1,
  "email" : "test123@gmail.com",
  "password" : "hehexd123"
}
```
answer : 
```javascript
{
  "id": 5
}
```
PUT localhost:8080/v1/user
body:
```javascript
{
  "idUserType" : 1,
  "idEmployee" : 1,
  "email" : "test123@gmail.com",
  "password" : "hehexd123"
}
```
DELETE localhost:8080/v1/user
body:
```javascript
{
  "idUser": 5
}
```