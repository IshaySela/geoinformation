# 🗺️ POI GeoInformation

A full-stack application to view Points of Interest (POI) in both **interactive map** and **tabular view**.

## ✨ Features

- 🗺️ Interactive map with POI markers
- 📊 Tabular view of POI data
- 📱 Responsive UI with Tailwind and React
- 🔧 Backend provides CRUD operations for POIs
- ⚠️ Standardized machine readable error responses via the [Problem Details RFC](https://www.rfc-editor.org/rfc/rfc9457.html)
- 🐳 Deployment using Docker Compose

## 🛠️ Tech Stack

**Frontend:**
- ⚛️ React + Vite
- 🎨 Tailwind CSS
- 🗺️ Leaflet (interactive map)

**Backend:**
- .NET Core Web API (.NET 9)
- 🗄️ EF Core with SQLite database
- 🔄 RESTful endpoints for creating, deleting, updating and reading POIs

**Deployment:**
- 🐳 Docker & Docker Compose
- 🌐 Frontend served via Nginx
- 🔌 Backend API exposed on port 5178
- 🖥️ Frontend accessible on [http://localhost](http://localhost) (port 80)
- ⚙️ Configuration via environment variables

---

## 🚀 Quick Start Guide

1. Requirements - [docker](https://docs.docker.com/engine/install/)

2. Clone the repository:

```sh
git clone https://github.com/IshaySela/geoinformation
```

3. Enter the directory & Run:

```sh
cd geoinformation
docker compose up
```

4. Wait for the project to build and open browser on [http://localhost](http://localhost)


## 🎯 Future Improvments

### 🎨 Frontend
- 🖌️ Better overall UI design (typography, spacing, color etc., better user experience)
- 🌙 Dark / Light mode - dark map, popups etc.
- ⚠️ Error handling - covering more edge cases, adding retry policy for API calls
- 💾 Caching with localStorage
- 🧪 Unit tests for components (React Testing Library), integration tests for API calls, end-to-end tests for user flows

### Backend
- 📍 Getting POIs relative to other point - get all POIs at radius from specific lat, long. This can be used as optimization,
  loading points at a radius from the current viewpoint.
- 🔒 Security - authentication, POI encryption
- ⏱️ Rate limiting
- 🗂️ API versioning
- 🧪 Unit tests for POIs endpoint, integration tests with EF Core and in-memory DB, API contract tests, performance/load testing.
- 📈 Increasing observability via logging, either to local or remote system (e.g. elasticsearch + logstash + kibana)

 
### 🐳 Deployment
- ⚡ Apply migrations on backend container up (currently copying the app.db SQLite database with the existing tables)
 Apply migrations on backend container up (currently copying the app.db sqlite database with the existing tables)
- 🔐 deploy with HTTPS with custom certificate
- ♻️ Auto restart containers on fail

## ⚠️ Known Issues
- 📍 POI marker accuracy drops as the map zoom increases
- 📝 Create new POI form is slightly off center relative to the cursor marker

## ⚙️ Deployment Configuration  - Environment Variables
### 🔧 Backend Service
- `POIS_FRONTEND_URL` - points to the origin of the front end. This is used by the backend to configure the CORS policy
- `ConnectionStrings__DefaultConnection` - Connection string that is used by the backend (path inside the container)

  ### 🌐 Frontend Service
- `VITE_API_URL` - URL of the backend, used by the frontend to make API calls
