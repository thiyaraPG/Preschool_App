from repository.student_repository import add_student, get_student_by_email

def register_student(data):
    name = data.get('name')
    parent_name = data.get('parent_name')
    contact_number = data.get('contact_number')
    email = data.get('email')

    # Check if email is already registered
    if get_student_by_email(email):
        return {"error": "Email already registered"}, 400

    # Add student to DB
    student = add_student(name, parent_name, contact_number, email)

    return {
        "message": "Student registered successfully",
        "student_id": student.id
    }, 201
