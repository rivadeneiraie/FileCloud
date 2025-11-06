# AI Coding Agent Instructions for FileCloud

Welcome to the FileCloud codebase! This document provides essential guidance for AI coding agents to be productive and aligned with the project's architecture, workflows, and conventions.

## Project Overview

FileCloud is a .NET-based application designed for file management and sharing. The solution is structured into three main projects:

1. **FileCloud.API**: The entry point for the application, containing controllers, startup configuration, and API endpoints.
2. **FileCloud.Domain**: Defines core domain models and constants.
3. **FileCloud.DomainLogic**: Implements business logic, services, and helper utilities.

### Key Architectural Patterns
- **Separation of Concerns**: The codebase is divided into API, domain, and business logic layers to ensure modularity and maintainability.
- **Dependency Injection**: Services are registered in `ServiceInjections.cs` and injected where needed.
- **DTOs**: Data Transfer Objects (DTOs) are used to encapsulate data exchanged between layers.

### Data Flow
1. **API Layer**: Controllers in `FileCloud.API/Controllers` handle HTTP requests and delegate to services.
2. **Business Logic Layer**: Services in `FileCloud.DomainLogic/Services` process requests and interact with domain models.
3. **Domain Layer**: Models in `FileCloud.Domain` represent the core data structures.

## Developer Workflows

### Building the Project
Run the following task to build the solution:
```
dotnet build FileCloud.API/FileCloud.API.csproj
```
Alternatively, use the VS Code task labeled `build`.

### Running the Application
Start the application with:
```
dotnet run --project FileCloud.API/FileCloud.API.csproj
```
Alternatively, use the VS Code task labeled `run`.

### Debugging
- Set breakpoints in the code.
- Use the `launch.json` configuration in VS Code to attach the debugger.

### Testing
- Ensure tests are added for all business logic in `FileCloud.DomainLogic`.
- Use `dotnet test` to run tests (test files are not yet identified in the workspace).

## Project-Specific Conventions

### Controllers
- Controllers are located in `FileCloud.API/Controllers`.
- Follow RESTful principles for endpoint design.

### Services
- Services implement interfaces defined in `FileCloud.DomainLogic/Interfaces`.
- Register new services in `ServiceInjections.cs`.

### DTOs
- Place DTOs in `FileCloud.API/DTOs` or `FileCloud.DomainLogic/DTOs` depending on their scope.
- Ensure DTOs are immutable where possible.

### Constants
- Define constants in `FileCloud.Domain/Constants`.
- Use descriptive names for clarity.

## Integration Points
- **JWT Authentication**: Managed by `JwtHelper.cs`.
- **Localization**: Resource files in `FileCloud.DomainLogic/Resources` support multiple languages.

## External Dependencies
- **.NET Core**: Ensure the correct version is installed (currently targeting .NET 8.0).
- **NuGet Packages**: Dependencies are managed via `*.csproj` files.

## Examples

### Adding a New Service
1. Define an interface in `FileCloud.DomainLogic/Interfaces`.
2. Implement the service in `FileCloud.DomainLogic/Services`.
3. Register the service in `ServiceInjections.cs`.

### Adding a New API Endpoint
1. Create a new controller in `FileCloud.API/Controllers`.
2. Define the endpoint method and inject required services.
3. Update `Startup.cs` if additional middleware or configuration is needed.

---

This document is a living guide. Update it as the project evolves to ensure alignment and clarity.