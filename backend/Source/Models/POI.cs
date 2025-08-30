
namespace GeoInformation.Models
{
    public record POI
    {
        public required string Id { get; init; }
        public string Name { get; init; } = string.Empty;
        public string Description { get; init; }  = string.Empty;
        public string Category { get; init; } = string.Empty;
        public double Latitude { get; init; }
        public double Longitude { get; init; }
        public DateTime CreationTime { get; init; }

    }
}