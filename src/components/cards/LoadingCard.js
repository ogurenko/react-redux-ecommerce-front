import React from "react";
import { Card } from "antd";
import SkeletonCard from "../../skeletons/SkeletonCard";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card key={i} className="col-md-4">
          <SkeletonCard theme="light" />
        </Card>
      );
    }
    return totalCards;
  };
  return <div className="row pb-5">{cards()}</div>;
};

export default LoadingCard;
