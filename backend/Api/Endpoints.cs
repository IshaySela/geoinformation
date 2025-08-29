using GeoInformation.Models;
using GeoInformation.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace GeoInformation.Api;


public static class PoisEndpoints
{
    public static RouteGroupBuilder MapPoisEndpoints(this RouteGroupBuilder builder)
    {
        builder.MapGet("/all", PoisEndpoints.GetAllPois);
        builder.MapPost("/new", PoisEndpoints.CreateNewPoi);
        builder.MapDelete("/delete", PoisEndpoints.DeletePoi);
        builder.MapPut("/update", PoisEndpoints.UpdatePoi);
        return builder;
    }

    internal static async Task<IResult> GetAllPois(PoiDbContext dbContext)
    {
        var pois = await dbContext.Pois.ToListAsync();
        var response = pois.Select(p => new PoiDto(p.Id, p.Category, p.Name, p.Description, p.Latitude, p.Longitude));

        return TypedResults.Ok(response);
    }

    internal static async Task<IResult> CreateNewPoi(PoiDbContext dbContext,
        [FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Disallow)] CreateNewPoiRequest req)
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
        return Results.Ok();
    }

    internal static async Task<IResult> DeletePoi([FromQuery(Name = "id")] string id, PoiDbContext dbContext)
    {
        var toDelete = dbContext.Pois.Attach(new POI() { Id = id });
        toDelete.State = EntityState.Deleted;
        await dbContext.SaveChangesAsync();

        return Results.Ok();
    }

    internal static async Task<IResult> UpdatePoi(
        [FromQuery(Name = "id")] string id,
        [FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Disallow)] UpdatePoiRequest req,
        PoiDbContext dbContext)
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

        return Results.Ok();
    }
}