import { useState, useEffect, useRef } from "react"
import  './Carousel.scss';

const images:Array<string> = [
    'https://caprifashion.co.uk/wp-content/uploads/2020/10/1.jpg',
    'https://cdn.shopify.com/s/files/1/1512/9714/files/Untitled-1_2000x.gif?v=1613555469',
    'https://i.shgcdn.com/cb91f75c-4084-442d-be37-6796660ecf61/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
    'https://caprifashion.co.uk/wp-content/uploads/2020/10/077A5789-Edit-2.jpg',
    'https://media.thebicestercollection.com/3z73vs69pqez/7mDGh5sitehYnZSCbN4A6s/1cc4a1c1a9f3d323817eaf613ca4bd62/BV_Landscape_1920x1080_DavidClulow_Lifestyle3_Jul22.jpg?w=1920&h=1080&fl=progressive&q=80&fm=jpg'
]

const delay = 4000;
// type TimeoutRef = NodeJS.Timeout | null;

function Carousel() {
  const [index,setIndex] = useState<number>(0);


  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%,0,0)` }}
      >
        {images.map((image, index) => (
          <img className="slide" key={index} src={image}></img>
        ))}
      </div>

      <div className="slideshowDots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Carousel