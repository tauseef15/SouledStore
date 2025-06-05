import React, { useEffect } from "react";
import "../css/contact.css"; // Assuming you have a CSS file for styling
import { Helmet } from "react-helmet-async";

const Section = ({ title, content, id }) => (
  <div id={id} style={{ marginTop: "5rem" }}>
    <h1 className="font-bold text-4xl text-center">{title}</h1>
    <p className="text-center mt-4 leading-relaxed w-full whitespace-pre-line">
      {content}
    </p>
  </div>
);

function Contact() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [window.location.hash]);

  return (
    <div
      style={{ marginTop: "55px", margin: "0 auto", height: "100%" }}
      className="flex flex-col items-center h-screen"
    >
            <Helmet>
              <title>Souled Store - Contact Us</title>
            </Helmet>
      <span
        style={{ fontSize: "12rem", marginTop: "5rem", color:" rgb(14, 13, 13)"  }}
        className="font-bold bg-gray-50 text-black w-full flex items-center justify-center"
      >
        SOULED STORE
      </span>

      <div
        style={{ width: "80%" }}
        className="flex flex-col items-center justify-center"
      >
        <Section
          id="contact"
          title="CONTACT US"
          content={`At The Souled Store, we believe in building lasting relationships with our customers — and that starts with open, honest communication. Whether you have a question about our products, need help with an order, want to share your feedback, or just want to connect with us, we’re always here to listen.
Our dedicated customer support team is committed to providing you with timely and personalized assistance. No matter how big or small your concern may be, we take it seriously and strive to resolve it as quickly as possible. From tracking your shipment, helping with returns or exchanges, to guiding you through our product catalog, consider us your personal shopping companions.
You can reach out to us anytime through multiple convenient channels — whether it’s via email, phone, live chat on our website, or through our social media pages. We understand that your time is valuable, so we make it easy for you to get the help you need, exactly when you need it.`}
        />

        <div
          className="input-wrapper flex justify-between"
          style={{ marginTop: "3rem", width: "50%" }}
        >
          <input
            type="text"
            name="text"
            className="input flex-grow"
            placeholder="Enter your email"
            style={{
              marginLeft: "0.5rem",
              padding: "0.5rem",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <button className="Subscribe-btn">Send</button>
        </div>

        <Section
          id="privacy"
          title="PRIVACY POLICY"
          content={`At The Souled Store, your privacy and trust are of utmost importance to us. We are committed to protecting your personal information and ensuring that your shopping experience is safe, secure, and transparent.
This Privacy Policy explains what information we collect, how we use it, and the measures we take to safeguard your data. Whether you’re browsing our website, placing an order, or subscribing to our newsletters, we want you to feel confident that your information is handled responsibly.
We collect only the necessary details required to process your orders, improve our services, and communicate with you effectively. This may include your name, contact information, shipping address, payment details, and browsing behavior on our site.
Rest assured, we do not sell or share your personal data with third parties for their marketing purposes. We use secure encryption technologies and follow industry best practices to protect your information from unauthorized access or disclosure.`}
        />
      </div>
    </div>
  );
}

export default Contact;
