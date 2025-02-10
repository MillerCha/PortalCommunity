# השתמש בתמונה של SQL Server
FROM mcr.microsoft.com/mssql/server:2022-latest

# הגדרת סיסמת ה-SA
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=YourStrongPassword123!

# הגדרת פורט ה-SQL Server
EXPOSE 1433

# Script שמריץ SQL ליצירת מסד נתונים וטבלה
COPY create_database.sql /tmp/create_database.sql

# הרץ את SQL Server ו-Create Database בעת הפעלת הקונטיינר
CMD /bin/bash -c "/opt/mssql/bin/sqlservr & sleep 30s; /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrongPassword123! -i /tmp/create_database.sql; tail -f /dev/null"
