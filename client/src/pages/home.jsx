import React from "react";
import Fandom from "../components/fandom";
import TopTen from "../components/topTen";
import Slider from "../components/slider";
import Offers from "../components/offers";
import Categorized from "../components/categorized";
import Footer from "../components/footer";
function Home() {
  return (
    <div className="full-body">
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
