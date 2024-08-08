import React from "react";
import { Helmet } from "react-helmet-async";

const Metadata = ({
  title,
  description,
  author,
  keywords,
  thumbnail,
  url,
  type,
}) => {
  const defaultThumbnail = "https://example.com/default-thumbnail.jpg";
  const image = thumbnail || defaultThumbnail;

  return (
    <Helmet>
      <title>{title ? `${title} | CSTAD` : "CSTAD | Your Project's name"}</title>
      <meta name="title" content={title || "Your Project's name"} />
      <meta name="description" content={description || "Add default description here"} />
      <meta name="author" content={author} />
      <meta name="keywords" content={keywords || "Add default keywords here"} />
      <meta name="thumbnail" content={image} />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:type" content={type || "website"} />
      <meta property="og:title" content={title || "Your Project's name"} />
      <meta property="og:description" content={description || "Add default description here"} />
      <meta property="og:image" content={image} />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || "Your Project's name"} />
      <meta name="twitter:description" content={description || "Add default description here"} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default Metadata;
