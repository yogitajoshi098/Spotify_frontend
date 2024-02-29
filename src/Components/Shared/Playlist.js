import Card from '../Shared/Card'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import Card2 from './Card2';

const PlaylistView = ({ titleText, cardsData }) => {
    const [slidesPerView, setSlidesPerView] = useState(
        window.innerWidth >= 768 ? 4 : 2
    );

    useEffect(() => {
        const handleResize = () => {
            setSlidesPerView(window.innerWidth >= 768 ? 3 : 2);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="w-full mt-8">
            <div className="mb-5 text-2xl font-semibold text-white">{titleText}</div>
            <Swiper

                slidesPerView={slidesPerView}
                spaceBetween={50}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {cardsData.map((item, index) => {
                    return <SwiperSlide key={index}>
                        <Card2
                            item={item}
                        />
                    </SwiperSlide>
                }
                )}
            </Swiper>

        </div>
    );
};

export default PlaylistView