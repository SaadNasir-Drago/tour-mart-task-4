## Prerequisites
- Node.js (v16 or later)
- npm or yarn
- PostgreSQL database


## Step 1: Clone the Repository

First, clone the repository to your local machine:

```shellscript
# Create a new NestJS project
git clone <URL>

# Navigate to the project directory
cd tour-mart-task-4
```

## Step 2: Install Dependencies

Install all the required dependencies:

```shellscript
npm install
```

## Step 3: Set Up the Database

Create a PostgreSQL database for the application:

Install PostgreSQL if you haven't already

Create a new database named 'postgres'

Make sure the database credentials in your .env file match your PostgreSQL setup

## Step 4: Configure Environment Variables

Create a `.env` file in the root directory of your project:

```shellscript
# .env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=postgres
JWT_SECRET=your_jwt_secret_key
```

Replace `your_password` with your PostgreSQL password and `your_jwt_secret_key` with a secure random string.


## Step 6: Run the Application

Start the application in development mode:

```shellscript
npm run start:dev
```

The application should now be running at `http://localhost:3000`.