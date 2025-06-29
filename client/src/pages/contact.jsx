import React, { useEffect } from "react";
import "../css/contact.css";

const Section = ({ title, content, id }) => (
  <div id={id} className="mt-5 md:mt-20 px-1 md:px-4 w-full text-center">
    <h1 className="font-bold text-2xl sm:text-4xl">{title}</h1>
    <p className="mt-2 md:mt-4 leading-relaxed text-[8px] sm:text-base whitespace-pre-line max-w-screen-xl mx-auto">
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
    <div className="flex flex-col items-center min-h-screen w-full">
      <span className="text-2xl sm:text-4xl md:text-8xl lg:text-[12rem] font-bold text-gray-900 mt-20 text-center w-full bg-gray-50 py-2 md:py-4 lg:py-6">
        SOULED STORE
      </span>

      <div className="px-4 flex flex-col items-center w-full">
        <Section
          id="contact"
          title="CONTACT US"
          content={`At The Souled Store, we believe in building lasting relationships with our customers — and that starts with open, honest communication. Whether you have a question about our products, need help with an order, want to share your feedback, or just want to connect with us, we’re always here to listen.
Our dedicated customer support team is committed to providing you with timely and personalized assistance. No matter how big or small your concern may be, we take it seriously and strive to resolve it as quickly as possible. From tracking your shipment, helping with returns or exchanges, to guiding you through our product catalog, consider us your personal shopping companions.
You can reach out to us anytime through multiple convenient channels — whether it’s via email, phone, live chat on our website, or through our social media pages. We understand that your time is valuable, so we make it easy for you to get the help you need, exactly when you need it.`}
        />

        <div className="w-full max-w-xl mt-8 px-4 flex items-center justify-center">
          <div className="w-full flex border border-gray-300 rounded overflow-hidden">
            <input
              type="text"
              name="text"
              className="flex-grow px-4 py-2 text-sm sm:text-base outline-none"
              placeholder="Enter your email"
            />
            <button className="px-4 sm:px-6 bg-black text-white text-sm sm:text-base font-semibold">
              Send
            </button>
          </div>
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
