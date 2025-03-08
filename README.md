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

## Step 7: Test the Application

You can use tools like Postman, Insomnia, or curl to test the API endpoints. Here's a basic flow to test the functionality:

### 1. Register Users

```shellscript
# Register first user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "user1", "email": "user1@example.com", "password": "password123"}'

# Register second user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "user2", "email": "user2@example.com", "password": "password123"}'
```

### 2. Login and Get JWT Token

```shellscript
# Login as user1
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user1@example.com", "password": "password123"}'
```

Save the `access_token` from the response.

### 3. Follow a User

```shellscript
# User1 follows User2 (replace USER2_ID with the actual ID)
curl -X POST http://localhost:3000/users/follow/USER2_ID \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. Create a Post

```shellscript
# Login as user2
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user2@example.com", "password": "password123"}'

# User2 creates a post
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer USER2_ACCESS_TOKEN" \
  -d '{"title": "My First Post", "content": "This is the content of my first post!"}'
```

### 5. Check Notifications

```shellscript
# Login as user1 again
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user1@example.com", "password": "password123"}'

# Get user1's notifications
curl -X GET http://localhost:3000/notifications \
  -H "Authorization: Bearer USER1_ACCESS_TOKEN"
```

## Testing WebSocket Notifications

To test real-time notifications, you can use a WebSocket client like `wscat` or create a simple HTML page with Socket.IO client:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Notification Test</title>
    <script src="https://cdn.socket.io/4.4.1/socket.io.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const token = prompt('Enter your JWT token:');
            
            const socket = io('http://localhost:3000', {
                extraHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            socket.on('connect', () => {
                console.log('Connected to WebSocket server');
                document.getElementById('status').textContent = 'Connected';
            });
            
            socket.on('notification', (notification) => {
                console.log('Received notification:', notification);
                const notificationsList = document.getElementById('notifications');
                const li = document.createElement('li');
                li.textContent = notification.message;
                notificationsList.appendChild(li);
            });
            
            socket.on('disconnect', () => {
                console.log('Disconnected from WebSocket server');
                document.getElementById('status').textContent = 'Disconnected';
            });
        });
    </script>
</head>
<body>
    <h1>Notification Test</h1>
    <p>Status: <span id="status">Disconnected</span></p>
    <h2>Notifications:</h2>
    <ul id="notifications"></ul>
</body>
</html>
```

Save this as `notification-test.html` and open it in your browser. Enter your JWT token when prompted, and you should start receiving real-time notifications when users you follow create new posts.