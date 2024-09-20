
# Yelp Camp

Yelp Camp is a full-stack web application designed for users to explore, create, and manage campground posts. It includes features like user authentication, authorization, and campground management with interactive maps and photo uploads. Built using modern web technologies, the application also emphasizes security, responsiveness, and ease of use.

## Features

### Authentication
- **User Login:** Users can log in using a username and password or sign in via Google.
- **Admin Sign-Up:** Admins can register using a special admin code.

### Authorization
- **Access Control:** 
  - Users cannot manage posts or view user profiles without being authenticated.
  - Users cannot edit or delete posts/comments created by others.
  - Admins have full control to manage all posts and comments.

### Campground Management
- **CRUD Functionality:** 
  - Create, edit, and delete campground posts and comments.
- **Photo Upload:** Upload campground photos using Cloudinary.
- **Google Maps Integration:** Display campground locations on an interactive map.
- **Search Functionality:** Easily search through existing campgrounds.

### User Account Management
- **Profile Setup:** Users can create and manage their profile.
- **Flash Messages:** Feedback provided via flash messages in response to user actions (e.g., successful sign-in, post creation).

### Responsive Design
- The app is fully responsive, ensuring an optimal user experience on all devices.

### Custom Enhancements
- **Edit Photos:** Update campground photos when editing.
- **Profile Updates:** Users can update personal information on their profile page.
- **Optimized Image Loading:** Improved load time for images on the landing page using Cloudinary.
- **Security:** Helmet is used to strengthen app security by setting various HTTP headers.

## Getting Started

> Note: This project contains hidden API secrets and passwords, so it won’t run with all features on your local machine. However, feel free to clone the repository for development purposes.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/SaFFireGHOST/YelpCamp.git
   ```
2. **Install Dependencies:**
   Using npm:
   ```bash
   npm install
   ```
   Or using yarn:
   ```bash
   yarn install
   ```

## Built With

### Front-end
- **EJS**
- **Bootstrap**
- **MapTiler API**

### Back-end
- **Express**
- **MongoDB**
- **Mongoose**
- **Async**
- **Helmet**
- **Passport & Passport-Local**
- **Express-Session**
- **Method-Override**
- **Cloudinary**
- **Geocoder**
- **Connect-Flash**

## Platforms
- **Cloudinary:** Used for image storage and optimization.

