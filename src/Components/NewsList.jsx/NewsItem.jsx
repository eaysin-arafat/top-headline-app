import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function getDataString(dateTimeStr) {
  return new Date(dateTimeStr).toDateString();
}

const NewsItem = ({ item }) => {
  return (
    <div className='card text-center'>
      <div className='card-body'>
        <a
          href={item?.url}
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: "#424242", textDecoration: "none" }}
        >
          <h5 className='card-title'> {item.title} </h5>
        </a>

        <div>
          {item?.urlToImage && (
            <img
              src={item?.urlToImage}
              alt={item?.title}
              className='img-fluid'
              style={{ height: "250px", display: "inline-block" }}
            />
          )}
        </div>
        <a
          href={item?.url}
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: "#424242", textDecoration: "none" }}
        >
          <p className='card-text'>{item.content}</p>
        </a>
      </div>
      <div className='d-flex justify-content-between'>
        <div
          className='text-muted'
          style={{
            margin: "7px 0 5px 17px",
          }}
        >
          Published At {getDataString(item.publishedAt)}
        </div>
        <a href={item?.url} className='btn btn-primary btn-sm my-2 mx-1'>
          {item.source.name}
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
