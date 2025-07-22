from models.teacher import Teacher
from app import db

def add_teacher(teacher_id, email, password):
    """
    Add a new teacher to the database.
    """
    teacher = Teacher(teacher_id=teacher_id, email=email, password=password)
    db.session.add(teacher)
    db.session.commit()
    return teacher

def get_teacher_by_email(email):
    """
    Fetch a teacher by email address.
    """
    return Teacher.query.filter_by(email=email).first()

def get_teacher_by_id(teacher_id):
    """
    Fetch a teacher by their teacher_id.
    """
    return Teacher.query.filter_by(teacher_id=teacher_id).first()
