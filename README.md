### Application Routes

#### User

    - https://cow-hut-backend-seven.vercel.app/api/v1/auth/signup (POST) - create a user
    - https://cow-hut-backend-seven.vercel.app/api/v1/users (GET)- get all  users
    - https://cow-hut-backend-seven.vercel.app/api/v1/users/649112652f0fd917236b1d75 (GET) - get a user
    - https://cow-hut-backend-seven.vercel.app/api/v1/users/649112652f0fd917236b1d75 (PATCH) - update a user
    - https://cow-hut-backend-seven.vercel.app/api/v1/users/649112652f0fd917236b1d75 (DELETE) - delete a user

#### Cow

    - https://cow-hut-backend-seven.vercel.app/api/v1/cows (POST) - create a cow
    - https://cow-hut-backend-seven.vercel.app/api/v1/cows (GET)- get all  cow
    - https://cow-hut-backend-seven.vercel.app/api/v1/cows/649116ce83ff3339b2c6b8c4 (GET) - get a cow
    - https://cow-hut-backend-seven.vercel.app/api/v1/cows/649116ce83ff3339b2c6b8c4 (PATCH) - update a cow
    - https://cow-hut-backend-seven.vercel.app/api/v1/cows/649116ce83ff3339b2c6b8c4 (DELETE) - delete a cow

### Pagination and Filtering routes of Cows

    - https://cow-hut-backend-seven.vercel.app/api/v1/cows?page=1&limit=5
    - https://cow-hut-backend-seven.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc
    - https://cow-hut-backend-seven.vercel.app/api/v1/cows?location=Chattogram
    - https://cow-hut-backend-seven.vercel.app/api/v1/cows?searchTerm=Dha

#### orders

    - https://cow-hut-backend-seven.vercel.app/api/v1/orders (POST)
    - https://cow-hut-backend-seven.vercel.app/api/v1/orders (GET)
