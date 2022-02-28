
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Stack
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */


const Products = () => {
  const[products,setProducts] = useState([]);
  const[loading,setLoading]  = useState(true);
  const [searchKey,setSearchKey] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(setTimeout(() => {}, 500));
  const [serachValid,setSearchValid]  = useState(true)
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const searchHandleChange=(e)=>{
    debounceSearch(e,debounceTimeout)
  }
  const performAPICall = async () => {
    await axios.get(`${config.endpoint}/products`)
    .then((res,err)=>{
      //console.log(res.data)
      setProducts(res.data);
      setLoading(false)
    }).catch((err)=>{
    console.log(err);
    setSearchValid(false)
    })
  };
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    let url = `${config.endpoint}/products`
    if(text !== ""){
      url += `/search?value=${text}`;
    }
    await axios.get(url)
    .then((res,err)=>{
      //console.log(res.data)
      setProducts(res.data);
      setSearchValid(true)
      //setLoading(false)
    }).catch((err)=>{
      if(err.response !== undefined && err.response.status === 404){
        setProducts([])
      }
      setSearchValid(false)
    })
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (e, debounceTimeout) => {
    clearTimeout(debounceTimeout);
    setDebounceTimeout(
      setTimeout(() => {
        performSearch(e.target.value);
      }, 500)
    );
  };

   useEffect(()=>{
     
    performAPICall()
    
  },[]);

 

  let mountGrid = (<Grid container spacing={2}>
  {products.map((item) => {
    return (
      <Grid item xs={6} sm={6} md={3} key={item._id}>
        <ProductCard product={item}/>
      </Grid>
    );
  })}
</Grid>);

  let notFound = (
    <Box display="flex" justifyContent="center" alignItems="center">
          <Stack direction="row">
            No Products Found
            <SentimentDissatisfied />
          </Stack>
        </Box>
  )

  return (
    <div>
      <Header children={<TextField
        className="search-desktop"
        size="large"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={searchHandleChange}
      />}>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        
      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile "
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={searchHandleChange}
      />
       <Grid container>
         <Grid item className="product-grid">
           <Box className="hero" >
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
         </Grid>
      
         {loading?(
           <Box>
           <h6>Loading Products...</h6>
           <CircularProgress />
           </Box>
         ):(
           serachValid? mountGrid : notFound
         )}
       </Grid>
      <Footer />
    </div>
  );
};

export default Products;
