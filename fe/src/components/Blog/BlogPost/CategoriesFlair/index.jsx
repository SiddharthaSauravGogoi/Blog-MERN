import React from "react";

export default function CategoriesFlair({ category, color }) {
  return (
    <span className="categories-flair" style={{ backgroundColor: color }}>
      {category}
    </span>
  );
}
