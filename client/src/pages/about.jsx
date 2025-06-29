import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Section = ({ title, content, id }) => (
  <div id={id} className="mt-5 md:mt-20 px-1 md:px-4 w-full text-center">
    <h1 className="font-bold text-2xl sm:text-4xl">{title}</h1>
    <p className="mt-2 md:mt-4 leading-relaxed text-[8px] sm:text-base">{content}</p>
  </div>
);

const Category = ({ title, image, path }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/collection/${path}`)}
      className="mt-0 md:mt-8 cursor-pointer hover:opacity-90 transition-all text-center w-full"
    >
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">{title}</h1>
      <img
        src={image}
        alt={title}
        className="mt-4 w-full rounded-lg object-cover"
      />
    </div>
  );
};

function About() {
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

      <div className="px-4 flex flex-col items-center">
        <Section
          id="about"
          title="ABOUT US"
          content={`For starters, it makes for a great pun on the word ‘sold’, since we ‘sell' stuff. Smart, right? But more importantly, The Souled Store was born out of the idea of loving what you do - “following your soul”. Our philosophy is that life is short. Don’t spend it doing something you don’t like. There are too many Monday mornings, and you can’t go dreading every single one of them.
We, at The Souled Store, love what we do- designs, products, marketing, and everything in between. Our goal is to give everyone something they'll love, something they can use to express themselves, and, simply put, something to put a smile on their face. So, whether it's superheroes, TV shows, pop culture, music, sports, or quirky, funny stuff you're looking for, we have something for everyone. Because each person is a special snowflake (whether or not they believe it), and they deserve only the most insane merchandise available out there! So, if you relate to the feeling, and believe in following one's heart (soul), hop along on this wonderful journey of ours, and help us spread the love!`}
        />

        <Section
          id="team"
          title="THE TEAM"
          content={`We’re a bunch of comic book loving, lame joke cracking, slightly weird but largely likeable people. We love what we do, and don’t take ourselves too seriously. This company was started by 4 people, with a cupboard full of clothes (probably the size of your wardrobe). We’ve now grown to over 150 people, and graduated from cupboards to warehouses, but really, that’s all that’s changed. We’re still childishly excited about everything we do - from the random post-it wall, to the unnecessary instructions outside the bathroom door, the board game sessions, and the pot-luck lunches.
And we try and ensure that this philosophy resonates with all those who come and join our family. So, if you’re bored of your current desk job and believe that ‘work’ does not necessarily have to be a bad word, look no further. We’d love to have you on our team!`}
        />

        <div id="categories" className="mt-6 md:mt-24 w-full px-2 md:px-4 text-center">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl mb-12">CATEGORIES</h1>
          <div className="flex flex-col gap-5 md:gap-10 items-center">
            <Category
              title="TOPWEAR"
              path="topwear"
              image="https://prod-img.thesouledstore.com/public/theSoul/uploads/themes/1950120250527231323.jpg?format=webp&w=1500&dpr=1.0"
            />
            <Category
              title="BOTTOMWEAR"
              path="bottomwear"
              image="https://prod-img.thesouledstore.com/public/theSoul/uploads/themes/4875920250528125540.jpg?format=webp&w=1500&dpr=1.0"
            />
            <Category
              title="FOOTWEAR"
              path="footwear"
              image="https://prod-img.thesouledstore.com/public/theSoul/uploads/themes/2904220250604235911.jpg?format=webp&w=1500&dpr=1.0"
            />
            <Category
              title="ACCESSORIES"
              path="accessories"
              image="https://prod-img.thesouledstore.com/public/theSoul/uploads/themes/8070820250517115927.jpg?format=webp&w=1500&dpr=1.0"
            />
          </div>
        </div>

        <Section
          id="track"
          title="TRACK ORDER"
          content={`Our Track Order feature gives you real-time updates on your purchase. Just enter your Order ID or Tracking Number, and you'll get a detailed view of your order’s journey — from the moment it’s packed, to when it’s handed over to the courier, all the way to your doorstep.
You’ll be able to see:
- Current order status (Processing, Packed, Shipped, Out for Delivery, Delivered)
- Expected delivery dates
- Shipping carrier details
- Tracking history with time-stamped updates

Whether you're ordering for yourself or sending a gift to someone special, we want the experience to be as smooth and transparent as possible.

Still have questions? Our support team is just a click away and always happy to help!`}
        />

        <Section
          id="return"
          title="RETURN ORDER"
          content={`We totally get it — sometimes things don’t work out. Maybe the size didn’t fit right, the color looked different than expected, or you just changed your mind. No worries — we’ve got your back!

Here’s what you can expect:
- Return window: Return your order within 7 days of delivery
- Product condition: Item should be unused, unwashed, and in original packaging with all tags intact
- Easy pickup: We’ll schedule a pickup from your doorstep (for serviceable locations)
- Refund/Replacement: Choose between a full refund or a replacement — whichever works best for you

To initiate a return, simply enter your Order ID and follow the prompts. You’ll receive updates every step of the way.`}
        />

        <Section
          id="cod"
          title="CASH ON DELIVERY"
          content={`Prefer to pay only when your order arrives? We totally get it!

- Safe & Secure: No need to share card or banking details — just pay in cash when your order arrives.
- Available on most products: COD is available across a wide range of items and locations.
- Check & Pay: Inspect your package, confirm your product — then pay. It’s that simple.

Note: Please keep the exact amount ready to ensure a smooth delivery experience. COD may not be available for high-value orders or certain pin codes.`}
        />
      </div>
    </div>
  );
}

export default About;
