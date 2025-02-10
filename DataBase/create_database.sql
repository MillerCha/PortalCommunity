-- יצירת מסד נתונים
CREATE DATABASE MyDatabase;

-- שימוש במסד הנתונים החדש
USE MyDatabase;

-- יצירת טבלה בשם Users
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL
);

-- הכנסת נתונים לדוגמה
INSERT INTO Users (Username, Email)
VALUES ('john_doe', 'john@example.com'),
       ('jane_doe', 'jane@example.com'),
       ('sam_smith', 'sam@example.com');
