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

<<<<<<< HEAD
## Step 5: Stop a Running Process on a Port (If Needed)
If the application does not start due to a port conflict, you can stop the process occupying the port:

Windows (Command Prompt / PowerShell)
```shellscript
netstat -ano | findstr :3000
```

```shellscript
taskkill /PID <PID> /F
```

Linux / macOS (Terminal)

```shellscript
sudo lsof -i :3000
```

sudo kill -9 <PID>

sudo lsof -t -i :3000 | xargs sudo kill -9
=======
>>>>>>> master

## Step 6: Run the Application

Start the application in development mode:

```shellscript
npm run start:dev
```

<<<<<<< HEAD
The application should now be running at `http://localhost:3000`.


netstat -ano | findstr :<PORT>
=======
The application should now be running at `http://localhost:3000`.
>>>>>>> master
