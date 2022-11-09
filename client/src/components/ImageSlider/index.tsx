import Slider from "react-slick";
import './slider.scss';
import './slider-theme.scss';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};  

type TImageSliderProps = {
  images: Array<string>;
}

const ImageSlider: React.FC<TImageSliderProps> = ({images}) => {

  return (
    <Slider {...settings}>
      {images.map(el => <div className='slider__item'><img src={el}/></div>)}
    </Slider>
  );
}
 
export default ImageSlider;
