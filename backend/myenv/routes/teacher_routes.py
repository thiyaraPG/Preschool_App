from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from models.teacher import Teacher
from database import db

teacher_bp = Blueprint('teacher_bp', __name__)

@teacher_bp.route('/register', methods=['POST', 'OPTIONS'])
def register_teacher():
    if request.method == 'OPTIONS':  # Preflight request
        return '', 200

    data = request.json
    teacher_id = data.get('teacher_id')
    email = data.get('email')
    password = data.get('password')

    if not teacher_id or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    existing_teacher = Teacher.query.filter_by(email=email).first()
    if existing_teacher:
        return jsonify({"error": "Email already registered"}), 400

    hashed_password = generate_password_hash(password)
    teacher = Teacher(teacher_id=teacher_id, email=email, password=hashed_password)
    db.session.add(teacher)
    db.session.commit()

    return jsonify({"message": "Teacher registered successfully"}), 201
