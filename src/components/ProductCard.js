import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
//  console.log(product)
  return (
    <Card className="card">
      <CardMedia
        component="img"
        
        image={product.image}
        alt="acas"
      />
      <CardContent>
        <Typography variant="h4">
          {product.name}
        </Typography>
        <Typography variant="h5" >
          ${product.cost}
        </Typography>
        <Rating  value={product.rating} readOnly />
      </CardContent>
      <CardActions className="card-actions">
        <Button variant="contained" fullWidth className="card-button" onClick={handleAddToCart}>ADD TO CART</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
