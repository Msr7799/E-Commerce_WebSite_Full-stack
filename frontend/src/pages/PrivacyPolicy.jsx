import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className='container mx-auto px-4 py-10'>
      <div className='max-w-3xl mx-auto text-black bg-white shadow-lg rounded-lg p-6'>
        <h1 className='text-3xl font-bold mb-4 text-center'>
          Privacy Policy
        </h1>
        <div>
          <h4>
            <strong>1. Introduction</strong>
            <br />
            At [Your Website Name], we are committed to protecting your privacy...
          </h4>
          <h4>
            <strong>2. Information We Collect</strong>
            <br />- Personal Information (e.g., name, email, phone number, shipping address)
            <br />- Payment Information (processed securely via third-party payment providers)
            <br />- Browsing Data (e.g., cookies, IP address, device information)
          </h4>
          <h4>
            <strong>3. How We Use Your Information</strong>
            <br />- To process and fulfill orders
            <br />- To improve our website and customer experience
            <br />- To send promotional emails (only if you opt-in)
            <br />- To comply with legal obligations
          </h4>
          <h4>
            <strong>4. Sharing of Information</strong>
            <br />
            We do not sell your personal data...
          </h4>
          <h4>
            <strong>5. Data Security</strong>
            <br />
            We implement security measures to protect your information...
          </h4>
          <h4>
            <strong>6. Cookies and Tracking Technologies</strong>
            <br />
            We use cookies to enhance your browsing experience...
          </h4>
          <h4>
            <strong>7. Your Rights</strong>
            <br />
            You have the right to access, modify, or delete your personal data...
          </h4>
          <h4>
            <strong>8. Third-Party Links</strong>
            <br />
            Our website may contain links to third-party websites...
          </h4>
          <h4>
            <strong>9. Changes to This Policy</strong>
            <br />
            We may update this Privacy Policy from time to time...
          </h4>
          <h4>
            <strong>10. Contact Us</strong>
            <br />
            For any questions regarding these policies, please contact us at [Your
            Contact Email].
          </h4>
          <div className='text-center mt-10'>
            <h5>© 2021 [Your Website Name]. All rights reserved.</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;