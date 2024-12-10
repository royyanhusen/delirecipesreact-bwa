import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Category } from "../types/type";
import { SwiperSlide } from "swiper/react";
import RecipeCardResult from "../components/RecipeCardResult";

export default function CategoryLatestFeaturedRecipes() {

    const { slug } = useParams<{ slug: string }>();
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/category/${slug}`)
            .then(response => {
                setCategory(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error loading data: {error}</div>
    }

    if (!category) {
        return <div>Category not found</div>
    }


    return (
        <section id="LatestRecipes" className="px-5 mt-[30px]">
            <div className="flex items-center justify-between">
                <h2 className="font-bold">Latest Recipes</h2>
            </div>
            <div className="flex flex-col gap-[18px] mt-[18px]">
                {
                    category.recipes.length > 0 ? (
                        category.recipes.map((recipe) => (
                            <SwiperSlide key={recipe.id} className="swiper-slide !w-fit">
                                <RecipeCardResult recipe={recipe} />
                            </SwiperSlide>
                        ))) : (<p>Belum ada data terkait</p>)
                }
            </div>
        </section>
    );
}