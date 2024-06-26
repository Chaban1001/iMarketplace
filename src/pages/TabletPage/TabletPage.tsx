import { FC, useState, useEffect } from 'react';
import styles from '../PhonesPage/PhonesPageStyles.module.scss';
import { ProductItem } from './ProductItem';
import products from '../../common/products/tablets.json';
import { Tablet } from '../../interfaces/tablets';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { TabletsCatalog } from '../../components/TabletsUI/Tablets/TabletsCatalog';

export const TabletPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedProduct, setSelectedProduct] = useState<Tablet | undefined>(
    undefined
  );

  useEffect(() => {
    const tabletProductName = id !== undefined ? id.replaceAll('-', ' ') : id;
    document.title = `iMarketplace | ${tabletProductName}`;
  }, [id]);

  useEffect(() => {
    const tablet = products.find((tablet) => tablet.id === id);
    setSelectedProduct(tablet as Tablet | undefined);
  }, [id]);

  return (
    <div className={`${styles.phone__layout} ${styles.tablet__layout}`}>
      {selectedProduct ? (
        <ProductItem tablet={selectedProduct} />
      ) : (
        <NotFoundPage statusText='404' message='This tablet is not found' />
      )}
      <TabletsCatalog modelsTitle="I'Pads" />
    </div>
  );
};

export default TabletPage;
