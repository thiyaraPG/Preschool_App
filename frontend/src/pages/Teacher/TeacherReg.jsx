import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import GroupBG from '../../assets/GroupBG.png';
import TeacherRegImg from './Images/TeacherReg.png';

function TeacherReg() {
  const [formData, setFormData] = useState({
    teacher_id: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Auto-generate Teacher ID on component mount
  useEffect(() => {
    let lastId = localStorage.getItem('last_teacher_id') || 'T000';
    let nextIdNum = parseInt(lastId.substring(1)) + 1;
    let nextId = `T${String(nextIdNum).padStart(3, '0')}`;
    setFormData((prev) => ({ ...prev, teacher_id: nextId }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showToast('warning', 'Passwords do not match!');
      return;
    }
    try {
      await axios.post('http://127.0.0.1:5000/register', {
        teacher_id: formData.teacher_id,
        email: formData.email,
        password: formData.password,
      });
      showToast('success', 'Teacher registered successfully!');
      localStorage.setItem('last_teacher_id', formData.teacher_id);
    } catch (err) {
      showToast('error', err.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <div className="d-flex h-100 w-100">
      {/* Left Section */}
      <div
        className="d-flex"
        style={{
          backgroundColor: '#364290',
          width: '30%',
        }}
      >
        <div className="d-flex flex-column justify-content-between text-center w-100 h-100 pt-5">
          <div>
            <h1 className="text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Let’s Get You
            </h1>
            <h1 className="text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Signed Up!
            </h1>
          </div>
          <div className=" d-flex justify-content-center position-relative">
            <img
              src={TeacherRegImg}
              alt="Bottom Logo"
              style={{
                width: '120%',
                maxWidth: 'none',
                transform: 'translateX(9%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="flex-grow-1 d-flex"
        style={{
          backgroundColor: '#CFDFFF',
          backgroundImage: `url(${GroupBG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="d-flex flex-column text-center h-100 w-100">
          <div className="d-flex flex-column" style={{ padding: '10px 60px 60px 60px' }}>
            <div
              style={{
                color: '#364290',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: '26px',
              }}
            >
              Hello Teacher!
            </div>
            <div
              className="mt-1"
              style={{
                color: '#364290',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: '24px',
              }}
            >
              Please fill out the form below to get started
            </div>
          </div>

          {/* Form Section */}
          <form
            className="d-flex flex-column gap-5 justify-content-start"
            style={{ width: '30%', margin: '0 auto' }}
            onSubmit={handleSubmit}
          >
            {/* Teacher ID */}
            <div className="w-100">
              <h3
                className="text-start"
                style={{
                  color: '#364290',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: '16px',
                }}
              >
                Teacher ID
              </h3>
              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{
                    backgroundColor: '#fff',
                    borderColor: '#364290',
                    borderRadius: '8px 0 0 8px',
                  }}
                >
                  <i className="bi bi-person-badge"></i>
                </span>
                <input
                  type="text"
                  name="teacher_id"
                  className="form-control"
                  style={{
                    height: '40px',
                    borderRadius: '0 8px 8px 0',
                    borderColor: '#364290',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                  value={formData.teacher_id}
                  readOnly
                />
              </div>
            </div>

            {/* Email */}
            <div className="w-100">
              <h3 className="text-start" style={{ color: '#364290', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '16px' }}>
                E-mail
              </h3>
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: '#fff', borderColor: '#364290', borderRadius: '8px 0 0 8px' }}>
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  style={{
                    height: '40px',
                    borderRadius: '0 8px 8px 0',
                    borderColor: '#364290',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                  placeholder="Enter your E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="w-100">
              <h3 className="text-start" style={{ color: '#364290', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '16px' }}>
                Password
              </h3>
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: '#fff', borderColor: '#364290', borderRadius: '8px 0 0 8px' }}>
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  style={{
                    height: '40px',
                    borderRadius: '0 8px 8px 0',
                    borderColor: '#364290',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="w-100">
              <h3 className="text-start" style={{ color: '#364290', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '16px' }}>
                Retype Password
              </h3>
              <div className="input-group">
                <span className="input-group-text" style={{ backgroundColor: '#fff', borderColor: '#364290', borderRadius: '8px 0 0 8px' }}>
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  style={{
                    height: '40px',
                    borderRadius: '0 8px 8px 0',
                    borderColor: '#364290',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-flex flex-column align-items-center mt-1">
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: '#2d7ae5',
                  color: '#fff',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: '16px',
                  padding: '6px 60px',
                  borderRadius: '6px',
                }}
              >
                Sign up
              </button>
              <p
                className="text-center mt-3"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  color: '#364290',
                }}
              >
                Have an account?{' '}
                <a
                  href="/login"
                  style={{
                    color: '#2d7ae5',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeacherReg;
