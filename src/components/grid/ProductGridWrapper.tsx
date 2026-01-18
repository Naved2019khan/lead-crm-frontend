import { getAgencySites } from '@/services/api/product-api';
import { ProductGrid } from './ProductGrid';

export const ProductGridWrapper = async () => {
  let agencySites;
  let error;
  try {
    agencySites = await getAgencySites().then((res) => res.list);
   
  } catch (e) {
    error = e.message;
  }

  if (error) return <div>{error}</div>;
  return (
    <ProductGrid sites={agencySites} />
  )
}