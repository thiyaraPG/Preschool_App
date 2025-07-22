from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash
from database import db
from models.teacher import Teacher
from routes.teacher_routes import teacher_bp


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

# Register teacher routes
app.register_blueprint(teacher_bp)

# --- Run Server ---
if __name__ == '__main__':
    app.run(debug=True)
