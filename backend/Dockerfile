# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY backend.csproj .
RUN dotnet restore backend.csproj

# Copy source files
COPY . .
RUN dotnet publish backend.csproj -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

# Copy published files from build stage
COPY --from=build /app/publish .

# Copy SQLite database into the image
COPY --from=build /src/app.db .

# Configure ASP.NET to listen on port 5178
ENV ASPNETCORE_URLS=http://0.0.0.0:5178
EXPOSE 5178

ENTRYPOINT ["dotnet", "backend.dll"]
