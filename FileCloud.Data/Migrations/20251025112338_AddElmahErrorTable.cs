using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FileCloud.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddElmahErrorTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ELMAH_Error",
                columns: table => new
                {
                    ErrorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Application = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Host = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Source = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Message = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    User = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    StatusCode = table.Column<int>(type: "int", nullable: false),
                    TimeUtc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Sequence = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AllXml = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ELMAH_Error", x => x.ErrorId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ELMAH_Error_App_Time_Seq",
                table: "ELMAH_Error",
                columns: new[] { "Application", "TimeUtc", "Sequence" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ELMAH_Error");
        }
    }
}
