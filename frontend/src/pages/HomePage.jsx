import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import CustomCarousel from "../components/CustomCarousel";
import { Carousel, initMDB } from "mdb-ui-kit";

const categories = [
    { herf: "/mens", name: "Mens Clothes", imageUrl: "/men-clothes.png" },
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
];

const HomePage = ({ isDarkMode }) => {
    const { fetchFeaturedProducts, products, isLoading } = useProductStore();

    useEffect(() => {
        fetchFeaturedProducts();
        initMDB({ Carousel });
    }, [fetchFeaturedProducts]);

    return (
             <div className={`relative min-h-screen overflow-hidden ${isDarkMode ? 'text-light' : 'text-dark'} transition-colors duration-500`}>
                    <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                        <h1 className={`text-center text-5xl sm:text-6xl font-bold text-ellipsis mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            Explore Our NEW Collection
                        </h1>
                        <p className={`text-center text-xl font-bold mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            Discover the latest fashion trends in Our Category Collection
                        </p>
                <CustomCarousel />
                {/* جعل مسافه بين carousel و grid  */}
                <div className='h-10'></div>
                
                <h2 className='text-center text-3xl font-bold mb-4'>
                    Our Categories
                </h2>
                {/* div hero container size for header pic width:100% */}
                 <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {categories.map((category) => (
                        <CategoryItem category={category} key={category.name} />
                    ))}
                </div>

                {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
            </div>
        </div>
    );
};
export default HomePage;