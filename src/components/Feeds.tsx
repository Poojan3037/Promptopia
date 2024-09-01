"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { getPosts } from "@/utils/apiCalling";
import Loading from "@/app/loading";


const Feeds = () => {
  const [postList, setPostList] = useState([]);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    const posts = await getPosts();
    setPostList(posts.reverse());
    setPostData(posts);
    setLoading(true);
  };

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    if (postList.length > 0 && searchValue.trim() !== "") {
      let newPostListWithUserNameSearch = postData.filter((post: any) => {
        let searchParam = String(post.creator.username).toLocaleLowerCase();
        if (searchParam.includes(searchValue.toLocaleLowerCase())) {
          return post;
        }
      });

      let newPostListWithTagSearch = postData.filter((post: any) => {
        let searchParam = String(post.tags).toLocaleLowerCase();
        if (searchParam.includes(searchValue.toLocaleLowerCase())) {
          return post;
        }
      });

      setPostList([
        ...newPostListWithTagSearch,
        ...newPostListWithUserNameSearch,
      ]);
    } else {
      setPostList(postData);
    }
  };

  const handleDeletePost = async (id: string) => {

    setLoading(true)
    try {
      await fetch(`/api/post/${id}`, {
        method: "DELETE",
      })
    } catch (err) {
      console.log(err);
    }
    let newPostList = postData.filter((post: any) => post._id !== id)
    setPostList(newPostList)
    setLoading(false)
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="w-full flex-center flex-col">
      {/* {loading && <Loading />} */}
      <div className="w-3/5 flex-center">
        <input
          type="text"
          className="input w-full mt-5 shadow-2xl border-2 rounded-md"
          placeholder="Search for a tag or a username"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-4 mt-5 items-center">

        {postList.length > 0 &&
          postList.map((post: any) => {
            return <PostCard key={post._id} post={post} handleSearch={handleSearch} handleDeletePost={handleDeletePost} />;
          })}


      </div>
    </div>
  );
};

export default Feeds;
