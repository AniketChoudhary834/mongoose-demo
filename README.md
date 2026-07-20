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

## Talking points for class

1. Show `Student.js` — `department` is an `ObjectId` with `ref: "Department"`. This is how you link two collections.
2. Hit `GET /api/students` without `.populate()` first — department shows as just an ID.
3. Add `.populate("department")` back — now it's the full department object. This is a live demo of what `populate()` does.
4. Show `Department.js` — the `students` field doesn't exist in the database at all. It's a virtual, computed by matching `Student.department` back to `Department._id`.
5. Visit a department's detail page in the UI — students appear via virtual populate, with zero duplication of data.
