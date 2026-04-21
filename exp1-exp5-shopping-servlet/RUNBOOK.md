# Experiment 1 + 5 Integration Runbook

## What is already done

- Local Maven installed at `tools/maven/apache-maven-3.9.9`
- Local Tomcat installed at `tools/tomcat/apache-tomcat-10.1.31`
- Servlet app created and deployed as `shopping-servlet-app.war`
- App URL: `http://localhost:8080/shopping-servlet-app/`

## Project

- Servlet app folder: `exp1-exp5-shopping-servlet`
- Schema file: `exp1-exp5-shopping-servlet/schema.sql`

## Database setup (MySQL)

If mysql client is installed, run from repository root:

```powershell
mysql -u root -ppassword < exp1-exp5-shopping-servlet\schema.sql
```

If mysql client is not installed:

1. Install MySQL Server + MySQL Workbench.
2. Open Workbench and connect to local server.
3. Open and execute `exp1-exp5-shopping-servlet/schema.sql`.

## Build and deploy

From repository root:

```powershell
tools\maven\apache-maven-3.9.9\bin\mvn.cmd -f exp1-exp5-shopping-servlet\pom.xml -DskipTests package
Copy-Item exp1-exp5-shopping-servlet\target\shopping-servlet-app.war tools\tomcat\apache-tomcat-10.1.31\webapps\shopping-servlet-app.war -Force
```

## Start Tomcat

```powershell
$env:CATALINA_HOME = "C:\Users\T.S.L.Asritha\WEB APPLICATION\mern-\tools\tomcat\apache-tomcat-10.1.31"
$env:CATALINA_BASE = $env:CATALINA_HOME
& "C:\Users\T.S.L.Asritha\WEB APPLICATION\mern-\tools\tomcat\apache-tomcat-10.1.31\bin\startup.bat"
```

Open app:

`http://localhost:8080/shopping-servlet-app/`

## Stop Tomcat

```powershell
$env:CATALINA_HOME = "C:\Users\T.S.L.Asritha\WEB APPLICATION\mern-\tools\tomcat\apache-tomcat-10.1.31"
$env:CATALINA_BASE = $env:CATALINA_HOME
& "C:\Users\T.S.L.Asritha\WEB APPLICATION\mern-\tools\tomcat\apache-tomcat-10.1.31\bin\shutdown.bat"
```
