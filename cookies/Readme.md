# 🚀 Java Servlet Setup using Apache Tomcat

This guide explains how to install Apache Tomcat and run **Session & Cookie Servlets** step-by-step.

---

## 🧠 Prerequisites

* Java JDK installed
* Basic knowledge of Java
* Command Prompt / PowerShell

---

## 📦 1. Install Apache Tomcat

1. Download Apache Tomcat (zip version)
2. Extract it to:

```
C:\Tomcat
```

3. Verify structure:

```
C:\Tomcat
 ├── bin
 ├── lib
 ├── webapps
```

---

## 📁 2. Create Project Structure

Open Command Prompt:

```bash
cd C:\Tomcat\webapps
mkdir MyApp
cd MyApp
mkdir WEB-INF
mkdir WEB-INF\classes
```

---

## 🧾 3. Add Servlet Files

Place your files here:

```
C:\Tomcat\webapps\MyApp\WEB-INF\classes\
    SessionServlet.java
    CookieServlet.java
```

---

## ⚙️ 4. Compile Servlets

```bash
cd C:\Tomcat\webapps\MyApp\WEB-INF\classes
javac -cp "C:\Tomcat\lib\servlet-api.jar" *.java
```

✔ This creates:

```
SessionServlet.class
CookieServlet.class
```

---

## 📄 5. Create web.xml

```bash
cd ..
notepad web.xml
```

Paste this:

```xml
<web-app>

    <servlet>
        <servlet-name>CookieServlet</servlet-name>
        <servlet-class>CookieServlet</servlet-class>
    </servlet>

    <servlet-mapping>
        <servlet-name>CookieServlet</servlet-name>
        <url-pattern>/cookie</url-pattern>
    </servlet-mapping>

    <servlet>
        <servlet-name>SessionServlet</servlet-name>
        <servlet-class>SessionServlet</servlet-class>
    </servlet>

    <servlet-mapping>
        <servlet-name>SessionServlet</servlet-name>
        <url-pattern>/session</url-pattern>
    </servlet-mapping>

</web-app>
```

---

## ▶️ 6. Start Server

```bash
cd C:\Tomcat\bin
startup.bat
```

---

## 🌐 7. Run in Browser

```
http://localhost:8080/MyApp/cookie
http://localhost:8080/MyApp/session
```

---

## 📝 8. Optional HTML File

Save as:

```
C:\Tomcat\webapps\MyApp\index.html
```

```html
<!DOCTYPE html>
<html>
<body>

<h2>Cookies</h2>
<form action="cookie">
  <input name="username">
  <button>Set Cookie</button>
</form>

<a href="cookie">Get Cookie</a>

<hr>

<h2>Session</h2>
<form action="session">
  <input name="user">
  <button>Set Session</button>
</form>

<a href="session">Get Session</a>

</body>
</html>
```

Open:

```
http://localhost:8080/MyApp/index.html
```

---

## 📦 About servlet-api.jar

* Location:

```
C:\Tomcat\lib\servlet-api.jar
```

* Purpose:

  * Contains classes like:

    * HttpServlet
    * HttpServletRequest
    * HttpServletResponse
    * HttpSession
    * Cookie

* Used during compilation:

```bash
javac -cp "C:\Tomcat\lib\servlet-api.jar" *.java
```

---

## ❌ Common Mistakes

* ❌ Running servlet using `java ClassName`
* ❌ Using port `5500` (Live Server)
* ❌ Missing `web.xml`
* ❌ Wrong folder structure
* ❌ Not compiling with `servlet-api.jar`

---

## 🧠 Key Concept

Servlet does NOT run like a normal Java program.

✔ Runs inside server
✔ Uses doGet() / doPost()
✔ Accessed via browser

---

## 🔥 Memory Trick

```
Create → Compile → Map → Start → Browser
```

---

## 🎯 Output

* Cookie is stored and retrieved
* Session is created and tracked
* Runs inside Tomcat server

---

## 💡 Explanation (Exam Line)

Servlet is a server-side program that runs inside a servlet container and handles client requests using HTTP methods.

---
