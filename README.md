# Full-Stack Personal Portfolio Website

A premium, modern, and fully responsive personal portfolio website built using the MERN stack (MongoDB, Express, React, Node.js). It features curated HSL gradients, sleek light/dark mode toggles, floating layout animations, administrative dashboard panel for project CRUD operations, and fully validated visitor contact forms.

---

## Folder Structure

The project separates concerns between the React client app and the Express backend server:

```
├── client/                     # React.js Frontend (Vite)
│   ├── public/                 # Static public files (favicon, CV resume)
│   ├── src/
│   │   ├── components/         # Page sections & standalone components
│   │   │   ├── About.jsx       # Professional details page
│   │   │   ├── Admin.jsx       # Project manager panel & authentication
│   │   │   ├── Contact.jsx     # Validated form submission component
│   │   │   ├── Footer.jsx      # Bottom footer and social links
│   │   │   ├── Home.jsx        # Landing hero page with CV download
│   │   │   ├── Navbar.jsx      # Sticky responsive navigation headers
│   │   │   ├── Projects.jsx    # Fetch project cards with skeleton loaders
│   │   │   └── Skills.jsx      # capability bar grid display
│   │   ├── App.css             # Empty (centralized styles in index.css)
│   │   ├── App.jsx             # Main visual layout and theme managers
│   │   ├── index.css           # Global design tokens, classes & variables
│   │   └── main.jsx            # React bootstrap entry point
│   ├── index.html              # Main HTML scaffold (optimized for SEO)
│   ├── package.json            # Client dependencies (React 19, Lucide, Vite)
│   └── vite.config.js          # Vite configuration with API Proxy setup
│
└── server/                     # Node.js & Express.js Backend
    ├── controllers/            # Controller layers (API route endpoints)
    │   ├── contactController.js
    │   └── projectController.js
    ├── middleware/             # Express middlewares
    │   ├── authMiddleware.js   # Admin headers check
    │   └── errorMiddleware.js  # Global API error formatting
    ├── models/                 # Database schema definitions
    │   ├── contact.js          # Schema for contact form logs
    │   └── project.js          # Schema for database project details
    ├── routes/                 # API routing mounts
    │   ├── contactRoutes.js
    │   └── projectRoutes.js
    ├── .env                    # Configured environment variables (ignored in Git)
    ├── .env.example            # Environment variables template
    ├── package.json            # Server dependencies (Express, Mongoose)
    └── server.js               # Backend bootstrap and entry point
```

---

## API Routes & Endpoints

| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/projects` | Public | Retrieve all projects sorted by featured first |
| **POST** | `/api/projects` | Admin | Create a new project card |
| **PUT** | `/api/projects/:id` | Admin | Edit details of a specific project card |
| **DELETE** | `/api/projects/:id` | Admin | Delete a project card from the database |
| **POST** | `/api/contact` | Public | Submit visitor contact inquiries |
| **GET** | `/health` | Public | Check backend health status |

*Note: Administrative endpoints require carrying the pre-shared admin PIN inside the header request under `X-Admin-Password` key.*

---

## Getting Started (Local Development Setup)

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v18 or higher recommended).
- [MongoDB](https://www.mongodb.com/) installed locally, or a MongoDB Atlas cloud database instance.

### Step 1: Configure & Start Backend Server
1. Navigate to the backend directory:
   ```bash
   cd server
   ```
2. Make a copy of `.env.example` and name it `.env`:
   ```bash
   cp .env.example .env
   ```
3. Edit the variables inside `.env` to match your local setup:
   - `PORT`: Server listening port (default: `5000`).
   - `MONGO_URI`: The connection string for MongoDB (default: `mongodb://localhost:27017/portfolio` if running locally).
   - `ADMIN_PASSWORD`: Access PIN utilized to modify project documents in the Admin Dashboard (default: `admin123`).
4. Install backend dependencies and boot up development daemon (`nodemon`):
   ```bash
   npm install
   npm run dev
   ```

### Step 2: Configure & Start Frontend Client
1. In a new terminal window, navigate to the frontend directory:
   ```bash
   cd client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Run the Vite local development server:
   ```bash
   npm run dev
   ```
4. Access the web application in your browser at: `http://localhost:3000`
   *(Vite routes API requests dynamically to port 5000 using the internal proxy rule configured in `vite.config.js`)*.

---

## Administrator Dashboard Panel Instructions
1. Scroll down or click the "Admin" link in the navigation header bar to find the **Admin Panel** section.
2. Log in using the password configured in the server's `.env` file (e.g. `admin123`).
3. Once logged in, you can add, modify, or delete project cards. Any changes made will update the MongoDB database and immediately refresh on the active frontend Projects feed.
4. Replace the placeholder resume file located at `client/public/resume.pdf` with your actual resume PDF to finalize the download CV button.

---

## Deployment Guide

### Database (MongoDB Atlas)
1. Register/Login on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free-tier Shared Cluster.
3. Add a database user under **Database Access** (remember password).
4. Allow connections from anywhere (`0.0.0.0/0`) under **Network Access** (or configure appropriate IP addresses).
5. Go to Database Clusters -> Connect -> Connect your Application. Copy the generated Connection String URL and replace `<username>` and `<password>` placeholders. This is your deployment `MONGO_URI` value.

### Backend Server (Render Deployment)
1. Register/Login on [Render](https://render.com/).
2. Create a new **Web Service** and link it to your GitHub Repository.
3. Set the following settings:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Expand Advanced Settings -> Add Environment Variables:
   - `MONGO_URI` = *(Your MongoDB Atlas connection string)*
   - `ADMIN_PASSWORD` = *(Your chosen secure administrative password)*
   - `PORT` = `10000` (Render binds automatically, or custom ports)
5. Deploy. Render will generate a public HTTPS URL (e.g., `https://your-portfolio-backend.onrender.com`).

### Frontend Client (Vercel Deployment)
1. Register/Login on [Vercel](https://vercel.com/).
2. Create a new Project and link it to your GitHub Repository.
3. Configure the following settings:
   - **Root Directory**: `client`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set up client-side URL routing rules for clean deployment. Create a `vercel.json` file inside `client/` containing rules mapping `/api` requests to the Render backend, or update the client request actions to target the absolute Render URL.
   *(See instructions below to configure vercel.json redirect routing).*
5. Deploy. Vercel will provide your live portfolio website URL (e.g. `https://your-portfolio.vercel.app`).

---

### Redirecting Vercel API requests to Render Backend
To route frontend relative requests dynamically without CORS conflicts on Vercel, create a `vercel.json` file in `client/` folder:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-portfolio-backend.onrender.com/api/:path*"
    },
    {
      "source": "/resume.pdf",
      "destination": "/resume.pdf"
    },
    {
      "source": "/((?!api|resume.pdf).*)",
      "destination": "/index.html"
    }
  ]
}
```
*(Replace `https://your-portfolio-backend.onrender.com` with your active Render web service URL).*
