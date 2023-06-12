import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withMinio } from '~/utils/withStatic';
import StyledBreadcrumb from '../components/CardBreadcrumbs';


interface CartItem {
  _id: number;
  uuid: number;
  name: string;
  price: number;
  amount: number;
  photo: string;
}

const CartDetails: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  const removeItem = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleEdit = (index: number) => {
    navigate(`/product/${cartItems[index].uuid}`);
  };

  const handleRequestQuote = () => {
    // Xử lý sự kiện yêu cầu báo giá
    //Xóa localstorage etc
  };

  return (
    <Box minHeight="80vh" display="flex" flexDirection="column">
      <StyledBreadcrumb />

      <Box flex={1} component={Paper} mt={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ảnh</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <img src={withMinio(item.photo)} alt={item.name} style={{ width: '50px', height: 'auto' }} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography variant="body2">Giá: {item.price}</Typography>
                  </TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => removeItem(index)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Button variant="contained" color="primary" onClick={handleRequestQuote} style={{ marginTop: '30px', marginBottom: '30px' }}>
        Yêu cầu báo giá
      </Button>
    </Box>
  );
};

export default CartDetails;
