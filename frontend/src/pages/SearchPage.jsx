import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductStore } from '../stores/useProductStore';
import ProductCard from '../components/ProductCard';

const SearchPage = ({ isDarkMode }) => {
    const { query } = useParams();
    const { useSearchProducts } = useProductStore();
    const { data: products, isLoading } = useSearchProducts(query);

    return (
        <div className={`min-h-screen pt-20 mt-24 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                <h1 className={`text-center text-5xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    Search Results for "{query}"
                </h1>
                {isLoading ? (
                    <p className='text-center'>Loading...</p>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {products?.length > 0 ? (
                            products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        ) : (
                            <p className='text-center col-span-3'>No products found</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;