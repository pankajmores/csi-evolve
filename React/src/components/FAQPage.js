import React from "react";
import { useNavigate } from "react-router-dom";
import "./FAQPage.css"; // Optional styling

const FAQPage = () => {
    const navigate = useNavigate();

    return (
        <div className="faq-container">
            <header>
                <button className="back-btn" onClick={() => navigate("/")}>⬅ Back to Home</button>
                <h1>Frequently Asked Questions</h1>
            </header>

            <div className="faq-content">
                <div className="faq-item">
                    <h3>❓ How do I submit a complaint?</h3>
                    <p>Click on "Submit Complaint" and fill in the required details.</p>
                </div>
                <div className="faq-item">
                    <h3>❓ How can I track my complaint?</h3>
                    <p>Use the "Track Complaint" feature in your dashboard.</p>
                </div>
                <div className="faq-item">
                    <h3>❓ What happens after I submit a complaint?</h3>
                    <p>Our support team will review it and respond within 24 hours.</p>
                </div>
                <div className="faq-item">
                    <h3>❓ Can I edit my complaint after submitting?</h3>
                    <p>No, but you can contact support to update details.</p>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
