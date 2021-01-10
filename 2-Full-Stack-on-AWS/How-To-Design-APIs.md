## How To Design APIs
### Best Practices
- Only use nouns no verbs. They should be plural and consistent.
- APIs should be versioned:
	- `{{host}}/api/v0/cars/5`
- List should be paginated to limit the amount of data sent.
	-  `{{host}}/api/v0/cars/?offset=40&limit=10`
- All responses should attempt to use **status codes**.
- All responses should include **data format**.
	- i.e. `application/json`
-  Error payloads should include messages