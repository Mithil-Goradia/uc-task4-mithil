import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '400px',
  width: '100%' // Adjust width for responsiveness
};

const slideImages = [
  {
    url: './shot1.png',
  },
  {
    url: './shot2.png',
  },
  {
    url: './shot3.png',
  },
];

const Slider = () => {
  return (
    <div className="slide-container rounded-lg">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div className='rounded-lg' style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slider;
