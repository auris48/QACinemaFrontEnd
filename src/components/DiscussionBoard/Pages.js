import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Pages(props) {
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
      pages.push(
        <li key={i} style={{ color: "white" }}>
          <Link
            enabled={props.currentPage !== i}
            className={
              props.currentPage == i
                ? "paginated-links-list-link-active"
                : "paginated-links-list-link"
            }
            to={`/DiscussionBoard/page/${i}`}>
            {i}
          </Link>
        </li>
      );
    }

    return <ul className="paginated-links-list">{pages}</ul>;
  };

  return <div>{renderPages()}</div>;
}
