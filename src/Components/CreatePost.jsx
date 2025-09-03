import { Button, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { createPostApi, updatePostApi } from "../Services/PostsApi";

export default function CreatePost({ callback, setIsUpdating, isUpdating, post }) {
  const [postBody, setPostBody] = useState(post?.body ?? "");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(post?.image ?? "");
  const [loading, setLoading] = useState(false);

  async function urlToFile() {
    if (!post?.image) return;
    const response = await fetch(post.image);
    const data = await response.blob();
    let file = new File([data], "image", { type: data.type || "image/jpg" });
    setImage(file);
  }

  useEffect(() => {
    if (post) urlToFile();
  }, [post]);

  async function createPost(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (postBody) formData.append("body", postBody);
    if (image) formData.append("image", image);

    let response;
    if (isUpdating) {
      response = await updatePostApi(post.id, formData);
      setIsUpdating(false);
      await callback();
    } else {
      response = await createPostApi(formData);
    }

    if (response.message) {
      await callback();
      setImageURL("");
      setPostBody("");
      setImage(null);
    }
    setLoading(false);
  }

  function handelImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImageURL(URL.createObjectURL(file));
    e.target.value = "";
  }

  return (
    <div className="bg-white relative rounded-md shadow-md py-3 px-3 my-5 overflow-hidden">
      <form onSubmit={createPost}>
        <textarea
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          placeholder="Create Post, What's on your mind..."
          className="bg-gray-100 border w-full resize-none rounded-md p-4"
          rows={5}
        ></textarea>

        {imageURL && (
          <div className="relative">
            <img src={imageURL} className="w-full mb-4" alt="" />
            <svg
              onClick={() => {
                setImageURL("");
                setImage(null);
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 absolute top-4 end-4 cursor-pointer"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
        )}

        <div className="flex justify-between items-center">
          <label className="cursor-pointer hover:text-blue-500 hover:duration-300 flex gap-1">
            <input onChange={handelImage} type="file" className="border hidden" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <span>Image</span>
          </label>
          {isUpdating && <Button onClick={() => setIsUpdating(false)}>Cancel</Button>}
          <Button type="submit" color="primary">
            Post
          </Button>
        </div>
      </form>

      {loading && (
        <div className="absolute flex justify-center items-center inset-0 bg-white/55">
          <Spinner />
        </div>
      )}
    </div>
  );
}
