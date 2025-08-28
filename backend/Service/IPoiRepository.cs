namespace GeoInformation.Service
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using GeoInformation.Models;

    public interface IPoiRepository
    {
        /// <summary>
        /// The function returns all POIs from the database
        /// </summary>
        Task<IEnumerable<POI>> GetAllPoisAsync();

        /// <summary>
        /// Get POI from the database by ID
        /// </summary>
        /// <param name="id">The id of the POI</param>
        /// <returns>The POI, null if not found</returns>
        Task<POI?> TryGetPoiByIdAsync(int id);

        /// <summary>
        /// Add a new POI to the database
        /// </summary>
        /// <param name="poi">The object to create</param>
        /// <returns>true if created, false otherwise</returns>
        Task<bool> AddPoiAsync(POI poi);

        Task UpdatePoiAsync(POI poi);

        Task DeletePoiAsync(int id);
    }
}