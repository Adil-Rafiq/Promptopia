"use client";

import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  // if (!data.length) return <div>No post found!</div>;
  if (!data.length) console.log("no posts!");

  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    console.log("getting data");
    try {
      const response = await fetch(
        `/api/prompt?timestamp=${new Date().getTime()}`
      );

      const data = await response.json();

      console.log("data:", data);
      setAllPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("Calling fetchPosts");
    fetchPosts();
  }, [filteredPosts]);

  const handleSearchChange = (e) => {
    const input_text = e.target.value;
    setSearchText(input_text);

    let searchByTag = null;
    let searchByPrompt = null;
    let searchByUsername = null;

    if (input_text[0] === "#") searchByTag = input_text;
    else if (input_text[0] === "@") searchByUsername = input_text;
    else searchByPrompt = input_text;

    setFilteredPosts(
      allPosts.filter(
        (post) =>
          (searchByTag && post.tag.toLowerCase().includes(input_text)) ||
          (searchByUsername &&
            post.creator.username
              .toLowerCase()
              .includes(input_text.slice(1))) ||
          (searchByPrompt && post.prompt.toLowerCase().includes(input_text))
      )
    );
  };

  const handleTagClick = (e) => {
    setSearchText(e);
    setFilteredPosts(
      allPosts.filter((post) => post.tag.toLowerCase().includes(e))
    );
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a prompt, a #tag or a @username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchText ? filteredPosts : allPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
