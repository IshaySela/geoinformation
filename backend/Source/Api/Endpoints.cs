using System.ComponentModel.DataAnnotations;
using GeoInformation.Models;
using GeoInformation.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace GeoInformation.Api;


public static class PoisEndpoints
{
    /// <summary>
    /// Extension method for configuring all of the POI endpoints to a route group.
    /// </summary>
    public static RouteGroupBuilder MapPoisEndpoints(this RouteGroupBuilder builder)
    {
        builder.MapGet("/all", PoisEndpoints.GetAllPois);
        builder.MapPost("/new", PoisEndpoints.CreateNewPoi);
        builder.MapDelete("/delete", PoisEndpoints.DeletePoi);
        builder.MapPut("/update", PoisEndpoints.UpdatePoi);

        return builder;
    }

    /// <summary>
    /// Get all POIs from the database
    /// </summary>
    /// <returns>GetAllPoisResponse</returns>
    internal static async Task<IResult> GetAllPois(PoiDbContext dbContext)
    {
        var pois = await dbContext.Pois.ToListAsync();
        var response = pois.Select(p => new PoiDto(p.Id, p.Category, p.Name, p.Description, p.Latitude, p.Longitude));

        return TypedResults.Ok(new GetAllPoisResponse(response ?? new List<PoiDto>()));
    }

    internal static async Task<IResult> CreateNewPoi(PoiDbContext dbContext,
        [FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Disallow)] CreateNewPoiRequest req)
    {
        IResult? validationProblem = ValidateRequest(req);

        if (validationProblem is not null)
        {
            return validationProblem;
        }

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

        return TypedResults.Ok(new CreateNewPoiResponse(created.Id));
    }

    internal static async Task<IResult> DeletePoi([FromQuery(Name = "id")] string id, PoiDbContext dbContext)
    {
        var toDelete = dbContext.Pois.Attach(new POI() { Id = id });
        toDelete.State = EntityState.Deleted;

        try
        {
            await dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) // Operation failed, affected 0 rows instead of 1
        {
            return Results.NotFound();
        }

        return Results.Ok();
    }

    internal static async Task<IResult> UpdatePoi(
        [FromQuery(Name = "id")] string id,
        [FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Disallow)] UpdatePoiRequest req,
        PoiDbContext dbContext)
    {
        IResult? validationProblem = ValidateRequest(req);

        if (validationProblem is not null)
        {
            return validationProblem;
        }

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

        try
        {
            await dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) // the exception is thrown when unexpceted amount of rows has changed
        {
            return Results.NotFound();
        }

        return Results.Ok();
    }

    internal static IResult? ValidateRequest<T>(T request) where T : class
    {
        var context = new ValidationContext(request);
        var results = new List<ValidationResult>();
        bool valid = false;

        try
        {
            valid = Validator.TryValidateObject(request, context, results, true);
        }
        catch (System.Exception)
        {
            valid = false;
        }

        if (!valid)
        {
            // Map the validation errors to problems array
            return Results.ValidationProblem(
                    errors: results.ToDictionary(valResult => valResult.MemberNames.FirstOrDefault() ?? "", valResult => new[] { valResult.ErrorMessage! })
                );
        }

        return null;
    }
}