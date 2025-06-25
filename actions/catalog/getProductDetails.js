import { fetchApiClient } from '@/lib/oneentry';

export const getProductDetails = async (productId) => {
  const apiClient = await fetchApiClient();

  if (!productId) {
    throw new Error('Product ID is required.');
  }

  try {
    const product = await apiClient?.Products.getProductById(
      productId,
      'en_US'
    );
    return product;
  } catch (error) {
    throw new Error('Failed to fetch product.');
  }
};