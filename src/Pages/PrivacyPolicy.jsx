import React from 'react';
import { Link } from 'react-router-dom';
import Primarybtn from '../Component/Primarybtn';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">Your privacy is important to us. This Privacy Policy explains how ContestHub collects, uses, and protects your personal information when you use our services.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Information We Collect</h2>
        <p className="text-gray-600 mb-4">We collect information you provide directly to us when you:</p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Create an account or update your profile</li>
          <li>Participate in contests or submit content</li>
          <li>Contact customer support</li>
          <li>Interact with our services</li>
        </ul>
        <p className="text-gray-600 mb-6">The types of personal information we collect include: name, email address, profile picture, and any other information you choose to provide.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">How We Use Your Information</h2>
        <p className="text-gray-600 mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Send technical notices and support messages</li>
          <li>Respond to your comments and questions</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Monitor and analyze trends and usage</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Information Sharing and Disclosure</h2>
        <p className="text-gray-600 mb-4">We do not share, sell, or rent your personal information to third parties for commercial purposes. We may share your information in the following situations:</p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>With your consent</li>
          <li>To comply with legal obligations</li>
          <li>To protect and defend our rights and property</li>
          <li>To prevent fraud or abuse</li>
          <li>To provide services you have requested</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Data Security</h2>
        <p className="text-gray-600 mb-4">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Your Rights</h2>
        <p className="text-gray-600 mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Access to your personal information</li>
          <li>Correction of inaccurate personal information</li>
          <li>Deletion of your personal information</li>
          <li>Restriction of processing</li>
          <li>Data portability</li>
          <li>Withdrawal of consent</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Cookies and Tracking Technologies</h2>
        <p className="text-gray-600 mb-4">We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Children's Privacy</h2>
        <p className="text-gray-600 mb-4">Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Changes to This Policy</h2>
        <p className="text-gray-600 mb-4">We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website. Your continued use of the service after changes constitutes acceptance of the updated policy.</p>
        
        <div className="mt-12 text-center">
          <Link to="/">
            <Primarybtn>Back to Home</Primarybtn>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;