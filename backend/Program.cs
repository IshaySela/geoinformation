using GeoInformation.Service;
using Microsoft.EntityFrameworkCore;
using GeoInformation.Api;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using GeoInformation.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<PoiDbContext>(builder =>
    {
        builder.UseSqlite("Data Source=app.db");
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/pois/all", async (PoiDbContext dbContext) =>
{
    var pois = await dbContext.Pois.ToListAsync();
    var response = pois.Select(p => new PoiDto(p.Id, p.Category, p.Name, p.Description, p.Latitude, p.Longitude));

    return response;
});

app.MapPost("/pois/new", async (
    PoiDbContext dbContext,
    [FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Disallow)] CreateNewPoiRequest req) =>
{
    var created = new POI()
    {
        Id = Guid.NewGuid().ToString(),
        Category = req.Category,
        CreationTime = DateTime.UtcNow,
        Description = req.Description ?? string.Empty,
        Latitude = req.Latitude,
        Longitude = req.Longitude,
        Name = req.Name
    };

    await dbContext.Pois.AddAsync(created);
    await dbContext.SaveChangesAsync();
});

app.MapDelete("/pois/delete", async ([FromQuery(Name = "id")] string id, PoiDbContext dbContext) =>
{
    var toDelete = dbContext.Pois.Attach(POI.CreateStubWithId(id));
    toDelete.State = EntityState.Deleted;
    await dbContext.SaveChangesAsync();
});



app.UseHttpsRedirection();

app.Run();
