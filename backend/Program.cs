using GeoInformation.Service;
using Microsoft.EntityFrameworkCore;
using GeoInformation.Dto;

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

app.MapGet("/pois", async (PoiDbContext dbContext) =>
{
    var pois = await dbContext.Pois.ToListAsync();
    var response = pois.Select(p => new PoiDto(p.Id, p.Category, p.Name, p.Description, p.Latitude, p.Longitude));

    return response;
});

app.UseHttpsRedirection();

app.Run();
