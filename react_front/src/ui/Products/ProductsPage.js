import React, { useState } from 'react';
import { useLocalStorage } from '../../hooks/UseLocalStorage';
import { useNavigate } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart as addToCartAction, clearCart } from '../../features/cart/cartSlice';
import { clearUser } from '../../features/user/userSlice';
import {
    Box, Button, Card, CardContent, CardMedia, Typography,
    TextField, IconButton, Grid, AppBar, Toolbar, Pagination, Container
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import imagen from "../../assets/item_image.png"

const ProductItem = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(0);
    const [isAddedToCart, setIsAddedToCart] = useState(product.addedToCart);

    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        setQuantity(value > 10 ? 10 : (value < 0 ? 0 : value));
    };

    const addToCart = () => {
        onAddToCart(product, quantity);
        setIsAddedToCart(true);
        product.quantity = quantity;
        if (quantity !== 0) {
            product.isAddedToCart = true;
        }
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', opacity: isAddedToCart ? 0.6 : 1, transition: 'opacity 0.3s' }}>
                <CardMedia
                    component="img"
                    sx={{ height: 140 }}
                    image={imagen}
                    alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Item No. {product.id}
                    </Typography>
                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                        {product.stock} in stock
                    </Typography>
                    <Typography variant="h5" color="primary" sx={{ mt: 1 }}>
                        €{product.price.toFixed(2)}
                    </Typography>
                </CardContent>
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton onClick={() => setQuantity(q => Math.max(0, q - 1))} disabled={quantity === 0 || isAddedToCart}>
                            <RemoveIcon />
                        </IconButton>
                        <TextField
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            disabled={isAddedToCart}
                            inputProps={{ style: { textAlign: 'center' }, min: 0, max: 10 }}
                            sx={{ width: '60px' }}
                        />
                        <IconButton onClick={() => setQuantity(q => Math.min(10, q + 1))} disabled={quantity >= product.stock || quantity === 10 || isAddedToCart}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                    <Button variant="contained" onClick={addToCart} disabled={isAddedToCart || quantity === 0}>
                        Add to Cart
                    </Button>
                </Box>
            </Card>
        </Grid>
    );
};

const ProductsPage = ({ productsMatrix, terminateBuy }) => {
    const [page, setPage] = useState(1);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInfoStorage, setUserInfoStorage] = useLocalStorage('user_info', null);

    const productsList = productsMatrix.flat();

    const addToCart = (productToAdd, quantity) => {
        if (productToAdd.stock < quantity) {
            alert('Not enough stock available');
            return;
        }
        dispatch(addToCartAction({ product: productToAdd, quantity }));
        setCart(currentCart => {
            const existingProductIndex = currentCart.findIndex(item => item.id === productToAdd.id);
            if (existingProductIndex >= 0) {
                const newCart = [...currentCart];
                newCart[existingProductIndex].quantity += quantity;
                return newCart;
            } else {
                return [...currentCart, { ...productToAdd, quantity }];
            }
        });
    };

    const buyItems = () => {
        terminateBuy(productsList);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const closeSession = () => {
        dispatch(clearUser());
        dispatch(clearCart());
        setUserInfoStorage(null);
        navigate(-1);
    };

    const itemsPerPage = 5;
    const count = productsMatrix.length;
    const productsToShow = productsMatrix[page - 1] || [];

    if (!userInfoStorage) {
        return (
            <Container>
                <Typography variant="h6" sx={{ mt: 4 }}>
                    No tiene Token de autorizacion
                </Typography>
            </Container>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Hi {userInfoStorage.name}
                    </Typography>
                    <Button color="inherit" onClick={buyItems}>Buy</Button>
                    <IconButton color="inherit" onClick={closeSession}>
                        <FiLogOut size={24} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container sx={{ py: 4 }}>
                <Grid container spacing={4}>
                    {productsToShow.map(product => (
                        <ProductItem key={product.id} product={product} onAddToCart={addToCart} />
                    ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={count}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default ProductsPage;