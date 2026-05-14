import java.io.File;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.xml.sax.ErrorHandler;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

public class DTDVal {
    private static File resolveXmlFile(String[] args) {
        if (args.length > 0) {
            return new File(args[0]);
        }

        File local = new File("bookstore.xml");
        if (local.exists()) {
            return local;
        }

        File inAshfolder = new File("ashfolder/xml/bookstore.xml");
        if (inAshfolder.exists()) {
            return inAshfolder;
        }

        // Fall back to local name so error message remains clear.
        return local;
    }

    public static void main(String[] args) {
        try {
            File xmlFile = resolveXmlFile(args);
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