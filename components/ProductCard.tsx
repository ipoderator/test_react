'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/types';
import { useProductsStore } from '@/store/productsStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { toggleFavorite, deleteProduct, favorites } = useProductsStore();
  const isFavorite = favorites.includes(product.id);

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteProduct(product.id);
  };

  const truncatedDescription =
    product.description.length > 100
      ? product.description.substring(0, 100) + '...'
      : product.description;

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col h-full"
    >
      <div className="relative w-full h-64 bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-3">
          {truncatedDescription}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-blue-600">{product.price} ₽</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLikeClick}
              className={`p-2 rounded-full transition-colors ${
                isFavorite
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-400 hover:text-red-500'
              }`}
              aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
              title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={isFavorite ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              onClick={handleDeleteClick}
              className="p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Удалить товар"
              title="Удалить товар"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

