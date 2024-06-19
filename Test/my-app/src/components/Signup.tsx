import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [form, setForm] = useState({
    user_name: '',
    user_ID: '',
    user_pw: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/register', form);
      alert(response.data.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div id="signup_body">
          <div id="login_welcome">
            <div id="login_welcome-1">Lease Lens</div>
            <div id="login_welcome-2">Welcome to Lease Lens</div>
          </div>
          <div id="login_input">
            <div className="login_input_item">
              <input
                name="user_name"
                placeholder="name"
                type="text"
                value={form.user_name}
                onChange={handleChange}
              />
            </div>
            <div className="login_input_item">
              <input
                name="user_ID"
                placeholder="id"
                type="text"
                value={form.user_ID}
                onChange={handleChange}
              />
            </div>
            <div className="login_input_item">
              <input
                name="user_pw"
                placeholder="Password"
                type="password"
                value={form.user_pw}
                onChange={handleChange}
              />
            </div>
            <div className="login_input_item">
              <input
                name="confirmPassword"
                placeholder="Check Password"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div id="login_submit">
            <button id="login_submitBtn" type="submit">Sign Up</button>
          </div>
          <div id="login_to_signup">
            <a href="#">Login</a>
          </div>
        </div>
      </form>
    </div>
  );
}
