import javax.xml.XMLConstants;
import javax.xml.validation.SchemaFactory;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.*;
import java.io.File;
import java.util.stream.Stream;

import javax.xml.transform.Source;

public class XSDVal {
    public static void main(String[] args) {
        try {
            File schemaFile=new File("bookstore.xsd");
            File xmlFile=new File("bookstore.xml");
            SchemaFactory f=SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            Schema s=f.newSchema(schemaFile);
            Validator v=s.newValidator();
            v.validate(new StreamSource(xmlFile));
            System.out.println("XSD Validation succesfull");
        } catch (Exception e) {
            System.out.println("XSD Validation failed "+e.getMessage());
        }
    }
}
