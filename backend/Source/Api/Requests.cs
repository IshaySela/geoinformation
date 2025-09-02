
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

public record UpdatePoiRequest(
    [property: JsonRequired, JsonPropertyName("name")] string Name,
    [property: JsonRequired, JsonPropertyName("category")] string Category,
    [property: JsonRequired, JsonPropertyName("description")] string Description,
    [property: JsonRequired, JsonPropertyName("longitude")] double Longitude,
    [property: JsonRequired, JsonPropertyName("latitude")] double Latitude
);