import Contact from "./components/Contact";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Reviews from "./components/Reviews";

const App = () => {
  return (
    <div className="bg-fixed bg-linear-to-br from-[#161616] via-[#323232] to-[#0a0a0a]">
      <Header />

      <Hero />

      <Menu />

      <Reviews />

      <Contact />
    </div>
  );
};

export default App;
