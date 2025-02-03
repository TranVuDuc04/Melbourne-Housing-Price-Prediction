// src/pages/Checkout.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const location = useLocation();
  const { plan } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    accountNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, accountNumber, expiryDate, cvv } = formData;
    
    // Input validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    const accountPattern = /^\d{8,12}$/;
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvPattern = /^\d{3}$/;

    if (!name || !emailPattern.test(email) || !phonePattern.test(phone) || 
        !accountPattern.test(accountNumber) || !expiryPattern.test(expiryDate) || 
        !cvvPattern.test(cvv)) {
      alert("Please fill out all fields with valid information.");
      return;
    }

    setSuccessMessage("Checkout Successful");
  };

  return (
    <div className="checkout-container">
      <h1>Checkout - {plan ? plan.title : 'No Plan Selected'}</h1>
      {successMessage ? (
        <p>{successMessage}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10 digits"
              required
            />
          </label>
          <label>
            Account Number:
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="8-12 digits"
              required
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              required
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="3 digits"
              required
              maxLength="3"
            />
          </label>
          <button type="submit">Checkout</button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
