import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.xml.sax.*;
import java.io.File;

public class DTDVal {
    public static void main(String[] args) {
        try {
            File xmlFile = new File(args.length > 0 ? args[0] : "bookstore.xml");
            DocumentBuilderFactory f = DocumentBuilderFactory.newInstance();
            f.setValidating(true);
            DocumentBuilder b = f.newDocumentBuilder();
            b.setErrorHandler(new ErrorHandler() {
                public void warning(SAXParseException e) {
                    System.err.println("Warning: " + e.getMessage());
                }
                public void error(SAXParseException e) throws SAXException {
                    throw e;
                }
                public void fatalError(SAXParseException e) throws SAXException {
                    throw e;
                }
            });
            b.parse(xmlFile);
            System.out.println("DTD validation successful");
        } catch (SAXParseException e) {
            System.out.println("DTD validation failed: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("DTD validation failed: " + e.getMessage());
        }
    }
}