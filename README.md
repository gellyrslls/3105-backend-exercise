# Backend Design Exercise
Backend exercise using Node.js and Express.js for my application development class.

[Project Specifications](https://docs.google.com/document/d/14-kD0DeknFrAYVHfabAXzU1MoEpgBrWA_JPN4oLMULU/edit?usp=sharing)

## Setup
```bash
git clone git@github.com:gellyrslls/3105-backend-exercise.git
cd 3105-backend-exercise
npm install
node app.js
```

## Testing
Use the curl commands shown below to test the API endpoints:

## Register (POST)
> `http://localhost:3000/api/register`

```bash
curl -X POST http://localhost:3000/user/register \
-H "Content-Type: application/json" \
-d '{"username": "gelorosi", "password": "gelo12", "email": "gelorosi@gmail.com"}'
```

Expected response:

```json
{
  "message": "User registered successfully!"
}
```

## Login (POST)
> `Endpoint: http://localhost:3000/user/login`

After registering, you can log in:

```bash
curl -X POST http://localhost:3000/user/login \
-H "Content-Type: application/json" \
-d '{"username": "gelorosi", "password": "gelo12"}'
```

Expected response:

```json
{
  "message": "Login successful!",
  "token": "fake-token-2"
}
```

## Profile (GET)
> `http://localhost:3000/user/profile`

Use the token from the login response for authorization:

```bash
curl -X GET http://localhost:3000/user/profile \
-H "Authorization: fake-token-2"
```

Expected response:

```json
{
  "username": "gelorosi",
  "email": "gelorosi@gmail.com"
}
```

## Rate Limiting
To test rate limiting, make more than 5 requests within 30 seconds:

```bash
for i in {1..6}; do
    curl -X GET http://localhost:3000/user/profile \
    -H "Authorization: fake-token-2" &
done
```

Expected response after exceeding the limit:

```json
{
  "message": "Too many requests, please try again later."
}
```
