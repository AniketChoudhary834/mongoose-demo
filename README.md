# Mongoose Demo

Small MERN app for teaching Mongoose basics: schemas, models, references, `populate()`, and virtual populate.

## Structure

- `server/models/Student.js` — has a `department` field referencing `Department`
- `server/models/Department.js` — has a `students` virtual (virtual populate)
- `server/routes/students.js` — `.populate("department")` example
- `server/routes/departments.js` — `.populate("students")` example (virtual)

## Setup

```bash
cd server
npm install
cp .env.example .env   # add your MONGO_URI
npm run seed            # optional sample data
npm run dev
```

```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173`.
