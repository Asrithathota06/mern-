import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class CookieServlet extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("text/html");
        PrintWriter out = res.getWriter();

        String name = req.getParameter("username");

        if(name != null){  // SET COOKIE
            Cookie c = new Cookie("username", name);
            c.setMaxAge(3600);
            res.addCookie(c);
            out.println("Cookie Stored: " + name);
        } else {  // GET COOKIE
            Cookie cookies[] = req.getCookies();
            if(cookies != null){
                for(Cookie c : cookies){
                    if(c.getName().equals("username")){
                        out.println("Cookie Value: " + c.getValue());
                    }
                }
            } else {
                out.println("No Cookie Found");
            }
        }
    }
}