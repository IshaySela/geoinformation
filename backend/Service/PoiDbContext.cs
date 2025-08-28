
namespace GeoInformation.Service
{
    using GeoInformation.Models;
    using Microsoft.EntityFrameworkCore;
    using MongoDB.EntityFrameworkCore.Extensions;

    public class PoiDbContext : DbContext
    {
        public const string POI_COLLECTION_NAME = "pois";

        public PoiDbContext(DbContextOptions<PoiDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<POI>().ToCollection(POI_COLLECTION_NAME);
        }

        public DbSet<POI> Pois { get; set; } = null!;
    }
}