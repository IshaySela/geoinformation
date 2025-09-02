
namespace GeoInformation.Api;

using System.Text.Json.Serialization;

public record CreateNewPoiRequest(
    [property: JsonPropertyName("name"), JsonRequired] string Name,
    [property: JsonPropertyName("category"), JsonRequired] string Category,
    [property: JsonPropertyName("description")] string? Description,
    [property: JsonPropertyName("longitude"), JsonRequired] double Longitude,
    [property: JsonPropertyName("latitude"), JsonRequired] double Latitude
);

public record UpdatePoiRequest(
    [property: JsonRequired, JsonPropertyName("name")] string Name,
    [property: JsonRequired, JsonPropertyName("category")] string Category,
    [property: JsonRequired, JsonPropertyName("description")] string Description,
    [property: JsonRequired, JsonPropertyName("longitude")] double Longitude,
    [property: JsonRequired, JsonPropertyName("latitude")] double Latitude
);