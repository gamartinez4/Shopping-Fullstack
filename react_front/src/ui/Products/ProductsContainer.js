import React from 'react';
import useProductsViewModel from '../../viewModel/useProductsViewModel'
import ProductsPage from './ProductsPage';

const ProductsContainer = () => {
    const viewModel = useProductsViewModel();

    return <ProductsPage {...viewModel} />;
};

export default ProductsContainer;