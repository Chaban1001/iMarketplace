import { FC, useEffect } from 'react';
import { CatalogPage } from '../CatalogPage/CatalogPage';
import styles from './FavoritePageStyles.module.scss';
import { Products } from '../../redux/interfaces/products';
import { Tablet } from '../../interfaces/tablets';
import {
  addToFavorites,
  addToFavoritesTablets,
  deleteFromFavoriteTablets,
  deleteFromFavorites,
} from '../../redux/slices/favoriteSlice';
import { useAppDispatch } from '../../hooks/reduxHooks/useAppDispatch';
import { useAppSelector } from '../../hooks/reduxHooks/useAppSelector';
import { PhoneItem } from '../../components/CatalogItem/PhoneItem';
import { TabletItem } from '../../components/TabletsUI/TabletItem/TabletItem';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../components/LanguageSwitcher/translation';

export const FavoritesPage: FC = () => {
  const dispatch = useAppDispatch();
  const { currentLanguage } = useLanguage();

  const favoritesCounter = useAppSelector(
    (state) => state.favorite.favoriteCounter
  );

  const favoriteProducts = useAppSelector((state) => state.favorite.favorites);

  const favoriteTablets = useAppSelector(
    (state) => state.favorite.favoritesTablets
  );

  useEffect(() => {
    document.title = `iMarketplace | ${translations[currentLanguage].favoriteLabel}`;
  }, [currentLanguage]);

  const handleAddToFavorites = (product: Products) => {
    dispatch(addToFavorites(product));
  };

  const handleAddToFavoritesTablets = (tablet: Tablet) => {
    dispatch(addToFavoritesTablets(tablet));
  };

  const handleDeleteFromFavorites = (phoneId: number) => {
    dispatch(deleteFromFavorites(phoneId));
  };

  const handleDeleteFromFavoritesTablets = (tabletId: string) => {
    dispatch(deleteFromFavoriteTablets(tabletId));
  };

  return (
    <>
      <CatalogPage
        mainTitle={translations[currentLanguage].favoriteLabel}
        smallTitle={translations[currentLanguage].favoriteLabel}
      />
      {favoritesCounter === 0 ? (
        ''
      ) : (
        <h4 className={styles.itemsCounter}>
          Products in favorites:{' '}
          <strong className={styles.counter__marker}>{favoritesCounter}</strong>
        </h4>
      )}
      <div>
        <br />
        {favoriteProducts.length === 0 && favoriteTablets.length === 0 ? (
          <h2 className={styles.empty__title}>
            {translations[currentLanguage].favoriteEmptyTitle}
          </h2>
        ) : (
          <div className={styles.favorite__list}>
            {favoriteProducts.map((favorite: Products) => (
              <div key={favorite.phoneId} className={styles.favorite__item}>
                <PhoneItem
                  imgUrl={favorite.imgUrl}
                  displaySize={favorite.displaySize}
                  capacity={`${favorite.capacity}`}
                  memory={favorite.memory}
                  title={favorite.title}
                  price={favorite.price}
                  phoneId={favorite.phoneId}
                  onAddToFavorites={() => handleAddToFavorites(favorite)}
                  onDeleteFromFavorites={() =>
                    handleDeleteFromFavorites(favorite.phoneId || 0)
                  }
                />
              </div>
            ))}
            {favoriteTablets.map((favorite: Tablet) => (
              <div key={favorite.id} className={styles.favorite__item}>
                <TabletItem
                  images={favorite.images}
                  name={favorite.name}
                  priceRegular={favorite.priceRegular}
                  id={favorite.id}
                  screen={favorite.screen}
                  capacity={favorite.capacity}
                  ram={favorite.ram}
                  onAddToFavorites={() => handleAddToFavoritesTablets(favorite)}
                  onDeleteFromFavorites={() =>
                    handleDeleteFromFavoritesTablets(favorite.id || '')
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
