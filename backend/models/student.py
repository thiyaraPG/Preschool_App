from database import db

class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)  # Auto-incremented ID
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)  # Required & unique 
    parent_name = db.Column(db.String(100), nullable=False)
    contact_number = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"<Student {self.name}>"
