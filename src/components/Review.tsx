import { Card, Stack, Typography, CardContent } from "@mui/material";
import { Review } from "./ReviewsSection";

interface ReviewItemProps {
  data: Review;
}

const ReviewItem = ({ data }: ReviewItemProps) => {
  return (
    <Card>
      <CardContent>
        <Stack px="1rem" gap="1rem">
          <Typography variant="h5" pb="0.5rem" borderBottom="1px solid gray">
            {data.authorName}
          </Typography>
          <Typography>{data.content}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
