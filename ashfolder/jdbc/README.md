JDBC helper for Student CRUD

This folder contains the canonical `StudentCRUD.java` console app.

Location: `ashfolder/jdbc/StudentCRUD.java`

Notes:
- This is the authoritative copy; duplicate copies elsewhere were removed.
- Update database credentials inside the source if needed.
- Build with `javac` and run with `java` using the MySQL connector on the classpath.

Example:

```powershell
javac -d out ashfolder\jdbc\StudentCRUD.java
java -cp "out;path\to\mysql-connector-java-8.0.30.jar" StudentCRUD
```
