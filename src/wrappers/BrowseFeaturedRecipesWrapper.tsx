import { Swiper, SwiperSlide } from "swiper/react";
import FeaturedRecipeCard from "../components/FeaturedRecipeCard";
import { useEffect, useState } from "react";
import { Recipe } from "../types/type";
import axios from "axios";

export default function BrowseFeaturedRecipesWrapper() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/recipes')
            .then(response => {
                setRecipes(response.data.data);
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

    return(
        <section id="MadeByPeople">
        <div className="flex items-center justify-between px-5">
            <h2 className="font-bold">Made by People</h2>
            <a
                href="#"
                className="font-semibold text-sm leading-[21px] text-[#FF4C1C]"
            >
                Explore All
            </a>
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
                {recipes.map((recipe) => (
                        <SwiperSlide key={recipe.id} className="swiper-slide !w-fit">
                           <FeaturedRecipeCard recipe={recipe} />
                       </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    </section>
    );
}