# שלב בסיסי - שימוש ב-runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 5001
EXPOSE 5001

# שלב בנייה - שימוש ב-SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# העתקת הקובץ csproj
COPY ["AuthService/AuthService.csproj", "./AuthService/"]
RUN dotnet restore "./AuthService/AuthService.csproj"

# העתקת כל הקבצים לתוך התמונה
COPY . .
WORKDIR "/src/AuthService"
RUN dotnet build "./AuthService.csproj" -c $BUILD_CONFIGURATION -o /app/build

# שלב פרסום
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./AuthService.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# שלב הפעלה
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:5001
ENTRYPOINT ["dotnet", "AuthService.dll"]

