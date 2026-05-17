# GetParcel

GetParcel is a simple web-based parcel tracking and management system developed to replace manual Excel-based parcel handling workflows.

The system allows customers to search parcels using tracking numbers, while admins can manage parcel records through an admin dashboard.

---

# Problem Statement

The previous workflow relied heavily on manual Excel data entry:

* Admin manually keyed parcel information into Excel
* Customers provided their names during parcel collection
* Admin searched for names manually using Excel Find feature
* Searching became time-consuming when names were duplicated or mistyped

This caused:

* Slow parcel retrieval
* Human errors
* Difficult parcel tracking
* Inefficient management workflow

---

# Solution

GetParcel simplifies the process by:

* Allowing customers to search parcels using tracking numbers
* Returning a unique Parcel ID
* Allowing admins to retrieve parcel details instantly using Parcel ID
* Providing a centralized admin dashboard for parcel management

---

# Features

## Customer Side

* Search parcel using tracking number
* Display parcel ID
* Display parcel status

## Admin Side

* Admin login authentication
* View all parcels
* Add new parcels
* Edit parcel information
* Delete parcel records
* Mark parcel as collected
* Mark parcel as stored
* Search parcels
* Filter parcels by status
* Pagination system

---

# Tech Stack

## Frontend

* React
* Tailwind CSS
* Vite

## Backend

* Laravel
* REST API

## Database

* MySQL
* phpMyAdmin

---

# System Workflow

## Customer Workflow

1. Customer enters tracking number
2. System searches database
3. Parcel ID is displayed
4. Customer provides Parcel ID to admin
5. Admin retrieves parcel quickly

## Admin Workflow

1. Admin logs into dashboard
2. Admin adds parcel details
3. Parcel is stored with Parcel ID
4. Admin updates parcel status when collected
5. Admin can edit or delete parcel information if needed

---

# Installation Guide

## Clone Repository

```bash
git clone https://github.com/aerynisx/getparcel.git
```

---

# Backend Setup (Laravel)

## Navigate to backend folder

```bash
cd backend
```

## Install dependencies

```bash
composer install
```

## Configure environment

Copy `.env.example` to `.env`

```bash
cp .env.example .env
```

## Generate application key

```bash
php artisan key:generate
```

## Configure database

Update `.env`:

```env
DB_DATABASE=getparcel
DB_USERNAME=root
DB_PASSWORD=
```

## Run migrations

```bash
php artisan migrate
```

## Start Laravel server

```bash
php artisan serve
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

# Frontend Setup (React)

## Navigate to frontend folder

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

Frontend runs on:

```text
http://127.0.0.1:5173
```

---

# API Endpoints

| Method | Endpoint                 | Description                      |
| ------ | ------------------------ | -------------------------------- |
| GET    | /api/parcels             | Retrieve all parcels             |
| GET    | /api/parcel/{tracking}   | Search parcel by tracking number |
| POST   | /api/parcel              | Add new parcel                   |
| PUT    | /api/parcel/{id}         | Update parcel                    |
| DELETE | /api/parcel/{id}         | Delete parcel                    |
| PATCH  | /api/parcel/{id}/collect | Mark as collected                |
| PATCH  | /api/parcel/{id}/restore | Mark as stored                   |
| POST   | /api/login               | Admin login                      |

---

# Future Improvements

Potential future enhancements:

* Route protection using authentication tokens
* Parcel analytics dashboard
* Export reports to PDF/Excel
* Mobile responsive optimization

---

# License

This project is developed for educational and portfolio purposes.
