import React from "react";
import { v4 } from "uuid";
import ItemArticle from "../articles/ItemArticle";

const HomeList = ({ data }) => {
  if (!data) return;
  return (
    <div className="grid grid-cols-4 pb-10 gap-x-8 mb-7">
      {data.length > 0 &&
        data.map((item) => <ItemArticle key={v4()} data={item}></ItemArticle>)}
    </div>
  );
};

export default HomeList;
