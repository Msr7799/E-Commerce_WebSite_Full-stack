import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className='container mx-auto px-4 py-10'>
      <div className='max-w-3xl mx-auto text-black bg-white shadow-lg rounded-lg p-6'>
        <h1 className='text-3xl font-bold mb-4 text-center'>
          Terms and Conditions
        </h1>
        <div>
          <h4>
            <strong>1. Introduction</strong>
            <br />
            Welcome to [Your Website Name]! These Terms and Conditions govern your
            use of our e-commerce website...
          </h4>
          <h4>
            <strong>2. Account Registration</strong>
            <br />
            To make purchases, you may need to create an account...
          </h4>
          <h4>
            <strong>3. Products and Pricing</strong>
            <br />
            We strive to provide accurate descriptions of products...
          </h4>
          <h4>
            <strong>4. Payment and Orders</strong>
            <br />
            By placing an order, you agree to provide valid payment details...
          </h4>
          <h4>
            <strong>5. Shipping and Delivery</strong>
            <br />
            Shipping times may vary depending on your location...
          </h4>
          <h4>
            <strong>6. Returns and Refunds</strong>
            <br />
            Our return and refund policy allows returns within [X] days...
          </h4>
          <h4>
            <strong>7. Limitation of Liability</strong>
            <br />
            We are not responsible for any indirect, incidental, or consequential
            damages...
          </h4>
          <h4>
            <strong>8. Governing Law</strong>
            <br />
            These Terms and Conditions are governed by the laws of [Your
            Country/State]...
          </h4>
          <h4>
            <strong>9. Changes to Terms</strong>
            <br />
            We reserve the right to update these Terms at any time...
          </h4>
          <div className='text-center mt-10'>
            <h5>© 2021 [Your Website Name]. All rights reserved.</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;