import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import styles from './catalog-button.module.scss';
import { Products } from '../../../redux/interfaces/products';

interface CatalogProps {
  product?: Products;
  onClick?: (product: Products) => void;
}

export const CatalogButton: FC<CatalogProps> = ({
  product = null,
  onClick = () => {},
}) => {
  const [isActiveButton, setIsActiveButton] = useState<boolean>(false);

  const handleAddToCart = () => {
    if (product) {
      if (!isActiveButton) {
        setIsActiveButton(true);
      }
      onClick(product);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      className={styles.catalog__buttonItem}
      style={{ backgroundColor: isActiveButton ? '#66CDAA' : '#313237' }}
    >
      {isActiveButton ? 'Added to cart' : 'Add to cart'}
    </Button>
  );
};
