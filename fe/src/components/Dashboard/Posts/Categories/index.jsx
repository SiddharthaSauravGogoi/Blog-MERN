import React from "react";

export default function Categories({
  categories,
  setCategories,
  categoryList,
  pushToCategoryList,
  removeFromCategoryList,
}) {
  return (
    <div className="categories">
      <h2>Categories</h2>
      <input
        type="text"
        value={categories}
        onChange={(event) => setCategories(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? pushToCategoryList(event.target.value) : null
        }
      />
      {categoryList.length ? (
        <div className="categories-list">
          {categoryList.map((cat, index) => (
            <span className="categories-list__category" key={index}>
              {cat}
              <span
                onClick={(event) => removeFromCategoryList(cat)}
                style={{ color: "red", cursor: "pointer" }}
              >
                x
              </span>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
