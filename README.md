### Application Routes

### Auth (User)

    - https://cow-hut-backend-seven.vercel.app/api/v1/auth/signup (POST)
    - https://cow-hut-backend-seven.vercel.app/api/v1/auth/login (POST)
    - https://cow-hut-backend-seven.vercel.app/api/v1/auth/refresh-token (POST)

### Auth (Admin)

    - https://cow-hut-backend-seven.vercel.app/api/v1/admins/create-admin (POST)
    - https://cow-hut-backend-seven.vercel.app/api/v1/admins/login (POST)

#### orders

    - https://cow-hut-backend-seven.vercel.app/api/v1/orders (POST)
    - https://cow-hut-backend-seven.vercel.app/api/v1/orders (GET)

## Bonus Part

### My Profile

    - https://cow-hut-backend-seven.vercel.app/api/v1/users/my-profile (GET)
    - https://cow-hut-backend-seven.vercel.app/api/v1/users/my-profile (PATCH)

### Order

    - https://cow-hut-backend-seven.vercel.app/api/v1/orders/652004f77bf96deaf20b8181 (GET)
    -

### User

    - https://cow-hut-backend-seven.vercel.app/api/v1/auth/signup (POST) - create a user
    - https://cow-hut-backend-seven.vercel.app/api/v1/users (GET)- get all  users
    - https://cow-hut-backend-seven.vercel.app/api/v1/users/651fd527a49c107255628d82 (GET) - get a user
    - https://cow-hut-backend-seven.vercel.app/api/v1/users/651fd527a49c107255628d82 (PATCH) - update a user
    - https://cow-hut-backend-seven.vercel.app/api/v1/users/651fd527a49c107255628d82 (DELETE) - delete a user

### Cow

    - https://cow-hut-backend-seven.vercel.app/api/v1/cows (POST) - create a cow
    - https://cow-hut-backend-seven.vercel.app/api/v1/cows (GET)- get all  cow
    - https://cow-hut-backend-seven.vercel.app/api/v1/cows/651f239395fc212d527c6eb2 (GET) - get a cow
    - https://cow-hut-backend-seven.vercel.app/api/v1/cows/651f239395fc212d527c6eb2 (PATCH) - update a cow
    - https://cow-hut-backend-seven.vercel.app/api/v1/cows/651f239395fc212d527c6eb2 (DELETE) - delete a cow

### Pagination and Filtering routes of Cows

    - https://cow-hut-backend-seven.vercel.app/api/v1/cows?page=1&limit=5
    - https://cow-hut-backend-seven.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc
    - https://cow-hut-backend-seven.vercel.app/api/v1/cows?location=Chattogram
    - https://cow-hut-backend-seven.vercel.app/api/v1/cows?searchTerm=Dha

#### orders

    - https://cow-hut-backend-seven.vercel.app/api/v1/orders (POST)
    - https://cow-hut-backend-seven.vercel.app/api/v1/orders (GET)
