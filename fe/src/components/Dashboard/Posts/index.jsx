import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { FormOutlined } from "@ant-design/icons";
import DeletePosts from "./DeletePosts";

export default function DashboardPosts({ post, deletePost }) {
  return (
    <Card className="dashboard__cards">
      <h3 className="dashboard__cards__title">
        {post.title}
        <div className="dashboard__cards__post-actions">
          <Link to={`/edit/${post._id}`}>
            <FormOutlined post={post} />
          </Link>
          <DeletePosts deletePost={deletePost} />
        </div>
      </h3>
      <p>{post.slug}</p>
    </Card>
  );
}
