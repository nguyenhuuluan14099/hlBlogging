import { db } from "firebase-app/firebaseConfig";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import HomeList from "modules/home/HomeList";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const PostRelated = ({ categoryId = "" }) => {
  const [postRelated, setPostRelated] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(db, "posts"),
        where("categoryId", "==", categoryId),
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
        setPostRelated(result);
      });
    }
    fetchData();
  }, [categoryId]);
  return (
    <div>
      <HomeList data={postRelated}></HomeList>
    </div>
  );
};

export default PostRelated;
