import { FC } from 'react';
import styled from 'styled-components';
import cl from './modelsCatalog.module.scss';
import products from '../../common/products/products.json';
import { Phones } from '../Phones/Phones';
import { Phone } from '../../interfaces/phones';

const ModelsCatalogSection = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 30px;
  padding-right: 0px;
`;

interface IModelsCatalog {
  modelsTitle: string;
}

const ModelsCatalog: FC<IModelsCatalog> = ({ modelsTitle }): JSX.Element => {
  return (
    <ModelsCatalogSection>
      <div className={cl.modelsCatalog__block}>
        <h2 className={cl.catalog__title}>{modelsTitle}</h2>
        <h3
          className={`${cl.catalog__title} ${cl.zoomTitle}`}
          style={{ fontSize: '1.4rem' }}
        >
          Swipe to view the catalog
        </h3>
      </div>
      <div className={cl.catalog__cards}>
        <Phones products={products as unknown as Phone[]} />
      </div>
    </ModelsCatalogSection>
  );
};

export { ModelsCatalog };