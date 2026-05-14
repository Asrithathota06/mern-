# Week 11

Express REST API for student CRUD operations with JWT authorization.

## Run

```powershell
npm install
npm start
```

## Login

`POST http://localhost:3001/login`

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Copy the token from the response and use it in Postman:

`Authorization: Bearer <token>`

## Protected Endpoints

- `GET http://localhost:3001/students`
- `GET http://localhost:3001/students/1`
- `POST http://localhost:3001/students`
- `PUT http://localhost:3001/students/1`
- `DELETE http://localhost:3001/students/1`

## Sample JSON Body

```json
{
  "name": "Kiran",
  "age": 22,
  "course": "IT"
}
```
