import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    // console.log("total", total);
    let length = ratingsArray.length;
    // console.log("length", length);
    ratingsArray.map((r) => {
      return total.push(r.star);
    });
    let totalReduced = total.reduce((previous, next) => {
      return previous + next;
    }, 0); // previous + next, initial
    // console.log("totalReduce", totalReduced);

    let result = totalReduced / length;
    // console.log("result", result);
    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            editing={false}
            rating={result}
          />
          ({p.ratings.length})
        </span>
      </div>
    );
  }
};
