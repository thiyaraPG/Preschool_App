from repository.teacher_repository import add_teacher, get_teacher_by_email
from werkzeug.security import generate_password_hash

def register_teacher(teacher_id, email, password):
    """
    Register a new teacher.
    """
    # Check if the email already exists
    if get_teacher_by_email(email):
        return {"error": "Email already registered"}, 400
    
    # Hash the password
    hashed_password = generate_password_hash(password)
    
    # Add teacher to DB
    teacher = add_teacher(teacher_id, email, hashed_password)
    
    return {"message": "Teacher registered successfully", "id": teacher.id}, 201
