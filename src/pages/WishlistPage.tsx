import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const WishlistPage: React.FC = () => {
  const { items, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    items.forEach(product => {
      if (product.inStock && product.sizes.length > 0) {
        addToCart(product, product.sizes[0]);
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-sky-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-rose-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-rose-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
          <p className="text-xl text-gray-600 mb-8">
            Start adding products you love to your wishlist and they'll appear here.
          </p>
          <Link
            to="/shop"
            className="bg-sky-300 text-slate-700 px-8 py-4 rounded-full font-semibold hover:bg-sky-400 transition-all duration-300 transform hover:scale-105 hover:rotate-1 inline-flex items-center space-x-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Start Shopping</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-rose-200 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:rotate-12 transition-transform duration-300">
            <Heart className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Wishlist</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {items.length} item{items.length !== 1 ? 's' : ''} you've saved for later
          </p>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-rose-600" />
              <span className="font-medium text-gray-900">
                {items.length} Product{items.length !== 1 ? 's' : ''} in Wishlist
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddAllToCart}
                className="bg-sky-300 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-sky-400 transition-all duration-300 transform hover:scale-105 hover:rotate-1 flex items-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add All to Cart</span>
              </button>
              <button
                onClick={clearWishlist}
                className="border-2 border-rose-300 text-rose-600 px-6 py-3 rounded-lg font-medium hover:bg-rose-50 transition-all duration-300 transform hover:scale-105 hover:-rotate-1"
              >
                Clear Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((product, index) => (
            <div 
              key={product.id} 
              className={`transform transition-all duration-300 hover:scale-105 ${
                index % 3 === 0 ? 'rotate-1' : index % 3 === 1 ? '-rotate-1' : 'rotate-0'
              }`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="bg-violet-300 text-slate-700 px-8 py-4 rounded-full font-semibold hover:bg-violet-400 transition-all duration-300 transform hover:scale-105 hover:rotate-1 inline-flex items-center space-x-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;