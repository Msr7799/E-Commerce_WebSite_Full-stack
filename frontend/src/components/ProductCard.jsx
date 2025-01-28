import { useState } from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import ImageModal from "./ImageModal";
import { Link } from "react-router-dom"; // استيراد Link

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      addToCart(product);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-200 shadow-slate-300  backdrop-blur-2xl'>
        <Link to={`/product/${product._id}`}>
          <div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl backdrop-brightness-200 brightness-120'>
            <img
              className='object-cover w-full h-full border-spacing-3 border-3 border-cyan-50 shadow-rose-950  border-collapse cursor-pointer'
              src={product.image}
              alt='product image'
              onClick={() => handleImageClick(product.image)}
            />
            <div className='absolute inset-0 bg-opacity-20' />
          </div>
        </Link>

        <div className='mt-4 px-5 pb-5 backdrop-blur-sm'>
          <h5 className='text-xl font-semibold tracking-tight text-white'>{product.name}</h5>
          <div className='mt-2 mb-5 flex items-center justify-between'>
            <p>
              <span className='bg-gray-950 border border-zinc-900 text-white font-bold text-xl py-2 px-4 rounded-lg flex no-underline items-center transition duration-300 ease-in-out'>
                ${product.price}
              </span>
            </p>
          </div>
          <button
            className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
            onClick={handleAddToCart}
          >
            <ShoppingCart size={22} className='mr-2' />
            Add to cart
          </button>
        </div>
      </div>

      <ImageModal imgSrc={selectedImage} show={showModal} handleClose={handleCloseModal} />
    </>
  );
};

export default ProductCard;