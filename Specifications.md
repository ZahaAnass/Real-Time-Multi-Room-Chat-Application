# Real-Time Multi-Room Chat Application (MERN + Socket.io)

## Description

A full-stack real-time chat platform built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.io for instant communication.

## Objectives

- Apply full MERN stack development in a real-world project.
- Integrate real-time communication using Socket.io.
- Implement authentication and role-based access (normal user vs. admin).
- Showcase advanced features: room search, join requests, admin approval, message editing/deleting.

## Functional Requirements

### Authentication & User Management

- User registration with:
  - Username (unique)
  - Email (unique, validated)
  - Password (hashed with bcrypt)
- Login using JWT (JSON Web Tokens).
- User profile stored in MongoDB.
- Users can update their profile (username, email, password).

### Chat Room Management

- Any user can create a room.
- The creator becomes the Admin.
- Admin powers:
  - Accept / Reject join requests.
  - Remove members from the room.
  - Delete the room entirely.

### Room Search & Join Requests

- Users can search rooms by name.
- Users send join requests.
- Admin receives notifications and approves/denies requests.
- Approved users are added to the room members list and can chat.

### Real-Time Chat

- Messages are exchanged instantly using Socket.io.
- Chat history stored in MongoDB.
- Each message includes:
  - Sender ID
  - Room ID
  - Content
  - Timestamp
- Users can edit and delete their own messages.
- Admin can also delete messages inside their room if necessary.

## Non-Functional Requirements

- Performance: Real-time under 1 second delay.
- Security:
  - Passwords hashed with bcrypt.
  - JWT for authentication.
  - Only authorized users can access rooms.
- Scalability: Support multiple rooms and concurrent users.
- Usability: Clean UI with React + Tailwind.

## System Architecture

- Frontend: React + Tailwind CSS + socket.io-client.
- Backend: Node.js + Express.js + Socket.io.
- Database: MongoDB with Mongoose (Users, Rooms, Messages, Requests).

## Pages (Frontend)

- Register Page (signup with username, email, password)
- Login Page
- Dashboard → search rooms, create rooms
- Room Page → chat window, members list, message input
- Admin Panel (inside room) → manage requests, kick members, delete messages

## Development Plan (10–12 Days)

- Day 1–2: Backend setup, user authentication (JWT).
- Day 3: Room model + routes (create, search, join request).
- Day 4–5: Chat functionality with Socket.io (multi-room).
- Day 6: Frontend auth pages (Register/Login).
- Day 7: Room management UI (create/search/join).
- Day 8: Chat room UI + socket integration.
- Day 9: Admin controls (approve requests, kick members, delete messages).
- Day 10: Message edit/delete functionality.
- Day 11: UI refinements, security hardening.
- Day 12: Testing, bug fixes, deployment.
