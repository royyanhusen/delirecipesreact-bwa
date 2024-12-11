import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "../components/CategoryCard";
import axios from "axios";
import { useEffect, useState } from "react"
import { Category } from "../types/type";
import { Link } from "react-router-dom";

export default function CategoryWrapper() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/categories', {
            headers: {
                'X-API-KEY':'F9D8865DCBF65E4B468BDE167DC4A'
            }
        })
            .then(response => {
                setCategories(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error loading data: {error}</div>
    }

    return (
        <section id="Categories" className="mt-[30px]">
            <div className="flex items-center justify-between px-5">
                <h2 className="font-bold">By Categories</h2>
            </div>
            <div className="swiper w-full mt-3">
                <Swiper
                    className="w-full mt-3"
                    direction='horizontal'
                    spaceBetween={16}
                    slidesPerView="auto"
                    slidesOffsetBefore={20}
                    slidesOffsetAfter={20}
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id} className="!w-fit pb-[30px]">
                            <Link to={`/category/${category.slug}`}>
                                <CategoryCard category={category} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}