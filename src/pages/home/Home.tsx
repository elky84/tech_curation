// Home.tsx
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <section className="slider-container">
        <Slider {...sliderSettings}>
          <div>
            <img src="./images/slide1.png" alt="Slide 1" />
          </div>
          <div>
            <img src="./images/slide2.png" alt="Slide 2" />
          </div>
          <div>
            <img src="./images/slide3.png" alt="Slide 3" />
          </div>
        </Slider>
      </section>

      <section>
        <h2>개발 관련 다양한 소식을 제공하는 큐레이션 사이트에 오신 것을 환영합니다</h2>
        <p>이 사이트는 다양한 개발 관련 자료를 제공합니다.</p>
      </section>
    </div>
  );
}

export default Home;
