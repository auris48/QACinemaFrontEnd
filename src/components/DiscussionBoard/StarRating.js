import React from "react";

const StarRating = ({ defaultValue, handleChange }) => {
  console.log(defaultValue);
  return (
    <>
      <div className="rating-container">
        <fieldset onChange={handleChange} className="rating-fieldset">
          <input
            defaultChecked={defaultValue === 5}
            type="radio"
            id="star5"
            name="rating"
            value="5"
          />
          <label htmlFor="star5" title="5 star">
            ★
          </label>
          <input
            defaultChecked={defaultValue === 4}
            type="radio"
            id="star4"
            name="rating"
            value="4"
          />
          <label htmlFor="star4" title="4 star">
            ★
          </label>
          <input
            defaultChecked={defaultValue === 3}
            type="radio"
            id="star3"
            name="rating"
            value="3"
          />
          <label htmlFor="star3" title="3 star">
            ★
          </label>
          <input
            defaultChecked={defaultValue === 2}
            type="radio"
            id="star2"
            name="rating"
            value="2"
          />
          <label htmlFor="star2" title="2 star">
            ★
          </label>
          <input
            defaultChecked={defaultValue === 1}
            type="radio"
            id="star1"
            name="rating"
            value="1"
          />
          <label htmlFor="star1" title="1 star">
            ★
          </label>
        </fieldset>
      </div>
    </>
  );
};

export default StarRating;
