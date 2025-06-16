import React from 'react';
import useProductsViewModel from "../../viewModel/UseProductsViewModel";
import ProductsPage from './ProductsPage';

const ProductsContainer = () => {
    const viewModel = useProductsViewModel();

    return <ProductsPage {...viewModel} />;
};

export default ProductsContainer;