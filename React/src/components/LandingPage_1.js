// import React, { useState } from "react";

// import { useNavigate } from "react-router-dom";
// import ChatBot from "./ChatBot";
// import SubmitComplaint from "./SubmitComplaint";
// import "./LandingPage.css";

// const LandingPage = () => {
//     const navigate = useNavigate();
//     const [chatOpen, setChatOpen] = useState(false);

//     return (
//         <div>
//             <header>
//                 <nav>
//                     <div className="logo">SupportHub</div>
//                     <ul>
//                         <li><a href="#home">Home</a></li>
//                         <li><a href="#features">Features</a></li>
//                         <li><a href="#faq">FAQ</a></li>
//                         <li><a href="#contact">Contact</a></li>
//                         <li>
//                             <button className="btn" onClick={() => navigate("/login")}>Login</button>
//                         </li>
//                         <li>
//                             <button className="btn" onClick={() => navigate("/signup")}>signup</button>
//                         </li>
//                     </ul>
//                 </nav>
//             </header>
            
//             <section id="home" className="hero">
//                 <h1>Need Help? We’re Here for You!</h1>
//                 <p>Get quick support, browse FAQs, or chat with our agents.</p>
//                 <button className="btn" onClick={() => navigate("/support")}>Get Support</button>
//             </section>
            
//             <section id="features" className="features">
//                 <h2>Our Features</h2>
//                 <div className="feature-list">
//                     <div className="feature">
//                         <h3>Live Chat</h3>
//                         <p>Instant support from our expert agents.</p>
//                     </div>
//                     <div className="feature">
//                         <h3>Ticketing System</h3>
//                         <p>Track and manage your support requests.</p>
//                     </div>
//                     <div className="feature">
//                         <h3>Knowledge Base</h3>
//                         <p>Find answers with our extensive FAQ section.</p>
//                     </div>
//                 </div>
//             </section>
            
//              {/* Chatbot Floating Button */}
//              <div className="chatbot-toggle" onClick={() => setChatOpen(!chatOpen)}>
//                 💬 Chat Support
//             </div>

//             {/* Chatbot Component */}
//             {chatOpen && <ChatBot onClose={() => setChatOpen(false)} />}

//             <footer>
//                 <p>&copy; 2025 SupportHub. All Rights Reserved.</p>
//             </footer>
//         </div>
//     );
// };

// export default LandingPage;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatBot from "./ChatBot";
import SubmitComplaint from "./SubmitComplaint";
import "./LandingPage.css";

const LandingPage = () => {
    const navigate = useNavigate();
    const [chatOpen, setChatOpen] = useState(false);
    const [showComplaintForm, setShowComplaintForm] = useState(false);

    

    return (
        <div>
            <header>
                <nav>
                    <div className="logo">SupportHub</div>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><button className="btn" onClick={() => navigate("/faq")}>FAQ</button></li>

                        <li><a href="#contact">Contact</a></li>
                        <li>
                            <button className="btn" onClick={() => navigate("/login")}>Login</button>
                        </li>
                        <li>
                            <button className="btn" onClick={() => navigate("/signup")}>Signup</button>
                        </li>
                    </ul>
                </nav>
            </header>
            
            <section id="home" className="hero">
                <h1>Need Help? We’re Here for You!</h1>
                <p>Get quick support, browse FAQs, or chat with our agents.</p>
                <button className="btn" onClick={() => navigate("/support")}>Get Support</button>
                <button className="btn complaint-btn" onClick={() => setShowComplaintForm(true)}>Submit Complaint</button>
            </section>

            {/* Submit Complaint Form (Appears when clicked) */}
            {showComplaintForm && (
                <div className="complaint-popup">
                    <SubmitComplaint onClose={() => setShowComplaintForm(false)} />
                </div>
            )}

            <section id="features" className="features">
                <h2>Our Features</h2>
                <div className="feature-list">
                    <div className="feature">
                        <h3>Live Chat</h3>
                        <p>Instant support from our expert agents.</p>
                    </div>
                    <div className="feature">
                        <h3>Ticketing System</h3>
                        <p>Track and manage your support requests.</p>
                    </div>
                    <div className="feature">
                        <h3>Knowledge Base</h3>
                        <p>Find answers with our extensive FAQ section.</p>
                    </div>
                    <div className="feature">
                        <h3>AI Chatbot</h3>
                        <p>Get 24/7 assistance from our AI-powered chatbot.</p>
                    </div>
                </div>
            </section>

            {/* <section id="testimonials" className="testimonials">
                <h2>What Our Users Say</h2>
                <div className="testimonial-list">
                    <div className="testimonial">
                        <p>“SupportHub resolved my issue in minutes! Amazing service.”</p>
                        <h4>- Alex Johnson</h4>
                    </div>
                    <div className="testimonial">
                        <p>“The live chat feature is a game-changer. Highly recommend!”</p>
                        <h4>- Sarah Williams</h4>
                    </div>
                    <div className="testimonial">
                        <p>“Easy to use and very responsive support team.”</p>
                        <h4>- Michael Brown</h4>
                    </div>
                </div>
            </section> */}

            {/* Chatbot Floating Button */}
            <div className="chatbot-toggle" onClick={() => setChatOpen(!chatOpen)}>
                💬 Chat Support
            </div>

            {/* Chatbot Component */}
            {chatOpen && <ChatBot onClose={() => setChatOpen(false)} />}

            <footer>
                <div className="footer-links">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                    <a href="#contact">Contact Us</a>
                </div>
                <p>&copy; 2025 SupportHub. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;


