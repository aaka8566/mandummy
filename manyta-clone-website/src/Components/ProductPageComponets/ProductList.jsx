import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/ProductReducer/Action";
import { ProductCard } from "./ProductCard";
import styled from "styled-components";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spinner,
} from "@chakra-ui/react";
import { CartModel } from "./CartModal";
import Pagination from "./ProductPagination";
const Main = styled.div`
  width: 75vw;
  height: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  margin-left: 18vw;
  gap: 1.4vw;
  transition: 0.5s ease;
  padding: 2%;
  overflow: hidden;
  box-sizing: border-box;

  .Hover {
    .Hover:hover {
      transform: scale(1.01);
      height: 65.8vh;
    }
  }
`;
export const ProductList = () => {
  const { products, isLoading, totalLength } = useSelector(
    (state) => state.ProductReducer
  );

  const { cart } = useSelector((state) => state.CartReducer);

  const dispatch = useDispatch();
  const [searchParams, setSeachParams] = useSearchParams();
  const location = useLocation();
  const [page, setPage] = useState(searchParams.get("_page")==="null"?1 : searchParams.get("_page"));
  const limitToshow = 16;
  const totalPages = Math.ceil(totalLength / limitToshow);
   const [pagechanged, setpagechanged] = useState(false);


  //pagination
  const handlePage = (pagee) => {
    setPage(pagee);
    setSeachParams({
      gender: searchParams.getAll("gender")||null,
      itemType: searchParams.getAll("itemType")||null,
      brand: searchParams.getAll("brand")||null,
      rating_gte: searchParams.getAll("rating_gte")||null,
      discount_gte: searchParams.getAll("discount_gte")||null,
      _page: pagee,
      price_gte:searchParams.getAll("price_gte")||null,
      price_lte:searchParams.getAll("price_lte")||null,
      q:!searchParams.get("q")?"":searchParams.get("q")
    });

    // console.log(searchParams.getAll("_page"));
    // console.log(searchParams.getAll("gender"));
  };
console.log(page,"listpage");
  useEffect(() => {
    //console.log(searchParams.get("q"),"para");
    let paramObj = {
      params: {
        gender: searchParams.getAll("gender"),
        itemType: searchParams.getAll("itemType"),
        brand: searchParams.getAll("brand"),
        rating_gte: searchParams.getAll("rating_gte"),
        discount_gte: searchParams.getAll("discount_gte"),
        _page: !searchParams.get("_page")?1:searchParams.get("_page"),
        _limit: 16,
        price_gte:searchParams.getAll("price_gte"),
        price_lte:searchParams.getAll("price_lte"),
        q:searchParams.get("q")
      },
    };
    //console.log(paramObj);
    dispatch(getProducts(paramObj));
  }, [location.search]);

useEffect(()=>{
  setPage(Number(searchParams.get("_page")));
},[searchParams.get("_page")])
  return (
    !isLoading && (
      <ProductDiv>
        <Main data-testid="product-list">
          {products.length > 0 &&
            products?.map((el) => {
              return (
                <div className="Hover" key={el.id}>
                  <ProductCard product={el} />
                  {/* <CartModel product={el} /> */}
                </div>
              );
            })}
        </Main>
        <PaginationWrapper>
        {products.length > 0&&page&&(
           <Pagination
           totalPages={totalPages}
           currentPage={page}
           handlePageChange={handlePage}
           
         />
        )
           
           }
         
        </PaginationWrapper>
        <img
          src="./extraFoot.jpg"
          alt="memo"
          style={{
            width: "100%",
            zIndex: "9",
            position: "absolute",
            marginRight: "30vw",
            marginLeft: "-10vh",
          }}
        ></img>
      </ProductDiv>
    )
  );
};
const ProductDiv = styled.div`
  display: block;
  margin: auto;
  overflow: hidden !important;
  padding: 1%;
`;

const PaginationWrapper = styled.div`
  width: 30vw;
  margin: auto;
  display: block;
  padding: 1%;
`;
