// frontend/src/pages/Terms/Terms.jsx
import React from "react";
import "./Terms.css";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1>Terms and Conditions</h1>
        <p className="effective-date">Effective Date: [Date to be filled]</p>
      </div>

      <div className="terms-intro">
        <p>
          Welcome to Ghar Sathi. At Ghar Sathi, your privacy is extremely important to us. 
          This Privacy Policy explains how we collect, use, protect, and share your information 
          when you use our website or app. By accessing or using our services, you agree to the 
          following terms and conditions:
        </p>
      </div>

      <div className="terms-section">
        <h2>1. Updating Your Account Settings</h2>
        <p>
          You can update or change your personal information anytime by logging into your 
          Ghar Sathi account and accessing your "My Profile & Settings" section. If you wish 
          to delete any specific information posted by you (such as job requests or personal details), 
          you can do so manually. For removal of other posted content, please contact us at: 
          <strong> gharsathii@gmail.com</strong>.
        </p>
        <p>
          In some cases, we may not be able to fulfill your deletion request due to legal or 
          operational reasons, which we will inform you about if needed.
        </p>
      </div>

      <div className="terms-section">
        <h2>2. Closing Your Account</h2>
        <p>
          If you no longer wish to use Ghar Sathi services, you can directly close your account 
          through your profile settings.
        </p>
        <h3>Upon closing your account:</h3>
        <ul>
          <li>Your personal details will be removed from public view.</li>
          <li>We may delete your information, but we reserve the right to retain data for fraud prevention, analytics, legal obligations, or service continuity.</li>
          <li>Content shared with other users (such as chat messages or feedback) may still remain visible even after account closure.</li>
          <li>We are not responsible for how external platforms (like search engines) retain or show deleted content once it has been indexed.</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>3. Children's Privacy</h2>
        <div className="highlight-box">
          <p>
            Our platform is not intended for individuals under 18 years of age. 
            We do not knowingly collect personal information from children below this age.
          </p>
        </div>
      </div>

      <div className="terms-section">
        <h2>4. How We Protect Your Information</h2>
        <p>
          Ghar Sathi uses industry-standard security measures to protect your data, including:
        </p>
        <ul>
          <li>Encrypted data transmission</li>
          <li>Secure server access</li>
          <li>Firewalls and threat detection systems</li>
          <li>Password-protected user accounts</li>
        </ul>
        <p>
          Despite our efforts, no security system is 100% foolproof. By using our services, 
          you acknowledge and accept these risks.
        </p>
      </div>

      <div className="terms-section">
        <h2>5. Payments</h2>
        <ul>
          <li>All payments must be made through the methods provided by Ghar Sathi.</li>
          <li>Service charges may include a platform fee or commission as applicable.</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>6. Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy and Terms of Service as needed. Significant changes 
          will be notified via email or through a prominent notice on our website/app. Changes 
          will become effective within 30 days of notice.
        </p>
      </div>

      <div className="terms-section">
        <h2>7. User Conduct</h2>
        <ul>
          <li>Users must treat workers with respect and dignity.</li>
          <li>Any form of abuse, harassment, or discrimination will lead to account suspension.</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>8. Liability</h2>
        <p>
          Ghar Sathi acts as a service platform and is not liable for any accidental damages 
          or losses during the service. However, we will support you in resolving disputes 
          through proper communication channels.
        </p>
      </div>

      <div className="terms-section">
        <h2>9. Modifications</h2>
        <p>
          Ghar Sathi reserves the right to update these Terms and Conditions at any time. 
          Users will be notified of any major changes.
        </p>
      </div>

      <div className="contact-section">
        <h2>10. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <span>gharsathii@gmail.com</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <span>+91-8980567795</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">💬</span>
            <span>+91 96622 71481</span>
          </div>
        </div>
      </div>

      <div className="back-to-home">
        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Terms;