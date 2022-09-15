import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Pages() {
  const [listRef] = useAutoAnimate();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/Posts/num_pages/10`)
      .then((response) => response.json())
      .then((data) => {
        setTotalPages(Math.ceil(data));
      });
  }, []);

  const renderPages = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      return pages.push(
        <li key={i} style={{ color: "white" }}>
          <Link to={`/page/${i}`}>{i}</Link>
        </li>
      );
    }
    return <ul>{pages}</ul>;
  };

  return <div>{totalPages > 0 ? renderPages() : <li>Loading...</li>}</div>;
}
