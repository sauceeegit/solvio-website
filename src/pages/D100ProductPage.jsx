import PortableProductDetailPage from '../components/portable/PortableProductDetailPage';
import { defaultPortableProduct, portableProductModels } from '../data/d100';

export default function D100ProductPage() {
  return (
    <PortableProductDetailPage
      products={portableProductModels}
      defaultProduct={defaultPortableProduct}
      metaPath="/portable-system/d100"
    />
  );
}
