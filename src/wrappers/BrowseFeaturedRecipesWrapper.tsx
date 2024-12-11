import { Swiper, SwiperSlide } from "swiper/react";
import FeaturedRecipeCard from "../components/FeaturedRecipeCard";
import { useEffect, useState } from "react";
import { Recipe } from "../types/type";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BrowseFeaturedRecipesWrapper() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/recipes', {
            headers: {
                'X-API-KEY':'F9D8865DCBF65E4B468BDE167DC4A'
            }
        })
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

    return (
        <section id="MadeByPeople">
            <div className="flex items-center justify-between px-5">
                <h2 className="font-bold">Made by People</h2>
                <div
                    className="font-semibold text-sm leading-[21px] text-[#FF4C1C]"
                >
                    Explore All
                </div>
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
                            <Link to={`/recipe/${recipe.slug}`}>
                                <FeaturedRecipeCard recipe={recipe} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}