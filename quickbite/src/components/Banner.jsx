import { useState, useEffect } from "react";

export default function Banner() {
  const images = [
    new URL("../assets/ban1.jpg", import.meta.url).href,
    new URL("../assets/ban2.jpg", import.meta.url).href,
    new URL("../assets/ban3.jpg", import.meta.url).href,
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="banner">
      <img src={images[index]} alt="banner" />
    </div>
  );
}
