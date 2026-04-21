# Run StudentCRUD with MySQL driver in classpath
$driverPath = "$env:USERPROFILE\.m2\repository\mysql\mysql-connector-java\8.0.30\mysql-connector-java-8.0.30.jar"

if (-not (Test-Path $driverPath)) {
    Write-Output "✗ MySQL driver not found at: $driverPath"
    Write-Output "Please run: mvn clean compile"
    exit 1
}

if (-not (Test-Path "StudentCRUD.class")) {
    Write-Output "Compiling StudentCRUD.java..."
    javac StudentCRUD.java
}

Write-Output "`n✓ Starting StudentCRUD..."
Write-Output "Make sure MySQL Server is running on localhost:3306`n"

java -cp ".;$driverPath" StudentCRUD
