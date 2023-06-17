import { heroData } from "@/data/HeroData";
import HeroSection from "./HeroSection";

const Overlay = () => {
  return (
    <>
      <div className="w-screen h-screen">
        <nav className="flex justify-end mr-36 mt-10">
          <h1 className="text-white">Fleava</h1>
        </nav>
        {heroData.map((hero, index) => {
          return (
            <HeroSection
              key={index}
              index={hero.index}
              title={hero.title}
              description={hero.description}
            />
          );
        })}
      </div>
    </>
  );
};

export default Overlay;
