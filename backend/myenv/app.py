from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash
from database import db
from models.teacher import Teacher

app = Flask(__name__)

# --- CORS Setup ---
CORS(app, resources={r"/*": {"origins": "*"}})

# --- Database Config ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:2002@localhost/myenv'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# --- Create Tables ---
with app.app_context():
    db.create_all()

# --- After Request to Add CORS Headers ---
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# --- Home Route ---
@app.route('/')
def home():
    return {"message": "Backend is running"}

# --- Teacher Registration ---
@app.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':  # Preflight request
        return '', 200

    data = request.json
    teacher_id = data.get('teacher_id')
    email = data.get('email')
    password = data.get('password')

    if not teacher_id or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    # Check for existing email
    existing_teacher = Teacher.query.filter_by(email=email).first()
    if existing_teacher:
        return jsonify({"error": "Email already registered"}), 400

    hashed_password = generate_password_hash(password)
    teacher = Teacher(teacher_id=teacher_id, email=email, password=hashed_password)  # FIXED
    db.session.add(teacher)
    db.session.commit()

    return jsonify({"message": "Teacher registered successfully"}), 201

# --- Run Server ---
if __name__ == '__main__':
    app.run(debug=True)
