import { FC, Dispatch, SetStateAction } from 'react';
import './select.scss';
import Select, { OnChangeValue } from 'react-select';
import { useState } from 'react';
import { IOption } from '../../interfaces/select-interface/select.interfaces';
import makeAnimated from 'react-select/animated';
import { Sort, getSortedProducts } from './Sort';
import { Phone } from '../../interfaces/phones';

interface CustomSelectProps {
  products: Phone[];
  setProducts: Dispatch<SetStateAction<Phone[]>>;
}

const options: IOption[] = [
  {
    label: 'Name',
    value: Sort.alphabet,
  },
  {
    label: 'Models',
    value: Sort.newest,
  },
  {
    label: 'Price',
    value: Sort.cheapest,
  },
];

const animatedComponents = makeAnimated();

const CustomSelect: FC<CustomSelectProps> = ({ products, setProducts }) => {
  const [currentSort, setCurrentSort] = useState<Sort[]>([]);

  const getValue = () => {
    return currentSort
      ? options.filter(
          (option) => currentSort.indexOf(option.value as Sort) >= 0
        )
      : [];
  };

  const onChange = (newValue: OnChangeValue<IOption, boolean>) => {
    const newSortValues = (newValue as IOption[]).map((v) => v.value as Sort);
    setCurrentSort(newSortValues);

    const sortedProducts = getSortedProducts(products, newSortValues[0]);
    setProducts(sortedProducts);
  };

  return (
    <div className='select'>
      <Select
        classNamePrefix='custom-select'
        value={getValue()}
        onChange={onChange}
        options={options}
        components={animatedComponents}
        isMulti
        placeholder='Choose an option'
      />
    </div>
  );
};

export default CustomSelect;
