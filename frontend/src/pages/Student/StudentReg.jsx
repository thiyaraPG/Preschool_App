import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import GroupBG from '../../assets/GroupBG.png';
import StudentRegImg from './Images/StudentReg.png';

function StudentReg() {
    const [formData, setFormData] = useState({
        name: '',
        parent_name: '',
        contact_number: '',
        email: '',
    });

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

        // Basic Validations
        if (!formData.name || !formData.parent_name || !formData.contact_number || !formData.email) {
            showToast('warning', 'All required fields must be filled!');
            return;
        }

        if (formData.contact_number.length < 10) {
            showToast('warning', 'Contact number must be at least 10 digits');
            return;
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            showToast('warning', 'Please enter a valid email');
            return;
        }

        try {
            await axios.post('http://127.0.0.1:5000/students', formData);
            showToast('success', 'Student registered successfully!');
            setFormData({ name: '', parent_name: '', contact_number: '', email: '' });
        } catch (err) {
            showToast('error', err.response?.data?.error || 'Something went wrong!');
        }
    };

    return (
        <div className="d-flex vh-100 w-100">
            {/* Left Section */}
            <div className="d-flex" style={{ backgroundColor: '#364290', width: '30%' }}>
                <div className="d-flex flex-column justify-content-between text-center w-100 h-100 pt-5">
                    <div>
                        <h1 className="text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Let’s Register</h1>
                        <h1 className="text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>A Student!</h1>
                    </div>
                    <div className="d-flex justify-content-center position-relative">
                        <img src={StudentRegImg} alt="Bottom Logo" style={{ width: '120%', maxWidth: 'none', transform: 'translateX(9%)' }} />
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex-grow-1 d-flex" style={{ backgroundColor: '#CFDFFF', backgroundImage: `url(${GroupBG})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="d-flex flex-column text-center h-100 w-100">
                    <div className="d-flex flex-column" style={{ padding: '60px 60px 60px 60px' }}>
                        <div style={{ color: '#364290', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '26px' }}>New Student Registration!</div>
                        <div className="mt-1" style={{ color: '#364290', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '24px' }}>Please fill out the form below to get started</div>
                    </div>

                    <form className="d-flex flex-column gap-4 justify-content-start" style={{ width: '50%', margin: '0 auto' }} onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="w-100">
                            <h3 className="text-start" style={{ color: '#364290', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '16px' }}>Student Name *</h3>
                            <input type="text" name="name" className="form-control" placeholder="Enter full name" style={{ height: '40px', borderRadius: '8px', borderColor: '#364290', fontFamily: 'Poppins, sans-serif' }} value={formData.name} onChange={handleChange} required />
                        </div>

                        {/* Email */}
                        <div className="w-100">
                            <h3 className="text-start" style={{ color: '#364290', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '16px' }}>Email *</h3>
                            <input type="email" name="email" className="form-control" placeholder="Enter email" style={{ height: '40px', borderRadius: '8px', borderColor: '#364290', fontFamily: 'Poppins, sans-serif' }} value={formData.email} onChange={handleChange} />
                        </div>

                        {/* Parent Name */}
                        <div className="w-100">
                            <h3 className="text-start" style={{ color: '#364290', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '16px' }}>Parent Name *</h3>
                            <input type="text" name="parent_name" className="form-control" placeholder="Enter parent name" style={{ height: '40px', borderRadius: '8px', borderColor: '#364290', fontFamily: 'Poppins, sans-serif' }} value={formData.parent_name} onChange={handleChange} required />
                        </div>

                        {/* Contact Number */}
                        <div className="w-100">
                            <h3 className="text-start" style={{ color: '#364290', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '16px' }}>Contact Number *</h3>
                            <input type="text" name="contact_number" className="form-control" placeholder="Enter contact number" style={{ height: '40px', borderRadius: '8px', borderColor: '#364290', fontFamily: 'Poppins, sans-serif' }} value={formData.contact_number} onChange={handleChange} required />
                        </div>



                        {/* Submit Button */}
                        <div className="d-flex flex-column align-items-center mt-1">
                            <button type="submit" className="btn" style={{ backgroundColor: '#2d7ae5', color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '16px', padding: '6px 60px', borderRadius: '6px' }}>Register</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StudentReg;
