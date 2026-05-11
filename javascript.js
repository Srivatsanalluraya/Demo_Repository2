// vulnerable-demo.js
// EXTREMELY VULNERABLE JS DEMO APPLICATION
// For educational/security scanner testing ONLY

const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const child_process = require("child_process");
const sqlite3 = require("sqlite3").verbose();
const yaml = require("js-yaml");

const app = express();

app.use(express.json());

// ------------------------------------------------
// Hardcoded Secrets
// ------------------------------------------------
const API_KEY = "SUPER_SECRET_API_KEY_123456";
const DB_PASSWORD = "admin123";
const JWT_SECRET = "jwt_secret_key";
const AWS_SECRET_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE";

// ------------------------------------------------
// Weak Cryptography
// ------------------------------------------------
const password = "password123";

const md5 = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

console.log("MD5:", md5);

// ------------------------------------------------
// Weak Random
// ------------------------------------------------
const otp = Math.floor(Math.random() * 999999);

console.log("OTP:", otp);

// ------------------------------------------------
// SQL Injection
// ------------------------------------------------
app.get("/user", (req, res) => {

    const username = req.query.username;

    const db = new sqlite3.Database(":memory:");

    const query =
        "SELECT * FROM users WHERE username = '" +
        username +
        "'";

    db.all(query, (err, rows) => {

        if (err) {
            return res.send(err.message);
        }

        res.send(rows);
    });
});

// ------------------------------------------------
// Command Injection
// ------------------------------------------------
app.get("/ping", (req, res) => {

    const host = req.query.host;

    child_process.exec(
        "ping -c 1 " + host,
        (err, stdout) => {

            res.send(stdout);
        }
    );
});

// ------------------------------------------------
// Dangerous eval
// ------------------------------------------------
app.post("/eval", (req, res) => {

    const expression = req.body.expression;

    const result = eval(expression);

    res.send(String(result));
});

// ------------------------------------------------
// Path Traversal
// ------------------------------------------------
app.get("/file", (req, res) => {

    const filename = req.query.name;

    const content = fs.readFileSync(filename);

    res.send(content.toString());
});

// ------------------------------------------------
// Insecure Deserialization-like Behavior
// ------------------------------------------------
app.post("/deserialize", (req, res) => {

    const data = Buffer.from(req.body.data, "base64");

    const parsed = JSON.parse(data.toString());

    res.send(parsed);
});

// ------------------------------------------------
// SSRF-like Request
// ------------------------------------------------
app.get("/fetch", async (req, res) => {

    const url = req.query.url;

    const response = await fetch(url);

    const text = await response.text();

    res.send(text);
});

// ------------------------------------------------
// Unsafe YAML Loading
// ------------------------------------------------
app.post("/yaml", (req, res) => {

    const parsed = yaml.load(req.body.yaml);

    res.send(parsed);
});

// ------------------------------------------------
// Open Redirect
// ------------------------------------------------
app.get("/redirect", (req, res) => {

    const target = req.query.url;

    res.redirect(target);
});

// ------------------------------------------------
// XSS
// ------------------------------------------------
app.get("/xss", (req, res) => {

    const name = req.query.name;

    res.send("<h1>Hello " + name + "</h1>");
});

// ------------------------------------------------
// Sensitive Logging
// ------------------------------------------------
console.log("JWT Secret:", JWT_SECRET);
console.log("DB Password:", DB_PASSWORD);

// ------------------------------------------------
// Hardcoded Token
// ------------------------------------------------
const GITHUB_TOKEN =
    "ghp_exampleVerySensitiveToken123456";

// ------------------------------------------------
// Insecure Temp File
// ------------------------------------------------
fs.writeFileSync(
    "/tmp/temp.txt",
    "temporary sensitive data"
);

// ------------------------------------------------
// Prototype Pollution-like Pattern
// ------------------------------------------------
app.post("/merge", (req, res) => {

    const obj = {};

    Object.assign(obj, req.body);

    res.send(obj);
});

// ------------------------------------------------
// Unsafe child_process spawn
// ------------------------------------------------
app.get("/spawn", (req, res) => {

    const command = req.query.cmd;

    child_process.spawn(command, [], {
        shell: true
    });

    res.send("Executed");
});

// ------------------------------------------------
// Start Server
// ------------------------------------------------
app.listen(3000, () => {

    console.log("Vulnerable app running on port 3000");
});

