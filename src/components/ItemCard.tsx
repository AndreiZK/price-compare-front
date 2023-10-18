import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Avatar,
} from "@mui/material";

import notFoundImg from "../assets/notfound.png";

interface CardItemProps {
  title: string | null;
  price: string | null;
  img: string | null;
  url: string | null;
  storeImg: string | null;
}

const ItemCard = ({ title, price, img, url, storeImg }: CardItemProps) => {
  const openLink = () => {
    url && window.open(url, "_blank");
  };

  return (
    <Card
      onClick={openLink}
      variant="outlined"
      sx={{
        borderRadius: "10px",
        width: "30%",
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      <CardHeader
        title={title ? title : ""}
        avatar={
          <Avatar>{storeImg && <img height="45px" src={storeImg} />}</Avatar>
        }
      />
      <CardMedia
        sx={{ objectFit: "contain" }}
        component="img"
        height="200"
        image={img ? img : notFoundImg}
      />
      <CardContent>
        <Typography fontWeight="bold" fontSize="2.2rem">
          {price ? price : "Не удалось найти данный товар"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
