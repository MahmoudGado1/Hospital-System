import Biography from "../components/Biography";
import Hero from "../components/Hero";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | ZeeCare Medical Institute"}
        imageUrl={"./about.png"}
      />
      <Biography imageUrl={"./whoweare.png"}/>
    </>
  );
};

export default AboutUs;
