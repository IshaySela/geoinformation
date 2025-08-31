namespace GeoInformation.Api;

public record CreateNewPoiResponse(string Id);

public record GetAllPoisResponse(IEnumerable<PoiDto> pois);