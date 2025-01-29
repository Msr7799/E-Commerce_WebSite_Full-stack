import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";
import ImageModal from "../components/ImageModal";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const { addToCart } = useCartStore();
  const [isDarkMode, setIsDarkMode] = useState(false); // Add this line to define isDarkMode

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (productId) {
      const fetchRecommendations = async () => {
        try {
          const res = await axios.get(`/products/recommendations?category=${product.category}`);
          setRecommendations(res.data);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      };

      fetchRecommendations();
    }
  }, [productId]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  // use setDarkMode to change the value of isDarkMode
  const setDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };


  if (!productId) return <div>Loading...</div>;

  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='flex  flex-col lg:flex-row'>
        <div className='  backdrop-blur-3xl lg:w-1/2:pl-8'>
          <img
            src={product.image}
            alt={product.name}
            className='w-full h-auto cursor-pointer'
            onClick={() => handleImageClick(product.image)}
          />
          <div className='flex mt-4'>
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product image ${index + 1}`}
                className='w-40 h-40 object-cover cursor-pointer mr-2'
                onClick={() => handleImageClick(img)}
              />
            ))}
          </div>
        </div>
        <div className={` w-2/9  lg:pl-8 mt-5 relative bottom-6 mr-4 border-l-8 border-b-2 shadow-slate-500 shadow-2xl  flex flex-col justify-start backdrop-blur-lg border-t border-r-4  border-zinc-700  rounded-lg pl-3 backdrop-brightness-50 ${isDarkMode ? 'text-dark' : 'text-light' }`}>   
          <h1 className={`text-4xl font-bold mb-5 ml-36 pb-2 mt-16  mr-8 border-b-4 justify-center ${isDarkMode ? 'text-dark' : 'text-light' }`}>{product.name}</h1>
          {/* أجعل المقاس !important  ويتخطى index.css */}

          <button onClick={addToCart}  className={`text-2xl  ml-5 mb-3 relitave w-36 flex justify-center rounded-md  bg-zinc-500 border-zinc-500 ${isDarkMode ? ' text-dark ' : ' text-light' }` } >${product.price}</button>
          <h2 className='text-2xl font-bold mb-4'>{product.description}</h2>
          <div className='mb-4'>
            <h3 className='text-lg font-semibold mb-2'>Available Colors</h3>
            <div className='flex'>
              {product.colors?.map((color, index) => (
                <div
                  key={index}
                  className='w-full h-auto rounded-full mr-1'
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
          <div className='mb-4'>
            <h3 className='text-lg font-semibold mb-2'>Available Sizes</h3>
            <div className='flex'>
              {product.sizes?.map((size, index) => (
                <span key={index} className='border px-3 py-1 mr-2 mt-8'>{size}</span>
              ))}
            </div>
          </div>
          <button
            className='bg-red-950  absolute mt-96 right-2  text-white font-bold text-xl px-4 py-2 rounded hover:bg-gray-700 transition duration-1000 ease-in-out'
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className='mt-12 w-24 h-28'>
        <h2 className='text-2xl font-bold mb-4'>You may also like</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {recommendations.map((recProduct) => (
            <ProductCard key={recProduct._id} product={recProduct} />
          ))}
        </div>
      </div>
       <div className='fixed bottom-0 right-0 p-4 w-16 h-64'>
      <ImageModal imgSrc={selectedImage} show={showModal} handleClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default ProductPage;