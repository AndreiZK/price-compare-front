import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Switch,
} from "@mui/material";

import {
  useLazyComparePricesQuery,
  useLazyListReviewsQuery,
} from "../redux/api";
import ReviewsSection from "../components/ReviewsSection";
import ItemCard from "../components/ItemCard";

import elemImg from "../assets/5element.png";
import alloImg from "../assets/allo.png";
import ttnImg from "../assets/ttn.png";

interface ItemObj {
  error: boolean;
  url: string;
  title: string;
  img: string;
  price: string;
}

const MainPage = () => {
  const [keyword, setKeyword] = useState("");
  const [productName, setProductName] = useState("");

  const [currency, setCurrency] = useState("BYN");

  const [getPrices, { data, isLoading, isError }] = useLazyComparePricesQuery();
  const [
    listReviews,
    { data: reviewData, isLoading: isReviewsLoading, isError: isReviewsError },
  ] = useLazyListReviewsQuery();

  const [isPriceLoading, setIsPriceLoading] = useState(false);

  const changeCurrency = () => {
    setCurrency(currency === "BYN" ? "USD" : "BYN");
  };

  const renderPrice = (priceObj: ItemObj) => {
    if (!priceObj.error && currency === "BYN") {
      return `${priceObj.price.replace("руб.", "").replace(" ", "")} руб`;
    } else if (!priceObj.error && currency === "USD") {
      const usdPriceString = priceObj.price
        .replace("руб", "")
        .replace(" ", "")
        .split(".")[0];
      const priceInUSD = Math.floor(Number(usdPriceString) / 3);
      return `${priceInUSD} USD`;
    } else {
      return null;
    }
  };

  const listReviewsFunc = () => {
    listReviews(keyword);
  };

  const handleSubmit = () => {
    setProductName(keyword);
    getPrices(keyword);
    listReviews(keyword);
    setIsPriceLoading(true);
  };

  useEffect(() => {
    if (data) setIsPriceLoading(!isPriceLoading);
  }, [data]);

  return (
    <Box px="5rem" mx="auto">
      <Stack my="5rem" alignItems="center">
        <Stack width="100%" direction="column">
          <TextField
            fullWidth
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            label="Введите название предмета"
            required
            InputProps={{
              endAdornment: <Button onClick={handleSubmit}>Search</Button>,
            }}
          />
          <Typography ml="0.7rem" mt="0.5rem" fontSize="0.8em">
            Для корректного поиска, пожалуйста вводите точное название предмета,
            который вы ищете!
          </Typography>
          <Stack my="1rem" direction="row" alignItems="center">
            BYN
            <Switch checked={currency === "USD"} onChange={changeCurrency} />
            USD
          </Stack>
        </Stack>
        {isPriceLoading && (
          <Stack mx="auto" mt="10rem" alignItems="center" gap="2rem">
            <CircularProgress />
            <Typography>
              Пожалуйста подождите, ваш запрос обрабатывается
            </Typography>
          </Stack>
        )}

        {data && !isPriceLoading && (
          <Stack
            mr="auto"
            gap="2rem"
            direction="row"
            justifyContent="space-around"
            width="100%"
            mt="5rem"
          >
            <ItemCard
              storeImg={elemImg}
              title={data.elem.title}
              img={data.elem.img}
              price={renderPrice(data.elem)}
              url={data.elem.url}
            />
            <ItemCard
              storeImg={alloImg}
              title={data.allo.title}
              img={data.allo.img}
              price={renderPrice(data.allo)}
              url={data.allo.url}
            />
            <ItemCard
              storeImg={ttnImg}
              title={data.ttn.title}
              img={data.ttn.img}
              price={renderPrice(data.ttn)}
              url={data.ttn.url}
            />
          </Stack>
        )}
        {isError && <Typography>An error occured</Typography>}
      </Stack>
      {data && !isPriceLoading && (
        <Box>
          <ReviewsSection
            listReviewsFunc={listReviewsFunc}
            reviews={reviewData}
            isLoading={isReviewsLoading}
            isError={isReviewsError}
            productName={productName}
          />
        </Box>
      )}
    </Box>
  );
};

export default MainPage;
