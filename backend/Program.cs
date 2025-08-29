using GeoInformation.Service;
using Microsoft.EntityFrameworkCore;
using GeoInformation.Api;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using GeoInformation.Models;
using Microsoft.AspNetCore.Diagnostics;
using System.Text.Json;
using System.Net;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<PoiDbContext>(builder =>
    {
        builder.UseSqlite("Data Source=app.db");
    });

builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var feature = context.Features.Get<IExceptionHandlerFeature>();
        if (feature == null)
            return;

        var exception = feature.Error;
        IResult result;

        switch (exception)
        {
            case BadHttpRequestException:
                result = Results.Problem(
                    title: "Error while parsing json body",
                    statusCode: StatusCodes.Status400BadRequest
                    );
                break;
            default:
                result = Results.Problem(
                    title: "Internal server error");
                break;
        }

        await result.ExecuteAsync(context);
        return;
    });
});

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
    var toDelete = dbContext.Pois.Attach(new POI() { Id = id });
    toDelete.State = EntityState.Deleted;
    await dbContext.SaveChangesAsync();
});


app.MapPut("/pois/update", async (
    [FromQuery(Name = "id")] string id,
    [FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Disallow)]
    UpdatePoiRequest req, PoiDbContext dbContext) =>
{
    var updated = new POI()
    {
        Name = req.Name,
        Id = id,
        Category = req.Category,
        Description = req.Description,
        Latitude = req.Latitude,
        Longitude = req.Longitude
    };

    dbContext.Update(updated);
    await dbContext.SaveChangesAsync();
});



app.UseHttpsRedirection();

app.Run();
