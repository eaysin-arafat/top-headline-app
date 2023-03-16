import React from "react";
import NewsItem from "./NewsItem";
import shortid from "shortid";

function NewsList({ news, category }) {
  if (!news) {
    return <h4>There is No News</h4>;
  }
  return (
    <div>
      <div className='card-header card text-center'>{category}</div>
      {news?.map((item) => (
        <NewsItem key={shortid.generate()} item={item} />
      ))}
    </div>
  );
}

export default NewsList;
