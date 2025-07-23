import psycopg2

conn = psycopg2.connect(
    database="postgres",
    host="localhost",
    user="postgres",  # Correct user
    password="2002",  # Replace with actual password
    port="5432"
)
conn.autocommit = True
cur = conn.cursor()

cur.execute("CREATE DATABASE myenv;")
cur.close()
conn.close()
print("Database created successfully.")
