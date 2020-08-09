import axios from "axios";
import path from "path";

const addCommentForm = document.getElementById("jsAddComment");

const sendComment = async (comment) => {
  await axios({
    url: `/api/${path.basename}/comment`,
    method: "POST",
    data: { comment },
  });
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  console.log("efqwer", path.basename);
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
