# POI GeoInformation

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
- Configuration via environment variables

---

## Getting Started

1. Clone the repository:

```sh
git clone https://github.com/IshaySela/geoinformation
cd geoinformation
docker-compose up
Open browser on http://localhost
```

## Future Improvments

### Frontend
- Better overall UI design (typography, spacing, color etc., better user experience)
- Dark / Light mode - dark map, popups etc.
- Error handling - covering more edge cases, adding retry policy for API calls
- Caching with localStorage
- Testing

### Backend
- Testing
- Getting POIs relative to other point - get all POIs at radius from specific lat, long. This can be used as optimization,
  loading points at a radius from the current viewpoint.
- Security - authentication, POI encryption

### Deployment
- Apply migrations on backend container up (currently copying the app.db sqlite database with the existing tables)
- 



## Deployment Configuration
### Backend Service
- `POIS_FRONTEND_URL` - points to the origin of the front end. This is used by the backend to configure the CORS policy
- `ConnectionStrings__DefaultConnection` - Connection string that is used by the backend (this is the path inside the container)

  ### Frontend Service
- `VITE_API_URL` - URL of the backend, used by the frontend to make API calls
