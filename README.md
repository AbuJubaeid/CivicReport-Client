# CivicReport

CivicReport is a citizen-centric platform designed to report, track, and resolve civic issues efficiently. It empowers citizens, staff, and administrators to ensure transparency, accountability, and faster resolution of community problems.

---

## Key Points

1. Multiple users
2. Stripe Payment system
3. React Hook Form
4. React Query

## Login Information

admin==>
email:jubaeid3@gmail.com
password: Jubaeid@123
staff==>
email: siam@gmail.com/ tawfiq@gmail.com
password: Siam@123/ Tawfiq@123
user==>
email: habib@gmail.com
password: Habib@123

## Table of Contents

1. [Home Page](#home-page)
2. [All Issues Page](#all-issues-page)
3. [Issue Details Page](#issue-details-page-private-route)
4. [Role Management](#role-management)
5. [Citizen Dashboard](#citizen-dashboard-private)
6. [Staff Dashboard](#staff-dashboard-private)
7. [Admin Dashboard](#admin-dashboard-private)
8. [Login & Registration](#login--registration)
9. [Challenge Tasks](#challenge-tasks-must-do-all)

---

## Home Page

### Navbar

- Logo + Website Name (`CivicReport`)
- Menu: Home, All Issues, 2 Extra Pages
- User profile picture displayed when logged in
  - Dropdown on profile click: User Name, Dashboard, Logout

### Banner Section

- Large, visually attractive banner/slider
- Unique design for engagement

### Latest Resolved Issue Section

- Display at least 6 issues
- Sorted by issue status
- Each issue card shows associated data with **View Details** button
- Clicking **View Details** navigates to the issue details page

### Features Section

- Showcase main features of the application

### How It Works Section

- Step-by-step explanation of workflow

### Extra Sections

- 2 additional sections highlighting app capabilities

### Footer

- Complete footer with navigation and contact information

### 404 Not Found Page

- Custom error page for incorrect URLs
- Button to navigate back to Home

---

## All Issues Page (`/all-issues`)

- Display all issues in a card layout
- Each card includes:
  - Image, Title, Category, Status Badge, Priority Badge (High/Normal), Location
  - Upvote button/icon with total upvote number
  - **View Details** button

### Filtering & Search

- Filter by category, status, priority
- Search bar for issue name, category, location

### Upvote Rules

- Only logged-in users can upvote
- Each user can upvote an issue once
- Users cannot upvote their own issues
- Boosted issues always appear above normal issues
- Upvote instantly updates UI and database
- Redirect to login if a non-logged-in user tries to upvote

---

## Issue Details Page (Private Route)

- Accessible only by logged-in users
- Display complete information about the issue

### Buttons & Actions

- **Edit**: Available if logged-in user submitted the issue & status = pending
- **Delete**: Available for the issue owner
- **Boost Issue**: Priority boost after payment (100 TK per issue)
- Staff information displayed if assigned

### Issue Tracking & Timeline

- Shows complete lifecycle of the issue
- Timeline entries are read-only to preserve audit history
- Each entry includes:
  - Status (Pending/In-Progress/Resolved/Closed)
  - Message or note
  - Updated by (Admin/Staff/Citizen)
  - Date & time
- Example timeline:
  - Issue reported by citizen
  - Assigned to staff: John Doe
  - Work started
  - Marked as resolved
  - Closed by staff

### Timeline Data Flow

- Every key action generates a timeline entry:
  - Issue creation
  - Staff assignment
  - Status change
  - Boost payment
  - Admin rejection
  - Issue closure

---

## Role Management (3 Roles)

### Admin

- View all issues
- Assign staff to issues
- Reject issues
- Manage staff & citizens
- View payments

### Citizen

- Submit issues
- Edit/delete own issues if pending
- Boost priority
- Access premium subscription
- Track activities

### Staff

- View assigned issues
- Update issue status
- Add progress updates
- Mark as resolved
- Edit profile

---

## Citizen Dashboard (Private)

### Dashboard Overview

- Total issues submitted
- Total pending, in-progress, resolved issues
- Total payments
- Display stats using cards & charts

### My Issues Page

- List all issues submitted by the user
- Filter by status, category
- Actions:
  - Edit (opens pre-filled modal, updates DB & UI instantly)
  - Delete (removes issue from DB & UI)
  - View Details

### Report Issue Page

- Form: Title, Description, Category, Upload Image, Location
- Saves issue to DB & adds tracking record
- Free users: Max 3 issues
- Premium users: Unlimited issues

### Profile Page

- Update user information
- Subscribe option (1000 TK) for premium
- Premium badge displayed for subscribed users
- Warning for blocked users

---

## Staff Dashboard (Private)

### Dashboard Overview

- Assigned issues count
- Resolved issues count
- Today’s tasks
- Statistics with charts

### Assigned Issues Page

- Tabular display of assigned issues
- Boosted issues appear above normal issues
- Actions: Change status (In-Progress, Working, Resolved, Closed)
- Updates DB & timeline instantly
- Profile page: Update image and name

---

## Admin Dashboard (Private)

### Dashboard Overview

- Total issues, resolved, pending, rejected
- Total payments received
- Display latest issues, payments, and users

### All Issues

- Tabular display of all issues
- Assign staff (if not assigned) via modal dropdown
- Reject issue button (if status = pending)

### Manage Users

- View citizens, subscription info
- Block/Unblock users with confirmation

### Manage Staff

- Add staff via modal (name, email, phone, photo, password)
- Update staff information
- Delete staff with confirmation

### Payments Page

- Tabular payment data
- Optional chart visualization

### Admin Profile

- View & update own information

---

## Login & Registration

- Nice error messages
- Login: Email/Password + Google Sign-in
- Registration: Name, Email, Password, Photo
- Store user information in DB
- No email verification required

---

## Important work

- Token Verification & Role-Based Middleware
- Pagination on All-Issues page
- Server-side search & filter (by name, category, status, priority, location)
- Loader when fetching data
- Downloadable invoice PDF in admin payments page & user profile page

---

**CivicReport** is built with **React, Tailwind CSS, DaisyUI, Node.js, Express, MongoDB, and Firebase Authentication**.  
It ensures a secure, responsive, and intuitive experience for all users including citizens, staff, and administrators.
