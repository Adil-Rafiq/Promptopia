"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [userPosts, setUserPosts] = useState([]);
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const userId = params.id;

  useEffect(async () => {
    const res = await fetch(`/api/users/${userId}/posts`);
    const data = await res.json();
    setUserPosts(data);
  }, [userId]);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
