
namespace GeoInformation.Models
{
    public record POI
    {
        public required string Id { get; init; }
        public required string Name { get; init; }
        public required string Description { get; init; }
        public required string Category { get; init; }
        public required double Latitude { get; init; }
        public required double Longitude { get; init; }
        public required DateTime CreationTime { get; init; }
    }
}