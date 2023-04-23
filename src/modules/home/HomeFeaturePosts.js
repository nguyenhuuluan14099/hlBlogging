import Heading from "modules/headers/Heading";
import React from "react";
import HomeList from "./HomeList";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "firebase-app/firebaseConfig";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { v4 } from "uuid";
const HomeFeaturePosts = () => {
  const [featurePost, setFeaturePost] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const q = query(
        colRef,
        where("hot", "==", true),
        where("status", "==", 1),
        limit(4)
      );

      onSnapshot(q, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setFeaturePost(result);
      });
    }
    fetchData();
  }, []);
  return (
    <>
      <Heading>Popular Article</Heading>
      <HomeList key={v4()} data={featurePost}></HomeList>
    </>
  );
};

export default HomeFeaturePosts;
