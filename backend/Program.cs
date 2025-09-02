using GeoInformation.Service;
using Microsoft.EntityFrameworkCore;
using GeoInformation.Api;
using Microsoft.AspNetCore.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

const string corsPolicyName = "_poisAllowServe";

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<PoiDbContext>(dbBuilder =>
    {
        dbBuilder.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
    });

builder.Services.AddOpenApi();

builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = ctx =>
    {
        ctx.ProblemDetails = ctx.Exception switch
        {
            BadHttpRequestException or JsonException => new ProblemDetails
            {
                Title = "Error while parsing json body",
                Status = StatusCodes.Status400BadRequest
            },

            _ => new ProblemDetails
            {
                Title = "Internal Server Error",
                Status = StatusCodes.Status500InternalServerError
            } // default
        };
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy =>
    {
        var frontendUrl = builder.Configuration["POIS_FRONTEND_URL"] ?? "http://localhost";

        if (builder.Environment.IsDevelopment())
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
        else
        {
            policy.WithOrigins(frontendUrl)
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(corsPolicyName);

app.MapGroup("/pois")
    .MapPoisEndpoints();

app.UseHttpsRedirection();

app.Run();
