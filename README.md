# POI Mapping Project

A full-stack application to view Points of Interest (POI) in both **interactive map** and **tabular view**.

## Features

- Interactive map with POI markers
- Tabular view of POI data
- Responsive UI with Tailwind
- Backend provides CRUD operations for POIs
- Configurable backend URL via environment variables

## Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- Leaflet (interactive map)

**Backend:**
- .NET Core Web API (.NET 9)
- EF Core with SQLite database
- RESTful endpoints for CRUD points of interest

**Deployment:**
- Docker & Docker Compose
- Frontend served via Nginx
- Backend API exposed on port 5178
- Frontend accessible on `http://localhost` (port 80)

---

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/IshaySela/geoinformation
cd geoinformation
docker-compose up
Open browser on http://localhost
```
