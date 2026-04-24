import Hero from "../components/home/Hero";
import Portfolio from "../components/home/Portfolio";
import Advisory from "../components/home/Advisory";
import Testimonials from "../components/home/Testimonials";
import DiscoveryQuestionnaire from "../components/home/DiscoveryQuestionnaire";

export default function Home() {
  return (
    <div>
      <Hero />
      <Advisory />
      <Portfolio />
      <Testimonials />
      <div id="discovery">
        <DiscoveryQuestionnaire />
      </div>
    </div>
  );
}
