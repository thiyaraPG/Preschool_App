from flask import Blueprint, request, jsonify
from models.student import Student
from database import db

student_bp = Blueprint('student_bp', __name__)

@student_bp.route('/students', methods=['POST', 'OPTIONS'])
def create_student():
    if request.method == 'OPTIONS':  # Handle CORS preflight
        return '', 200

    data = request.json
    name = data.get('name')
    parent_name = data.get('parent_name')
    contact_number = data.get('contact_number')
    email = data.get('email')

    # --- Required field checks ---
    if not name or not parent_name or not contact_number or not email:
        return jsonify({"error": "All fields are required"}), 400

    # --- Contact number validation ---
    contact_number = str(contact_number)
    if not contact_number.isdigit() or len(contact_number) < 10:
        return jsonify({"error": "Contact number must be at least 10 digits and numeric"}), 400

    # --- Email format validation ---
    import re
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"error": "Invalid email address"}), 400

    # --- Email uniqueness check ---
    existing_student = Student.query.filter_by(email=email).first()
    if existing_student:
        return jsonify({"error": "Email already registered"}), 400

    # --- Create student ---
    student = Student(
        name=name,
        age=age,
        parent_name=parent_name,
        contact_number=contact_number,
        email=email
    )
    db.session.add(student)
    db.session.commit()

    return jsonify({
        "message": "Student registered successfully",
        "student_id": student.id
    }), 201
