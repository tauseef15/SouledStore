import React from "react";
import Hero from "../components/hero";
import Fandom from "../components/fandom";
import TopTen from "../components/topTen";
import Slider from "../components/slider";
import Offers from "../components/offers";
import Categorized from "../components/Categorized";
import Footer from "../components/footer";
import { Helmet } from "react-helmet-async";
function Home() {
  return (
    <div className="full-body">
      <Helmet>
        <title>Sneaker Store</title>
        <meta
          name="description"
          content="Discover the latest sneaker trends, exclusive offers, and top picks of the week at Sneaker Store. Shop now for the best in footwear fashion!"
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <Offers />
      <Slider />
      <Categorized status="LatestCollection" title="latest collection" />
      <TopTen status="Top10" title="top 10 picks of the week" />
      <Categorized status="StylesInSpotLight" title="styles in spotlight" />
      <Fandom />
      <Categorized status="Sneakers" title="sneaker's den" />
    </div>
  );
}

export default Home;
