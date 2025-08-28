
namespace GeoInformation.Service
{
    using GeoInformation.Models;
    using Microsoft.EntityFrameworkCore;

    public class PoiDbContext : DbContext
    {
        public const string POI_TABLE_NAME = "pois";

        public PoiDbContext(DbContextOptions<PoiDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<POI>()
                .ToTable(POI_TABLE_NAME);
            
            modelBuilder.Entity<POI>(entity =>
                {
                    entity.Property(p => p.Id).HasColumnName("id");
                    entity.HasKey(p => p.Id);
                    entity.Property(p => p.Name).IsRequired();
                    entity.Property(p => p.Description);
                    entity.Property(p => p.Latitude).IsRequired();
                    entity.Property(p => p.Longitude).IsRequired();
                    entity.Property(p => p.Category).IsRequired();
                });

        }

        public DbSet<POI> Pois { get; set; }
    }
}