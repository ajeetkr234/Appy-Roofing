# APEX ROOFING CO. — Premium Roofing Contractor Platform

An agency-grade, production-ready web application built for an established American roofing contractor, combining **cinematic 3D architectural experiences**, **AI-powered diagnostic tools**, **lead generation & scheduling systems**, **customer project tracking**, and **contractor CRM pipelines**.

---

## 🌟 Key Features & Architectural Highlights

### 1. Full-Screen 3D Cinematic Hero (100vh)
- **Dual Visual Engines**: Smooth toggle between 4K drone video background and real-time interactive Three.js 3D House Orbit with golden-hour and sun-angle lighting.
- **Conversion Badges**: "TRUSTED ROOFING PROFESSIONALS", dual CTAs ("Get Free Estimate" & "Call Now: (800) 555-APEX"), and licensed/insured verification trust indicators.

### 2. Interactive 3D House Customizer
- **360° Free Orbit & Smooth Zoom**: Built with React Three Fiber, Three.js, and Drei.
- **Material Shaders**: Switch dynamically between Architectural Asphalt Shingles, 24-Gauge Standing Seam Metal, Spanish Clay Barrel Tile, and Natural Slate.
- **Color Palette Selection**: 8 real architectural finishes (Charcoal, Burnished Copper, Weathered Wood, Pacific Blue, Terracotta, etc.).
- **Structure Wireframe Mode**: Allows homeowners to inspect the structural framing and roof deck profile.

### 3. Exploded 3D Roof Anatomy (7 Protective Layers)
- Real-time 3D exploded view with animated layer separation slider (0% to 100%) and cinematic auto-assembly.
- Detailed component breakdowns for:
  1. *Roof Decking (Sheathing)*
  2. *Synthetic Felt Underlayment*
  3. *Ice & Water Protection Barrier*
  4. *Metal Drip Edge & Flashing*
  5. *Roofing Shingles / Metal Panels*
  6. *High-Profile Ridge Caps*
  7. *Ridge Ventilation Exhaust*

### 4. Interactive Before & After Slider
- Draggable split-view slider comparing storm-damaged / curled shingle roofs with completed Apex installations.
- Multiple project case studies (Hail restoration, Modern Standing Seam Metal, Spanish Tile restoration).

### 5. AI-Powered Roofing Diagnostic Suite
- **AI Roof Visualizer**: Upload house photos or test preset architectures; preview photorealistic material replacements with split-slider concept comparisons.
- **AI Damage Assessment Scanner**: Computer vision diagnostic simulation highlighting defect bounding boxes (granule depletion, lifted shingles, damaged flashing), confidence ratings, and health grades.
- **Interactive Roof Cost Estimator**: Calculate transparent pricing ranges based on square footage, pitch, stories, existing tear-off, and ZIP code.
- **7-Point Roof Health Diagnostic Quiz**: Interactive questionnaire delivering instant health grades (Good / Needs Attention / Urgent).
- **Floating AI Roofing Chatbot**: Conversational assistant answering FAQ questions, estimating square footage costs, and capturing leads.

### 6. Lead Generation, Scheduling & CRM Pipeline
- **Smart ZIP Code Checker**: Verifies service coverage corridors across US regions and Texas metro hubs.
- **Free Inspection Booking System**: Interactive date & time slot picker with anti-double-booking protection.
- **Customer Project Portal**: Secure project milestone tracking (1-6 timeline), daily drone photos, and warranty downloads (`APX-7821`, `APX-6502`).
- **Contractor Admin CRM Dashboard**: Real-time pipeline metrics, lead status management (New, Contacted, Qualified, Inspection Scheduled, Estimate Sent, Approved, Completed, Lost), search/filtering, and CSV/JSON export.

---

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Framer Motion
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Backend**: Node.js, Express, REST API
- **Persistence**: File-backed JSON database store (`server/data/db.json`)
- **SEO**: Semantic HTML5, Schema.org `RoofingContractor` structured data, Open Graph meta tags, `sitemap.xml`, `robots.txt`

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation
```bash
# Clone the repository and enter directory
cd d:/Texas-Roofing

# Dependencies are already installed! If needed:
npm install
```

### Running the Application

#### Option A: Fullstack Development (Backend API + Vite Frontend)
```bash
npm run start
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

#### Option B: Standalone Production Server
```bash
# Build the production bundle
npm run build

# Start the Node.js production server (serves frontend + API)
npm run server
```
Visit `http://localhost:5000` in your browser.

---

## 📡 REST API Reference

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/health` | `GET` | Health check and system uptime |
| `/api/stats` | `GET` | CRM pipeline statistics and business metrics |
| `/api/leads` | `GET, POST` | List leads with filter/sort; create new estimate inquiry |
| `/api/leads/:id` | `PATCH` | Update lead status, assign technician, add internal notes |
| `/api/bookings` | `GET, POST` | Retrieve scheduled inspections; book appointment slot |
| `/api/zip-check` | `GET` | Check ZIP code serviceability and response times |
| `/api/estimate` | `POST` | Calculate indicative itemized roof replacement costs |
| `/api/damage-assess` | `POST` | AI computer vision defect scan & bounding box generation |
| `/api/visualize` | `POST` | AI architectural roof recoloring simulation |
| `/api/ai-chat` | `POST` | Conversational roofing assistant inquiry & triage |
| `/api/portal/project/:id` | `GET` | Customer project status and document lookup |
| `/api/reviews` | `GET, POST` | Retrieve verified Google reviews and post new review |
| `/api/maintenance-subscribe` | `POST` | Customer preventative care & storm alerts enrollment |

---

## 📜 Compliance & Transparency Notice

All metrics, reviews, rankings, credentials, and achievements displayed in this application represent demonstration preview content for digital contractor showcasing until replaced with verified business records.
