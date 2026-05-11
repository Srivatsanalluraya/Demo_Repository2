# vulnerable_demo.py
# EXTREMELY VULNERABLE DEMO APPLICATION
# For educational/security scanner testing ONLY

import os
import sqlite3
import pickle
import hashlib
import random
import subprocess

# ------------------------------------------------
# Hardcoded Secrets
# ------------------------------------------------
API_KEY = "SUPER_SECRET_API_KEY_123456"
DB_PASSWORD = "admin123"
JWT_SECRET = "my_jwt_secret"

# ------------------------------------------------
# Weak Cryptography
# ------------------------------------------------
password = "password123"
hashed = hashlib.md5(password.encode()).hexdigest()
print("MD5:", hashed)

# ------------------------------------------------
# Insecure Random
# ------------------------------------------------
otp = random.randint(100000, 999999)
print("OTP:", otp)

# ------------------------------------------------
# SQL Injection
# ------------------------------------------------
username = input("Username: ")

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

query = f"SELECT * FROM users WHERE username = '{username}'"
cursor.execute(query)

# ------------------------------------------------
# Command Injection
# ------------------------------------------------
cmd = input("Enter command: ")
os.system(cmd)

# ------------------------------------------------
# Dangerous subprocess
# ------------------------------------------------
user_input = input("Subprocess command: ")

subprocess.Popen(
    user_input,
    shell=True
)

# ------------------------------------------------
# Insecure Pickle Deserialization
# ------------------------------------------------
payload = input("Pickle payload: ")

pickle.loads(payload.encode())

# ------------------------------------------------
# Dangerous eval
# ------------------------------------------------
expr = input("Expression: ")
print(eval(expr))

# ------------------------------------------------
# Dangerous exec
# ------------------------------------------------
code = input("Python code: ")
exec(code)

# ------------------------------------------------
# Silent exception handling
# ------------------------------------------------
try:
    x = 1 / 0
except:
    pass

# ------------------------------------------------
# File Path Traversal
# ------------------------------------------------
filename = input("Filename: ")

with open(filename, "r") as f:
    print(f.read())

# ------------------------------------------------
# SSRF-like behavior
# ------------------------------------------------
import requests

url = input("URL: ")

response = requests.get(url)
print(response.text)

# ------------------------------------------------
# Unsafe YAML
# ------------------------------------------------
import yaml

yaml_data = input("YAML: ")

yaml.load(yaml_data, Loader=yaml.Loader)

# ------------------------------------------------
# Insecure Temp File
# ------------------------------------------------
import tempfile

temp = tempfile.mktemp()
print(temp)

# ------------------------------------------------
# Hardcoded AWS-like Secret
# ------------------------------------------------
AWS_SECRET_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE"

print("Done.")

