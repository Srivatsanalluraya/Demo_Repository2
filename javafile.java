// VulnerableDemo.java
// EXTREMELY VULNERABLE JAVA DEMO APPLICATION
// For educational/security scanner testing ONLY

import java.io.*;
import java.sql.*;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.Random;
import javax.servlet.http.HttpServletRequest;

public class VulnerableDemo {

    // ------------------------------------------------
    // Hardcoded Secrets
    // ------------------------------------------------
    private static final String DB_PASSWORD = "super_secret_password";
    private static final String API_KEY = "HARDCODED_API_KEY_123";
    private static final String JWT_SECRET = "jwt_secret_key";

    public static void main(String[] args) throws Exception {

        BufferedReader reader =
            new BufferedReader(new InputStreamReader(System.in));

        // ------------------------------------------------
        // SQL Injection
        // ------------------------------------------------
        String username = reader.readLine();

        Connection conn = DriverManager.getConnection(
            "jdbc:mysql://localhost/test",
            "root",
            DB_PASSWORD
        );

        Statement stmt = conn.createStatement();

        String query =
            "SELECT * FROM users WHERE username = '" + username + "'";

        ResultSet rs = stmt.executeQuery(query);

        // ------------------------------------------------
        // Command Injection
        // ------------------------------------------------
        String cmd = reader.readLine();

        Runtime.getRuntime().exec(cmd);

        // ------------------------------------------------
        // Weak MD5 Hash
        // ------------------------------------------------
        MessageDigest md = MessageDigest.getInstance("MD5");

        byte[] digest = md.digest("password123".getBytes());

        System.out.println(Base64.getEncoder().encodeToString(digest));

        // ------------------------------------------------
        // Weak Random
        // ------------------------------------------------
        Random random = new Random();

        int otp = random.nextInt(999999);

        System.out.println("OTP: " + otp);

        // ------------------------------------------------
        // Path Traversal
        // ------------------------------------------------
        String filename = reader.readLine();

        File file = new File(filename);

        BufferedReader fileReader =
            new BufferedReader(new FileReader(file));

        System.out.println(fileReader.readLine());

        // ------------------------------------------------
        // Dangerous Deserialization
        // ------------------------------------------------
        ObjectInputStream ois =
            new ObjectInputStream(new FileInputStream("payload.ser"));

        Object obj = ois.readObject();

        // ------------------------------------------------
        // XSS-like Output
        // ------------------------------------------------
        String userInput = reader.readLine();

        System.out.println("<html>" + userInput + "</html>");

        // ------------------------------------------------
        // Open Redirect
        // ------------------------------------------------
        String redirectUrl = reader.readLine();

        System.out.println("Redirecting to: " + redirectUrl);

        // ------------------------------------------------
        // Hardcoded AWS-like Secret
        // ------------------------------------------------
        String AWS_SECRET_ACCESS_KEY =
            "AKIAIOSFODNN7EXAMPLE";

        // ------------------------------------------------
        // Silent Exception Handling
        // ------------------------------------------------
        try {
            int x = 1 / 0;
        } catch (Exception e) {
        }

        // ------------------------------------------------
        // Insecure Temp File
        // ------------------------------------------------
        File temp = File.createTempFile("tmp", ".txt");

        System.out.println(temp.getAbsolutePath());

        // ------------------------------------------------
        // LDAP Injection-like String
        // ------------------------------------------------
        String ldapUser = reader.readLine();

        String ldapQuery =
            "(&(uid=" + ldapUser + ")(objectClass=person))";

        System.out.println(ldapQuery);

        // ------------------------------------------------
        // XXE Vulnerability
        // ------------------------------------------------
        javax.xml.parsers.DocumentBuilderFactory dbf =
            javax.xml.parsers.DocumentBuilderFactory.newInstance();

        dbf.setExpandEntityReferences(true);

        System.out.println("Done.");
    }

    // ------------------------------------------------
    // Vulnerable Servlet Method
    // ------------------------------------------------
    public void doGet(HttpServletRequest request)
        throws Exception {

        String input = request.getParameter("cmd");

        Runtime.getRuntime().exec(input);
    }
}

