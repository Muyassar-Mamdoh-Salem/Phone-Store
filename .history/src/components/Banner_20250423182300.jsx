import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
    {
        title: 'أحدث الموبايلات بين إيديك',
        subtitle: 'استمتع بعروض حصرية على أحدث الأجهزة',
        img: '../../public/images/removebg-preview1.png',
    },
    {
        title: 'خصومات ضخمة لفترة محدودة',
        subtitle: 'لا تفوّت الفرصة واطلب الآن',
        img: '../../public/images/emovebg-preview3.png',
    },
    {
        title: 'أفضل الأسعار لأفضل العلامات التجارية',
        subtitle: 'آيفون، سامسونج، شاومي والمزيد',
        img: '../../public/images/removebg-preview3.png',
    },
];

const BannerSlider = () => {
    return (
        <div className="w-full mt-3">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="bg-[#80cbc4] shadow-lg"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative bg-[#80cbc4] text-white flex flex-col md:flex-row items-center justify-between p-6 md:p-12">
                            <div className="max-w-md ">
                                <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                                <p className="text-md md:text-lg mb-4">{slide.subtitle}</p>
                                {/* <button className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition">
                                    تسوّق الآن
                                </button> */}
                            </div>
                            <img
                                src={slide.img}
                                alt="Slide Image"
                                className="w-[100%] md:w-72 mt-4 md:mt-0 object-contain drop-shadow-xl"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannerSlider;

