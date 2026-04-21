import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class SessionServlet extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("text/html");
        PrintWriter out = res.getWriter();

        HttpSession session = req.getSession();
        String user = req.getParameter("user");

        if(user != null){  // SET SESSION
            session.setAttribute("user", user);
            out.println("Session Stored: " + user);
        } else {  // GET SESSION
            String val = (String) session.getAttribute("user");
            if(val != null)
                out.println("Session Value: " + val);
            else
                out.println("No Session Found");
        }
    }
}