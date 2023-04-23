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
const HomeNewestUpdate = () => {
  const [newestUpdate, setNewestUpdate] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const q = query(
        colRef,
        where("hot", "==", false),
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
        setNewestUpdate(result);
      });
    }
    fetchData();
  }, []);
  return (
    <>
      <Heading>Newest Update</Heading>
      <HomeList data={newestUpdate}></HomeList>
    </>
  );
};

export default HomeNewestUpdate;
