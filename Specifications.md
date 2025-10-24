
# Real-Time Multi-Room Chat Application (MERN + Socket.io)

## Description

A full-stack real-time chat platform built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.io for instant communication.

## Objectives

- Apply full MERN stack development in a real-world project.
- Integrate real-time communication using Socket.io.
- Implement authentication and role-based access (normal user vs. admin).
- Showcase advanced features: room search, join requests, admin approval, message editing/deleting.

---

## Functional Requirements

### Authentication & User Management

**User Registration:**

- Required fields:
  - Username (unique, 3-50 characters, trimmed)
  - Email (unique, validated with regex pattern, converted to lowercase)
  - Password (minimum 8 characters, hashed with bcrypt using salt rounds of 10)
- Email validation pattern enforced
- Duplicate email/username checking
- Returns user info (username, email, createdAt) on successful registration

**User Login:**

- Authentication via email and password
- JWT token generation with userId and username payload
- Token expiration controlled by JWT_LIFETIME environment variable
- Returns user info and token on successful login
- Password verification using bcrypt comparison

**User Profile Management:**

- Get user information (protected route)
- Update profile:
  - Username (minimum 3 characters, uniqueness check)
  - Email (validation + uniqueness check)
  - Automatic updatedAt timestamp
- Update password:
  - Requires current password verification
  - New password minimum 8 characters
  - Password re-hashed on update

**Authorization:**

- JWT-based authentication middleware
- Bearer token format in Authorization header
- Token verification on protected routes
- User context (userId, username) attached to requests

---

### Chat Room Management

**Room Creation:**

- Creator automatically becomes Admin
- Required fields:
  - Name (3-100 characters, trimmed, lowercase)
  - Description (trimmed, lowercase)
  - Category (3-100 characters, trimmed, lowercase)
- Creator automatically added to members array
- Empty requests array initialized
- Timestamps (createdAt) automatically generated

**Admin Powers:**

- Approve join requests (remove from requests, add to members)
- Reject join requests (remove from requests array)
- Remove members from room
- Delete entire room
- Update room information (name, description, category)
- Admin verification required for all admin actions

**Room Discovery:**

- Get all rooms
- Search room by exact name match
- Filter rooms by category
- All searches case-insensitive (lowercase conversion)

**Member Management:**

- Members stored as User ObjectId references
- Join requests stored separately from members
- Remove member functionality (admin only)
- Prevents duplicate memberships

---

### Room Search & Join Requests

**Search Functionality:**

- Search by room name (exact match, case-insensitive)
- Filter by category
- Returns room details including members and pending requests

**Join Request Flow:**

1. User sends join request via `/api/user/send-join-request`
2. Request added to room's requests array
3. Prevents duplicate requests
4. Checks if user is already a member
5. Admin receives notification (to be implemented with Socket.io)
6. Admin can approve or reject from `/api/room/approve-join-request` or `/api/room/reject-join-request`

**Leave Room:**

- Users can leave rooms they're members of
- Removes user from members array
- Validation checks for membership before removal

---

### Real-Time Chat

**Message System:**

- Messages stored in MongoDB with:
  - roomId (ObjectId reference)
  - senderId (ObjectId reference)
  - content (1-200 characters, trimmed)
  - isDeletedMessage (boolean flag)
  - isModifiedMessage (boolean flag)
  - Timestamps (createdAt, updatedAt)

**Message Operations:**

- Send message: Creates new message document
- Edit message:
  - Updates content
  - Sets isModifiedMessage flag to true
  - Updates updatedAt timestamp
  - Only message owner can edit
- Delete message:
  - Soft delete (content replaced with "This message has been deleted")
  - Sets isDeletedMessage flag to true
  - Owner or room admin can delete
  - Prevents duplicate deletions

**Real-Time Features (To Implement):**

- Socket.io integration for instant message delivery
- Room-based socket channels
- Join request notifications
- Member updates
- Real-time message updates

---

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - User login

### User Routes (`/api/user`) - Protected

- `GET /` - Get current user info
- `POST /` - Update user info (username, email)
- `POST /update-password` - Change password
- `POST /send-join-request` - Request to join a room
- `POST /leave-room` - Leave a room

### Room Routes (`/api/room`) - Protected

- `POST /` - Create new room
- `GET /` - Get all rooms
- `DELETE /:id` - Delete room (admin only)
- `POST /search` - Search room by name
- `GET /get-rooms-by-category` - Filter by category
- `POST /update-room-info` - Update room details (admin only)
- `POST /approve-join-request` - Approve join request (admin only)
- `POST /reject-join-request` - Reject join request (admin only)
- `POST /remove-member` - Remove member (admin only)

### Message Routes (`/api/message`) - Protected

- `POST /send` - Send message
- `PATCH /edit/:id` - Edit message
- `DELETE /delete/:id` - Delete message

---

## Database Models

### User Model

```javascript
{
  username: String (3-50 chars, required, trimmed),
  email: String (unique, required, validated, lowercase),
  passwordHash: String (required, min 8 chars, bcrypt hashed),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Room Model

```javascript
{
  name: String (3-100 chars, required, trimmed),
  adminId: ObjectId (User ref, required),
  category: String (3-100 chars, required, trimmed),
  members: [ObjectId] (User refs),
  requests: [ObjectId] (User refs),
  createdAt: Date (auto)
}
```

### Message Model

```javascript
{
  roomId: ObjectId (Room ref, required),
  senderId: ObjectId (User ref, required),
  content: String (1-200 chars, required, trimmed),
  isDeletedMessage: Boolean (default: false),
  isModifiedMessage: Boolean (default: false),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## Non-Functional Requirements

**Security:**

- Passwords hashed with bcrypt (10 salt rounds)
- JWT for stateless authentication
- Authorization middleware on protected routes
- Input validation and sanitization
- Email format validation with regex
- Password minimum length enforcement (8 characters)

**Performance:**

- Real-time communication via Socket.io (< 1 second delay)
- MongoDB indexing on unique fields (email)
- Efficient query patterns with ObjectId references

**Scalability:**

- Stateless JWT authentication
- MongoDB horizontal scaling capability
- Socket.io room-based channels for efficient broadcasting
- Supports multiple concurrent rooms and users

**Data Integrity:**

- Soft delete for messages (preserves history)
- Duplicate prevention (email, username, room membership)
- Referential integrity with ObjectId references
- Atomic operations for critical updates

**Usability:**

- RESTful API design
- Clear error messages with HTTP status codes
- Consistent response format
- Case-insensitive searches

---

## System Architecture

**Frontend:** React + Tailwind CSS + socket.io-client (To Implement)

**Backend:**

- Node.js + Express.js (v5.1.0)
- Socket.io (v4.8.1)
- Authentication: JWT (jsonwebtoken v9.0.2)
- Password Hashing: bcrypt (v6.0.0)
- HTTP Status Codes: http-status-codes (v2.3.0)
- CORS enabled

**Database:**

- MongoDB with Mongoose (v8.18.2)
- Collections: Users, Rooms, Messages
- Sample data provided in `/src/data/` directory

**Environment Variables:**

- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_LIFETIME` - Token expiration time

---

## Development Setup

**Prerequisites:**

- Node.js >= 18
- MongoDB running locally or cloud instance

**Installation:**

```bash
cd server
npm install
```

**Environment Configuration:**

Create `.env` file based on `.env.example`:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_jwt_secret_key
JWT_LIFETIME=30d
```

**Run Development Server:**

```bash
npm run dev  # with nodemon
npm start    # production mode
```

---

## Future Implementations

### Socket.io Integration (Priority)

- Real-time message broadcasting
- Room-based socket channels
- Join/leave room events
- Typing indicators
- Online user status
- Join request notifications

### Frontend Development

- React authentication flow
- Room dashboard and search UI
- Chat interface with real-time updates
- Admin panel for room management
- User profile management
- Message editing/deletion UI

### Additional Features

- File/image sharing
- Message reactions
- Read receipts
- User mentions
- Room categories management
- Private/direct messages
- Message search functionality
- Pagination for messages and rooms

---

## Development Timeline (Updated)

**Phase 1 - Backend Core (Days 1-3)** ✅ COMPLETED

- ✅ User authentication (register/login)
- ✅ JWT implementation
- ✅ User model and routes
- ✅ Password hashing

**Phase 2 - Room Management (Days 4-5)** ✅ COMPLETED

- ✅ Room creation and models
- ✅ Search and category filtering
- ✅ Admin controls (approve/reject/remove)
- ✅ Join request system

**Phase 3 - Message System (Days 6-7)** ✅ COMPLETED

- ✅ Message model and routes
- ✅ Send/edit/delete functionality
- ✅ Message flags (deleted/modified)

**Phase 4 - Socket.io (Days 8-9)** 🔄 PENDING

- Real-time message broadcasting
- Room channels
- Event handlers
- Notifications

**Phase 5 - Frontend (Days 10-15)** 🔄 PENDING

- Authentication pages
- Room dashboard
- Chat interface
- Admin controls
- Socket integration

---

## Sample Data

Sample data provided in `/src/data/`:

- **15 users** - All with password: "Password123!"
- **15 rooms** - Various categories with members and requests
- **15 messages** - Distributed across different rooms

Use this data for development and testing by importing into MongoDB.

---

## Error Handling

**Standard Error Responses:**

- `400 Bad Request` - Validation errors, missing fields
- `401 Unauthorized` - Invalid credentials, missing/invalid token
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Database/server errors

**Consistent Format:**

```json
{
  "msg": "Error message description"
}
```

**Success Responses:**

- `200 OK` - Successful GET/UPDATE
- `201 Created` - Successful POST (resource created)
- Include relevant data in response body

---

## Notes for Developers

1. All text fields are trimmed and converted to lowercase for consistency
2. Use ObjectId references for relationships between collections
3. Implement proper error handling in try-catch blocks
4. Validate user permissions before admin actions
5. Always check for duplicates before creating resources
6. Use bcrypt pre-save middleware for password updates
7. Implement socket.io for real-time features (next priority)
8. Consider implementing rate limiting for API endpoints
9. Add request logging for debugging
10. Implement comprehensive API documentation (Swagger/Postman)
