# Patientor Backend

This is the backend for the Patientor application, a medical record system for doctors.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/patientor-backend.git
   ```

2. Navigate to the project directory:
   ```
   cd patientor-backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

1. For development:
   ```
   npm run dev
   ```
   The server will start on port 3001 with hot-reloading enabled.

2. For production:
   ```
   npm run tsc
   npm start
   ```

## Project Structure

```
patientor-backend/
├── build/                 # Compiled JavaScript files
├── data/                  # Mock data for patients and diagnoses
├── src/
│   ├── middlewares/       # Custom middleware functions
│   ├── routes/            # API route handlers
│   ├── services/          # Business logic and data access
│   └── utils/             # Utility functions and type guards
├── types.ts               # TypeScript type definitions
├── index.ts               # Main application entry point
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

### Folder Intentions:

- `build/`: Contains the compiled JavaScript files for production.
- `data/`: Stores mock data for patients and diagnoses.
- `src/`: Contains the main source code for the application.
  - `middlewares/`: Custom middleware functions, such as error handling.
  - `routes/`: API route handlers for different endpoints.
  - `services/`: Business logic and data access layer.
  - `utils/`: Utility functions, including type guards and data validation.
- `types.ts`: Centralized type definitions used throughout the application.
- `index.ts`: The main entry point for the application.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/ping | Health check |
| GET    | /api/diagnoses | Retrieve all diagnoses |
| GET    | /api/patients | Retrieve all patients (non-sensitive data) |
| POST   | /api/patients | Add a new patient |
| GET    | /api/patients/:id | Retrieve a specific patient by ID |
| POST   | /api/patients/:id/entries | Add a new entry to a patient's medical record |

### Example: Adding a New Patient

```
POST /api/patients
{
  "name": "John Doe",
  "dateOfBirth": "1990-07-31",
  "ssn": "250470-555L",
  "gender": "male",
  "occupation": "Software Developer"
}
```

### Example: Adding a New Entry (HealthCheck)

```
POST /api/patients/:id/entries
{
  "type": "HealthCheck",
  "description": "Annual check-up",
  "date": "2023-04-15",
  "specialist": "Dr. House",
  "healthCheckRating": 0
}
```

Note: The request body varies based on the entry type (HealthCheck, Hospital, or OccupationalHealthcare).

## Technologies Used

- TypeScript
- Express.js
- Zod (for data validation)
- UUID (for generating unique IDs)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.