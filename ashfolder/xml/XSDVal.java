import javax.xml.XMLConstants;
import javax.xml.validation.SchemaFactory;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.*;
import java.io.File;

public class XSDVal {
    public static void main(String[] args) {
        try {
            File xmlFile = new File(args.length > 0 ? args[0] : "bookstore.xml");
            File schemaFile = new File(args.length > 1 ? args[1] : "bookstore.xsd");
            SchemaFactory f=SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema s=f.newSchema(schemaFile);
            Validator v=s.newValidator();
            v.validate(new StreamSource(xmlFile));
            System.out.println("XSD validation successful");
        } catch (Exception e) {
            System.out.println("XSD validation failed: " + e.getMessage());
        }
    }
}