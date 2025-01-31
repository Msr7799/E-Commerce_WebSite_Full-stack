import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import CustomCarousel from "../components/CustomCarousel";
import { Carousel, initMDB } from "mdb-ui-kit";

const categories = [
    { href: "/mens", name: "Mens Clothes", imageUrl: "/men-clothes.png" },
    { href: "/womens", name: "Womens Clothes", imageUrl: "/womens-clothes.png" },
    { href: "/kids", name: "Kids Clothes", imageUrl: "/kids-clothes.png" },
    { href: "/trousers", name: "trousers", imageUrl: "/trousers.png" },
    { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirt.avif" },
    { href: "/shoes", name: "Shoes", imageUrl: "/shoes.avif" },
    { href: "/bags", name: "Bags", imageUrl: "/bags.png" },
    { href: "/watches", name: "Watches", imageUrl: "/watches.png" },  
    { href: "/Perfume", name: "Perfume", imageUrl: "/Perfume.png" },
    { href: "/accessories", name: "Accessories", imageUrl: "/accessories.png" },
    { href: "/Electronics", name: "Electronics", imageUrl: "/electronics.png" },
    { href: "/home-decor", name: "Home Decor", imageUrl: "/home-decor.avif" },
    { href: "/admin-ad", name: "Admin Ad", imageUrl: "/Admin1.gif" },
    { href: "/admin-store", name: "Admin Store", imageUrl: "/Admin1.gif" },
];

const HomePage = ({ isDarkMode }) => {
    const { fetchFeaturedProducts, products, isLoading } = useProductStore();

    useEffect(() => {
        fetchFeaturedProducts();
        initMDB({ Carousel });
    }, [fetchFeaturedProducts]);

    return (
       <>   <div className={`static  min-h-screen pt-20 transition-colors duration-500 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                    <h1 className={`text-center  border-b-2 pb-16 text-5xl sm:text-6xl font-bold text-ellipsis mb-4 ${isDarkMode ? 'text-white border-b-white' : 'text-black border-b-black'}`}>
                        Explore Our NEW Collection
                    </h1>
                    <p className={`text-center text-xl font-bold mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        Discover the latest fashion trends in Our Category Collection
                    </p>
                    <CustomCarousel />

                    <div className='h-10 w-full text-center text-2xl mb-44 font-bold border-highlight pb-32 border-b-2 bg-primary-500 mx-auto my-8'>
                        <p>
                        Check out our new collection with stylish designs and unbeatable prices! Enjoy exclusive offers on the trendiest fashion pieces—shop now!
                        </p>
                    </div>

                    <h1 className='text-center border-b-2 font-extrabold pb-11 border-highlight backdrop-brightness-100 text-5xl mb-8'>
                        Our Categories
                    </h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition duration-1000 ease-in-out'>
                        {categories.map((category) => (
                            <CategoryItem category={category} key={category.name} />
                        ))}
                    </div>
                    {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
                </div>
            </div>
    </>
    );
};

export default HomePage;