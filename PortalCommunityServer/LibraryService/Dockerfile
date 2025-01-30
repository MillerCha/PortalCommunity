# שלב בסיסי - שימוש ב-runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 5002
EXPOSE 5002

# שלב בנייה - שימוש ב-SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# העתקת הקובץ csproj
COPY ["LibraryService/LibraryService.csproj", "./LibraryService/"]
RUN dotnet restore "./LibraryService/LibraryService.csproj"

# העתקת כל הקבצים לתוך התמונה
COPY . .
WORKDIR "/src/LibraryService"
RUN dotnet build "./LibraryService.csproj" -c $BUILD_CONFIGURATION -o /app/build

# שלב פרסום
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./LibraryService.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# שלב הפעלה
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LibraryService.dll"]