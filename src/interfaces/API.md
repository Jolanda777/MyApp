API Documentation

Table of Contents

Authentication
Products
Basket
Wishlist
Reviews
Payments

Authentication
Register
Endpoint: POST /api/auth/register

Description: Register a new user.

Request Body:

{
"name": "string",
"email_address": "string",
"password": "string",
"confirmPassword": "string",
"telephone": "string"

}
Response:

{
"message": "User registered successfully"
}
Login
Endpoint: POST /api/auth/login

Description: Login a user.

Request Body:

{
"email_address": "string",
"password": "string"
}
Response:

{
"token": "string"
}
Logout
Endpoint: POST /api/auth/logout

Description: Logout a user.

Headers: - Authorization: Bearer <token>

Response:

{
"message": "Logout successful"
}
Create Admin
Endpoint: POST /api/auth/create-Admin

Description: Create a new admin user.

Headers: - Authorization: Bearer <token>

Request Body:

{
"email_address": "string",
"password": "string"
}
Response:

{
"message": "Admin registered successfully"
}
Verify Email
Endpoint: GET /api/auth/verify-email

Description: Verify a user's email address.

Query Parameters: - token: The verification token.

Response:

{
"message": "Email verified successfully"
}
Password Reset Link
Endpoint: POST /api/auth/password-resetLink

Description: Send a password reset link to the user's email.

Request Body:

{
"email_address": "string"
}
Response:

{
"message": "Password reset email sent"
}
Reset New Password
Endpoint: POST /api/auth/reset-new-password

Description: Reset the user's password using a token (Forgot Password).

Request Body:

{
"token": "string",
"password": "string",
"confirmPassword": "string"
}
Response:

{
"message": "Password reset successfully"
}
Reset Password for Logged-in User
Endpoint: POST /api/auth/reset-new-password-logged

Description: Reset the password for a logged-in user.

Headers: - Authorization: Bearer <token>

Request Body:

{
"currentPassword": "string",
"password": "string",
"confirmPassword": "string"
}
Response:

{
"message": "Password reset successfully"
}
Delete Account
Endpoint: DELETE /api/auth/delete-account

Description: Delete the logged-in user's account.

Headers: - Authorization: Bearer <token>

Response:

{
"message": "Account deleted successfully"
}
Products
Get All Products
Endpoint: GET /api/products

Description: Retrieve a list of all products with optional search, sorting, and category filtering.

Query Parameters: - search (optional): Filter products by name. - sortColumn (optional, default: item_name): Column to sort by. - sortOrder (optional, default: ASC): Order of sorting (ASC or DESC). - category (optional): Filter products by category.

Response:

[
{
"id": "number",
"name": "string",
"price": "number",
"description": "string",
"images": ["string"],
"categories": ["string"]
}
]
Get Product by ID
Endpoint: GET /api/products/:id

Description: Retrieve a product by its ID.

Response:

{
"id": "number",
"name": "string",
"price": "number",
"description": "string"
}
Create Product
Endpoint: POST /api/products

Description: Create a new product.

Headers: - Authorization: Bearer <token>

Request Body:

{
"categories": "string",
"item_name": "string",
"item_price": "number",
"item_description": "string",
"images": "string"
}
Response:

{
"message": "Product created successfully"
}
Update Product
Endpoint: PUT /api/products/:id

Description: Update an existing product.

Headers: - Authorization: Bearer <token>

Request Body:

{
"categories": "string",
"item_name": "string",
"item_price": "string",
"item_description": "string",
"images": "Double"
}
Response:

{
"message": "Product updated successfully"
}
Delete Product
Endpoint: DELETE /api/products/:id

Description: Delete a product.

Headers: - Authorization: Bearer <token>

Response:

{
"message": "Product deleted successfully"
}
Basket
Get Basket
Endpoint: GET /api/basket

Description: Retrieve the user's basket.

Headers: - Authorization: Bearer <token>

Response:

[
{
"item_id": "number",
"item_name": "string",
"item_price": "number",
"quantity": "number"
}
]
Add to Basket
Endpoint: POST /api/basket

Description: Add an item to the basket.

Headers: - Authorization: Bearer <token>

Request Body:

{
"item_id": "number",
"quantity": "number"
}
Response:

{
"message": "Item added to basket"
}
Update Basket
Endpoint: PUT /api/basket

Description: Update the quantity of an item in the basket.

Headers: - Authorization: Bearer <token>

Request Body:

{
"item_id": "number",
"quantity": "number"
}
Response:

{
"message": "Basket updated"
}
Remove from Basket
Endpoint: DELETE /api/basket/:item_id

Description: Remove an item from the basket.

Headers: - Authorization: Bearer <token>

Response:

{
"message": "Item removed from basket"
}
Wishlist
Get Wishlist
Endpoint: GET /api/wishlist

Description: Retrieve the user's wishlist.

Headers: - Authorization: Bearer <token>

Response:

[
{
"item_id": "number",
"item_name": "string",
"item_price": "number"
}
]
Add to Wishlist
Endpoint: POST /api/wishlist

Description: Add an item to the wishlist.

Headers: - Authorization: Bearer <token>

Request Body:

{
"item_id": "number"
}
Response:

{
"message": "Item added to wishlist"
}
Remove from Wishlist
Endpoint: DELETE /api/wishlist/:item_id

Description: Remove an item from the wishlist.

Headers: - Authorization: Bearer <token>

Response:

{
"message": "Item removed from wishlist"
}
Reviews
Get Reviews
Endpoint: GET /api/reviews/:item_id

Description: Retrieve reviews for a specific item.

Response:

[
{
"review_id": "number",
"user_id": "number",
"item_id": "number",
"stars": "number",
"comment": "string",
"created_at": "string"
}
]
Add Review
Endpoint: POST /api/review

Description: Add a review for an item.

Headers: - Authorization: Bearer <token>

Request Body:

{
"item_id": "number",
"stars": "number",
"comment": "string"
}
Response:

{
"message": "Review added"
}
Update Review
Endpoint: PUT /api/review/:review_id

Description: Update a review.

Headers: - Authorization: Bearer <token>

Request Body:

{
"stars": "number",
"comment": "string"
}
Response:

{
"message": "Review updated"
}
Delete Review
Endpoint: DELETE /api/review/:review_id

Description: Delete a review.

Headers: - Authorization: Bearer <token>

Response:

{
"message": "Review deleted"
}
Payments
Checkout
Endpoint: POST /api/payments/checkout

Description: Process a payment.

Headers: - Authorization: Bearer <token>

Request Body:

{
"cardNumber": "string",
"expiryDate": "string",
"cvv": "string",
"useSavedAddress" (optional): "boolean",
"newAddress" (optional): {
"street": "string",
"city": "string",
"zip_code": "string",
"country": "string"
}
}
Response:

{
"message": "Payment successful"
}
