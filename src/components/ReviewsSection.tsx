import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import ReviewItem from "./Review";
import { useAddReviewMutation } from "../redux/api";
import { RootState } from "../redux/rootReducer";

export interface Review {
  id: string;
  authorName: string;
  content: string;
}

interface ReviewsSectionProps {
  reviews: Review[] | null;
  isLoading: boolean;
  isError: boolean;
  productName: string;
  listReviewsFunc: () => void;
}

const ReviewsSection = ({
  reviews,
  isLoading,
  isError,
  productName,
  listReviewsFunc,
}: ReviewsSectionProps) => {
  const [reviewText, setReviewText] = useState("");

  const userData = useSelector((state: RootState) => state.user);
  const user = userData.user;

  const [addReview] = useAddReviewMutation();

  const handleSubmit = () => {
    if (user.id)
      addReview({ authorId: user.id, content: reviewText, productName });
    listReviewsFunc();
    setReviewText("");
  };

  return (
    <Box
      mx="auto"
      width="80%"
      border="2px solid gray"
      p="1.5rem"
      pb="0.5rem"
      borderRadius="10px"
      mb="2rem"
    >
      {reviews && (
        <Stack>
          <Stack px="1rem" direction="row" justifyContent="space-between">
            <Typography mb="2rem" variant="h4">
              Отзывы
            </Typography>
            {reviews.length > 0 ? (
              <Typography>Количество: {reviews.length}</Typography>
            ) : (
              <Typography>У этого товара пока нет отзывов</Typography>
            )}
          </Stack>
          {reviews.length > 0 && (
            <Stack gap="0.5rem">
              {reviews.map((review) => (
                <ReviewItem data={review} />
              ))}
            </Stack>
          )}
          {userData.isAuth && (
            <Stack my="2rem" direction="row">
              <TextField
                fullWidth
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={handleSubmit}>Отправить отзыв</Button>
            </Stack>
          )}
        </Stack>
      )}
      {isLoading && <LinearProgress />}
      {isError && "При загрузке отзывов произошла ошибка"}
    </Box>
  );
};

export default ReviewsSection;
