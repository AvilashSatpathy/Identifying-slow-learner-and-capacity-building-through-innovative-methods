import mysql.connector

# Replace these with your database credentials
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "aku12345,",
    "database": "myapp",
}

# Connect to the MySQL database
connection = mysql.connector.connect(**db_config)

if connection.is_connected():
    cursor = connection.cursor()

    # Get user input from the form
    email = input("Enter your email: ")
    password = input("Create password: ")
    student_type = input("Select student type (college/school): ")

    # Hash the password for security (use bcrypt for production)
    hashed_password = password

    # Insert user data into the database
    insert_query = "INSERT INTO users (email, password, student_type) VALUES (%s, %s, %s)"
    user_data = (email, hashed_password, student_type)

    cursor.execute(insert_query, user_data)
    connection.commit()

    print("Registration successful!")

    cursor.close()
    connection.close()
