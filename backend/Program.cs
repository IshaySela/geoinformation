using GeoInformation.Service;
using Microsoft.EntityFrameworkCore;
using GeoInformation.Api;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using GeoInformation.Models;
using Microsoft.AspNetCore.Diagnostics;

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


app.MapGroup("/pois")
    .MapPoisEndpoints();


app.UseHttpsRedirection();

app.Run();
