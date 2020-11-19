import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeSlider from "../components/slider";
import CardBlock from "../components/card-block";
import { getProductsToHome } from "../redux/product/product-action";
import Loading from "../components/loading";
import Alert from "../components/alert";

const Home = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getProductsToHome());
   }, [dispatch]);
   const productState = useSelector(({ product }) => product);
   const { loading, productToHome, error } = productState;
   return (
      <div className='home_wrapper'>
         <HomeSlider />

         {loading ? (
            <Loading />
         ) : error ? (
            <Alert message={error} variant='danger' />
         ) : (
            <>
               <CardBlock list={productToHome.bestSeller} title='Best Seller' />
            </>
         )}
      </div>
   );
};

export default Home;
