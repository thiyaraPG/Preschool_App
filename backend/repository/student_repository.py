from models.student import Student
from database import db

def add_student(name, parent_name, contact_number, email):
    student = Student(
        name=name,
        parent_name=parent_name,
        contact_number=contact_number,
        email=email
    )
    db.session.add(student)
    db.session.commit()
    return student

def get_student_by_email(email):
    return Student.query.filter_by(email=email).first()

def get_student_by_id(student_id):
    return Student.query.filter_by(id=student_id).first()
