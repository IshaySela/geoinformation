
namespace GeoInformation.Api;

using System.Text.Json.Serialization;

public record CreateNewPoiRequest
{
    [JsonPropertyName("name")]
    [JsonRequired]
    public string Name { get; init; } = string.Empty;

    [JsonPropertyName("category")]
    [JsonRequired]
    public string Category { get; init; } = string.Empty;

    [JsonPropertyName("description")]
    public string? Description { get; init; }

    [JsonPropertyName("longitude")]
    [JsonRequired]
    public double Longitude { get; init; }

    [JsonPropertyName("latitude")]
    [JsonRequired]
    public double Latitude { get; init; }
}

public record UpdatePoiRequest(string Name, string Category, string Description, double Longitude, double Latitude);