# Simple CRUD API

Simple server app that uses naive express-like own written library **[kexpress](packages/kexpress/README.md)**.

It uses in-memory database underneath fo working with **Person** model.

## Usage

Firstly run:
```
npm install
```

Run server:
```
npm run start:dev
```

You can configure application port, using `.env` file

## Person Model
- `id` — unique identifier (`string`, `uuid`) generated on server side
- `name` — person's name (`string`, **required**)
- `age` — person's age (`number`, **required**)
- `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)

## Person CRUD API
- **GET** `/person` returns all persons
- **GET** `/person/{personId}` returns person with corresponding `personId`
- **POST** `/person` is used to create record about new person and store it in database
- **PUT** `/person/{personId}` is used to update record about existing person
- **DELETE** `/person/{personId}` is used to delete record about existing person from database
