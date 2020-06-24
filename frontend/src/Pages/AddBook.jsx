import React, { useState } from "react";
import Axios from "../Services/axios";
function Addbook() {
  const [image, setImage] = useState();

  const handleUpload = async (e) => {
    e.preventDefault();
    let bookimage = new FormData();
    bookimage.append("file", image);

    const response = await Axios.post("user/addbook", bookimage, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);
  };
  console.log("image", image);

  return (
    <div>
      <form>
        <input
          type="file"
          name="abc"
          id="abc"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button onClick={handleUpload}>Submit</button>
      </form>
    </div>
  );
}
export default Addbook;
