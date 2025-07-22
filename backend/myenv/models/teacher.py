from database import db

class Teacher(db.Model):
    __tablename__ = 'teachers'
    
    id = db.Column(db.Integer, primary_key=True)  # Auto-incremented internal ID
    teacher_id = db.Column(db.String(50), nullable=False, unique=True)  # Teacher ID from frontend
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<Teacher {self.teacher_id}>"
