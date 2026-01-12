import React from 'react';
import { Link } from 'react-router-dom';
import Primarybtn from '../Component/Primarybtn';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Terms and Conditions</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">Welcome to ContestHub. These terms and conditions outline the rules and regulations for the use of ContestHub's Website and Services.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Agreement to Terms</h2>
        <p className="text-gray-600 mb-4">By accessing this website and using our services, you fully understand and agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. License to Use</h2>
        <p className="text-gray-600 mb-4">Unless otherwise stated, ContestHub and/or its licensors own the intellectual property rights for all material on ContestHub. All intellectual property rights are reserved.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. User Accounts</h2>
        <p className="text-gray-600 mb-4">When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the security of your account and for all activities that occur under your account.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Content Submission</h2>
        <p className="text-gray-600 mb-4">By submitting content to our contests, you grant ContestHub a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content for the purpose of hosting and promoting the contest.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Prohibited Activities</h2>
        <p className="text-gray-600 mb-4">You are specifically restricted from all of the following:</p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>publishing any material that is defamatory, obscene, offensive, threatening, or illegal</li>
          <li>submitting content that violates any intellectual property rights</li>
          <li>engaging in any data mining or similar extraction activities</li>
          <li>using the service in any way that impacts user experience</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Limitation of Liability</h2>
        <p className="text-gray-600 mb-4">In no event shall ContestHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any loss, damage, or injury resulting from your access to, inability to access, or use of the service.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. Changes to Terms</h2>
        <p className="text-gray-600 mb-4">ContestHub reserves the right to modify these terms at any time. We will notify users of any changes through our website or via email. Continued use of the service after changes constitutes acceptance of the updated terms.</p>
        
        <div className="mt-12 text-center">
          <Link to="/">
            <Primarybtn>Back to Home</Primarybtn>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;