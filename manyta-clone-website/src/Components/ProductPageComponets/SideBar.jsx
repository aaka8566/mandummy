import React from "react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import styled from "styled-components";
import { BsFillStarFill } from "react-icons/bs";
import { extendTheme } from "@chakra-ui/react";
const MainLoco = styled.div`
  width: 17vw;
  height: 95vh;
  overflow-y: auto;
  margin-top: 5vh;
  position: fixed;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #333232;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #333232;
    border-radius: 10%;
    width: 8px;
  }
`;

const Main = styled.div`
  width: 100%;

  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  .Gender {
    padding: 2.5%;
  }

  .Categories {
    padding: 2.5%;
  }
  .Brand {
    padding: 2.5%;
  }
  .price {
    padding: 2.5%;
  }

  .discount {
    padding: 2.5%;
  }
`;

export const SideBar = ({ style}) => {
const [searchParams, setSearchParams] = useSearchParams();
const initialDiscountedPrice = searchParams.getAll("discountedPrice");
const initialq=searchParams.get("q");

  const [gender, setGender] = useState(searchParams.getAll("gender") || []);
  const [item, setItem] = useState(searchParams.getAll("itemType") || []);
  const [brand, setBrand] = useState(searchParams.getAll("brand") || []);
  const [rating, setRating] = useState(searchParams.getAll("rating_gte") || []);
  const [discount, setDiscount] = useState(searchParams.getAll("discount_gte") || []);
  const [price_gte,setpricegte]=useState(searchParams.getAll("price_gte")||[]);
  const [price_lte,setpricelte]=useState(searchParams.getAll("price_lte")||[]);



//Price Selection 
const handlechangeprice=(e)=>{
//console.log(e.target.value);
const a=e.target.value.split(",");
if(price_gte.includes(a[0])){
  let newprice_gte=price_gte.filter((el)=>(el!==a[0]))
let newprice_lte=price_lte.filter((el)=>(el!==a[1]))
setpricegte(newprice_gte);setpricelte(newprice_lte);
}
else{
  let newprice_gte=[...price_gte,a[0]];
  let newprice_lte=[...price_lte,a[1]];
  setpricegte(newprice_gte);setpricelte(newprice_lte);
}
}

//Price Selection












  //Gender selection
  const handleChangeGender = (e) => {
    //console.log(e.target.value);
    let newGender = [...gender];
    const value = e.target.value;
    if (newGender.includes(value)) {
      newGender = newGender.filter((el) => el !== e.target.value);
    } else {
      newGender.push(value);
    }
    //console.log("mew", newCategory);
    setGender(newGender);
    //console.log(category);
  };

  //Category selection
  const handleChangeCategory = (e) => {
    console.log(e.target.value);
    let newItemType = [...item];
    const value = e.target.value;
    if (newItemType.includes(value)) {
      newItemType = newItemType.filter((el) => el !== e.target.value);
    } else {
      newItemType.push(value);
    }
    //console.log("mew", newCategory);
    setItem(newItemType);
    //console.log(category);
  };

  //Brand selection
  const handleChangeBrand = (e) => {
    //console.log(e.target.value);
    let newBrand = [...brand];
    const value = e.target.value;
    if (newBrand.includes(value)) {
      newBrand = newBrand.filter((el) => el !== e.target.value);
    } else {
      newBrand.push(value);
    }
    //console.log("mew", newCategory);
    setBrand(newBrand);
    //console.log(category);
  };

  //rating selection
  const handleChangeRating = (e) => {
  //  console.log(e.target.value);
    let newRating = [...rating];
    const value = e.target.value;
    if (newRating.includes(value)) {
      newRating = newRating.filter(
        (el) => el !== e.target.value
      );
    } else {
      newRating.push(value);
    }
   // console.log("mew", newRating);
    setRating(newRating);
    //console.log(category);
  };

  //discount selection
  const handleChangeDiscount = (e) => {
    //console.log(e.target.value);
    let newDiscount = [...discount];
    const value = e.target.value;
    if (newDiscount.includes(value)) {
      newDiscount = newDiscount.filter((el) => el !== e.target.value);
    } else {
      newDiscount.push(value);
    }
    //console.log("mew", newCategory);
    setDiscount(newDiscount);
    // console.log("mew mew", discount);
  };

 React.useEffect(()=>{
  console.log("bbbbbbbbbbbbb");
    let params = {
      gender,
      itemType: item,
      brand: brand,
      rating_gte: rating,
      discount_gte: discount,
      _page: searchParams.get("_page")==="null"?1:searchParams.get("_page"),
      price_gte:price_gte,
      price_lte:price_lte,
    };
    params._page=1;
      if(searchParams.get("q")!==null){params["q"]=searchParams.get("q")}
      setSearchParams(params);
 },[gender.length, item.length, brand.length, rating.length, discount.length,price_gte.length,price_lte.length])

  const { value } = style;
  return (
    <MainLoco>
      <Main>
        <h3>
          <b>Filter by</b>
        </h3>
        <div className="Gender">
          <p>Gender</p>
          <Stack spacing={1} direction={["column"]}>
            <Checkbox
              size="sm"
              colorScheme="teal"
              onChange={handleChangeGender}
              value={"Men"}
              isChecked={gender.includes("Men")}
            >
              Men
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="pink"
              value={"Women"}
              onChange={(e) => handleChangeGender(e)}
              isChecked={gender.includes("Women")}
            >
              Women
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="red"
              value={"Kids"}
              onChange={(e) => handleChangeGender(e)}
              isChecked={gender.includes("Kids")}
            >
              Kids
            </Checkbox>
          </Stack>
        </div>
        <div className="Categories">
          <p>
            <b>Categories</b>
          </p>
          <Stack spacing={1} direction={["column"]}>
            <Checkbox
              size="sm"
              colorScheme="purple"
              value={"T-shirt"}
              onChange={handleChangeCategory}
              isChecked={item.includes("T-shirt")}
            >
              T-Shirts
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="purple"
              value={"Trouser"}
              onChange={handleChangeCategory}
              isChecked={item.includes("Trouser")}
            >
              Trousers
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="purple"
              value={"Shoes"}
              onChange={handleChangeCategory}
              isChecked={item.includes("Shoes")}
            >
              Shoes
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="purple"
              value={"Watch"}
              onChange={handleChangeCategory}
              isChecked={item.includes("Watch")}
            >
              Watches
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="purple"
              value={"Saree"}
              onChange={handleChangeCategory}
              isChecked={item.includes("Saree")}
            >
              Saree
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="purple"
              value={"WesternDresses"}
              onChange={handleChangeCategory}
              isChecked={item.includes("WesternDresses")}
            >
              Western Dress
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="purple"
              value={"Kurti"}
              onChange={handleChangeCategory}
              isChecked={item.includes("Kurti")}
            >
              Kurti
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="purple"
              value={"BedRunners"}
              onChange={handleChangeCategory}
              isChecked={item.includes("BedRunners")}
            >
              Bed Runners
            </Checkbox>
            <Button variant={"unstyled"} color={"purple.900"}>
              +13 More
            </Button>
          </Stack>
        </div>
        <div className="Brand">
          <p>
            <b>Brand</b>
          </p>
          <Stack spacing={1} direction={["column"]}>
            <Checkbox
              size="sm"
              colorScheme="orange"
              value={"Puma"}
              onChange={handleChangeBrand}
              isChecked={brand.includes("Puma")}
            >
              Puma
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="orange"
              value={"VASTRAMAY"}
              onChange={handleChangeBrand}
              isChecked={brand.includes("VASTRAMAY")}
            >
              VASTRAMAY
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="orange"
              value={"Louis Philippe"}
              onChange={handleChangeBrand}
              isChecked={brand.includes("Louis Philippe")}
            >
              Louis Philippe
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="orange"
              value={"Anouk"}
              onChange={handleChangeBrand}
              isChecked={brand.includes("Anouk")}
            >
              Anouk
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="orange"
              value={"Roadster"}
              onChange={handleChangeBrand}
              isChecked={brand.includes("Roadster")}
            >
              Roadster
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="orange"
              value={"Saree mall"}
              onChange={handleChangeBrand}
              isChecked={brand.includes("Saree mall")}
            >
              Saree mall
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="orange"
              value={"KALINI"}
              onChange={handleChangeBrand}
              isChecked={brand.includes("KALINI")}
            >
              KALINI
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="orange"
              value={"boAt"}
              onChange={handleChangeBrand}
              isChecked={brand.includes("boAt")}
            >
              boAt
            </Checkbox>
            <Button variant={"unstyled"} color={"orange.900"}>
              +20 More
            </Button>
          </Stack>
        </div>
        <div className="rating">
          <p>
            <b>Rating</b>
          </p>
          <Stack spacing={2} direction={["column"]}>
            <Checkbox
              size="sm"
              colorScheme="blackAlpha"
              value={4}
              onChange={handleChangeRating}
              isChecked={rating.includes("4")}
            >
              <Flex gap={1.5}>
                <BsFillStarFill color="salmon" />
                <BsFillStarFill color="salmon" />
                <BsFillStarFill color="salmon" />
                <BsFillStarFill color="salmon" />
              </Flex>
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="blackAlpha"
              value={3}
              onChange={handleChangeRating}
              isChecked={rating.includes("3")}
            >
              <Flex gap={1.5}>
                <BsFillStarFill color="salmon" />
                <BsFillStarFill color="salmon" />
                <BsFillStarFill color="salmon" />
              </Flex>
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="blackAlpha"
              value={2}
              onChange={handleChangeRating}
              isChecked={rating.includes("2")}
            >
              <Flex gap={1.5}>
                <BsFillStarFill color="salmon" />
                <BsFillStarFill color="salmon" />
              </Flex>
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="blackAlpha"
              value={1}
              onChange={handleChangeRating}
              isChecked={rating.includes("1")}
            >
              <Flex gap={1.5}>
                <BsFillStarFill color="salmon" />
              </Flex>
            </Checkbox>
            <Button variant={"unstyled"}>+2 More</Button>
          </Stack>
        </div>
        <div className="price">
          <p>
            <b>Price</b>
          </p>
          <Stack spacing={1} direction={["column"]}>
            <Checkbox size="sm" colorScheme="green" value={"200,2000"} onChange={handlechangeprice} isChecked={price_gte.includes("200")&&price_lte.includes("2000")}>
              Rs.200 - Rs.2000
            </Checkbox>
            <Checkbox size="sm" colorScheme="green"value={"2001,4500"} onChange={handlechangeprice} isChecked={price_gte.includes("2001")&&price_lte.includes("4500")}>
              Rs.2001 - Rs.4500
            </Checkbox>
            <Checkbox size="sm" colorScheme="green"value={"4501,8000"} onChange={handlechangeprice} isChecked={price_gte.includes("4501")&&price_lte.includes("8000")}>
              Rs.4501 - Rs.8000
            </Checkbox>
            <Button variant={"unstyled"} color={"green.900"}>
              +4 More
            </Button>
          </Stack>
        </div>
        <div className="discount">
          <p>
            <b>Discount</b>
          </p>
          <Stack spacing={1} direction={["column"]}>
            <Checkbox
              size="sm"
              colorScheme="blackAlpha"
              value={10}
              onChange={handleChangeDiscount}
              isChecked={discount.includes("10")}
            >
              10% and Above
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="red"
              value={20}
              onChange={handleChangeDiscount}
              isChecked={discount.includes("20")}
            >
              20% and Above
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="blackAlpha"
              value={30}
              onChange={handleChangeDiscount}
              isChecked={discount.includes("30")}
            >
              30% and Above
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="red"
              value={40}
              onChange={handleChangeDiscount}
              isChecked={discount.includes("40")}
            >
              40% and Above
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="blackAlpha"
              value={50}
              onChange={handleChangeDiscount}
              isChecked={discount.includes("50")}
            >
              50% and Above
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="red"
              value={60}
              onChange={handleChangeDiscount}
              isChecked={discount.includes("60")}
            >
              60% and Above
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="blackAlpha"
              value={"70"}
              onChange={handleChangeDiscount}
              isChecked={discount.includes("70")}
            >
              70% and Above
            </Checkbox>
            <Checkbox
              size="sm"
              colorScheme="red"
              value={80}
              onChange={handleChangeDiscount}
              isChecked={discount.includes(80)}
            >
              80% and Above
            </Checkbox>
            <Button variant={"unstyled"}>+3 More</Button>
          </Stack>
        </div>
      </Main>
    </MainLoco>
  );
};
