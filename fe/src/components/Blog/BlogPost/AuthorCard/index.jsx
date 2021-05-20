import React from "react";

export default function Author({ author }) {
  return (
    <div className="author-card">
      <h2> Author </h2>
      <h3>{author ? author.name : null}</h3>
      <p>Joined: {author ? author.joined.substring(0, 10) : null}</p>
    </div>
  );
}
