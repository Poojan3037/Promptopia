"use client";
import { useRouter } from "next/navigation";
import React from "react";

type PropsType = {
  type: string;
  post: { prompt: string; tags: string };
  setPost: React.Dispatch<
    React.SetStateAction<{ prompt: string; tags: string }>
  >;
  submitting: boolean;
  handleSubmit: () => void;
};

const Form = ({ type, post, setPost, submitting, handleSubmit }: PropsType) => {
  const router = useRouter();
  return (
    <div>
      <div className="w-full flex-start flex-col">
        <h1 className="head_text">
          <span className="text-blue-600">{type} Post</span>
        </h1>
        <p className="desc">
          {type} and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform
        </p>
      </div>
      <form className="glass-effect form flex-col">
        <h5 className="input-text my-2">Your AI Prompt</h5>
        <textarea
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          className="my-2 input"
          placeholder="Write your post here"
          rows={5}
        ></textarea>
        <h5 className="input-text my-2">
          Field of Prompt (#product, #webdevelopment, #idea, etc.)
        </h5>
        <input
          type="text"
          value={post.tags}
          onChange={(e) => setPost({ ...post, tags: e.target.value })}
          className="my-2 input"
          placeholder="#Tag"
        ></input>
        <div className="flex-end gap-5">
          <button
            type="button"
            className="bg-black py-1 px-4 rounded-full text-white transition-all duration-300 hover:bg-white hover:text-black border-2"
            onClick={() => router.push("/")}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-orange-600 py-1 px-4 rounded-full text-white transition-all duration-300 hover:bg-white hover:text-black border-2"
            onClick={handleSubmit}
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
