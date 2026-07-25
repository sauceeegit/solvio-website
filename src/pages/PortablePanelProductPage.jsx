import PortableProductDetailPage from '../components/portable/PortableProductDetailPage';
import { defaultPortablePanel, portablePanelModels } from '../data/portablePanels';

export default function PortablePanelProductPage() {
  return (
    <PortableProductDetailPage
      products={portablePanelModels}
      defaultProduct={defaultPortablePanel}
      metaPath="/portable-system/panel"
    />
  );
}
