import React, { useState } from "react";
import Rodal from "rodal";
import { DeleteOutlined } from "@ant-design/icons";

import "rodal/lib/rodal.css";

export default function DeletePosts({ postId, deletePost }) {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    <>
      <div onClick={show}>
        <DeleteOutlined style={{ cursor: "pointer" }} />
      </div>

      <Rodal visible={visible} onClose={hide}>
        <div>Delete post?</div>
        <div className="delete-post-actions">
          <div onClick={deletePost}>Yes</div> <div onClick={hide}>Cancel</div>
        </div>
      </Rodal>
    </>
  );
}
