
namespace GeoInformation.Api
{
    public record CreateNewPoiRequest(string Name, string Category, string? Description, double Longitude, double Latitude);
}