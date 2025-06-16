import React from 'react';
import { useMutation } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useLocalStorage } from "../../hooks/UseLocalStorage";
import imagen from "../../assets/item_image.png";
import { useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';
import { clearUser } from '../../features/user/userSlice';
import ADD_ORDER from '../../graphql/mutations/addOrder.mutation';
import DISCOUNT_STOCK_BY_ORDER from '../../graphql/mutations/discountStockByOrder.mutation';
import {
    Box, Button, Card, CardContent, Typography, Grid, AppBar, Toolbar,
    Container, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, IconButton
} from '@mui/material';

const OrderSummary = ({ list }) => {
    const [updateStock] = useMutation(DISCOUNT_STOCK_BY_ORDER);
    const [addOrder] = useMutation(ADD_ORDER);
    const [userInfoStorage] = useLocalStorage('user_info', null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const executeMutations = async () => {
        const listConverted = list.map(e => ({ idUser: userInfoStorage.id, idProducts: e.id, quantity: e.quantity }));
        await addOrder({ variables: { orders: listConverted } });
        await updateStock({ variables: { orders: listConverted } });
        dispatch(clearCart());
        navigate('/final');
    };

    const totalItems = list.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = list.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
            <Typography variant="h6" gutterBottom>Shopping Cart Details</Typography>
            <Typography variant="body1"><b>Items: </b>{totalItems} units</Typography>
            <Typography variant="h5" sx={{ my: 2 }}><b>Total: </b>{`€ ${totalPrice.toFixed(2)}`}</Typography>
            <Button variant="contained" color="primary" onClick={executeMutations} fullWidth>
                Process Order
            </Button>
        </Paper>
    );
};

const ProductItemProcessing = ({ product }) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar src={imagen} alt={product.name} variant="square" sx={{ width: 80, height: 80, mr: 2 }} />
        </ListItemAvatar>
        <ListItemText
            primary={product.name}
            secondary={`Item No. ${product.id}`}
        />
    </ListItem>
);


const ProcessingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userInfoStorage, setUserInfoStorage] = useLocalStorage('user_info', null);
    const dispatch = useDispatch();

    const selectedItemsList = location.state.mylist || [];

    const closeSession = () => {
        dispatch(clearUser());
        dispatch(clearCart());
        setUserInfoStorage(null);
        navigate('/');
    };

    if (!userInfoStorage) {
        return (
            <Container>
                <Typography variant="h6" sx={{ mt: 4 }}>
                    You are not authorized. Please log in.
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
                    <IconButton color="inherit" onClick={closeSession}>
                        <FiLogOut size={24} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom>My Shopping Cart</Typography>
                        <Paper elevation={2}>
                            <List>
                                <ListItem sx={{ backgroundColor: 'grey.200' }}>
                                    <ListItemText primary="Product" sx={{ flexBasis: '50%' }} />
                                    <ListItemText primary="Price" sx={{ flexBasis: '20%', textAlign: 'center' }} />
                                    <ListItemText primary="Quantity" sx={{ flexBasis: '15%', textAlign: 'center' }} />
                                    <ListItemText primary="Total" sx={{ flexBasis: '15%', textAlign: 'right' }} />
                                </ListItem>
                                {selectedItemsList.map((product) => (
                                    <React.Fragment key={product.id}>
                                        <ListItem>
                                            <Box sx={{ flexBasis: '50%' }}>
                                                <ProductItemProcessing product={product} />
                                            </Box>
                                            <Typography sx={{ flexBasis: '20%', textAlign: 'center' }}>€{product.price.toFixed(2)}</Typography>
                                            <Typography sx={{ flexBasis: '15%', textAlign: 'center' }}>{product.quantity}</Typography>
                                            <Typography sx={{ flexBasis: '15%', textAlign: 'right' }}>€{(product.price * product.quantity).toFixed(2)}</Typography>
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <OrderSummary list={selectedItemsList} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ProcessingPage;