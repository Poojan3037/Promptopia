"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

type PorpTypes = {
  name: string;
  description: string;
  postList: any;
  setPostList: any
};

const Profile = ({ name, description, postList, setPostList }: PorpTypes) => {


  const handleDeletePost = async (id: string) => {

    try {
      await fetch(`/api/post/${id}`, {
        method: "DELETE",
      })
    } catch (err) {
      console.log(err);
    }
    let newPostList = postList.filter((post: any) => post._id !== id)
    setPostList(newPostList)

  }


  return (
    <div>
      <div className="w-full flex-start flex-col">
        <h1 className="head_text">
          <span className="text-blue-600">{name} Profile</span>
        </h1>
        <p className="desc">{description}</p>
      </div>
      <div className="w-full grid grid-cols-3 gap-4 mt-5 ">
        {
          postList.length > 0 && postList.map((post: any) => {
            return <PostCard key={post._id} post={post} handleSearch={() => { }} handleDeletePost={handleDeletePost} />
          })
        }
      </div>
    </div>
  );
};

export default Profile;
