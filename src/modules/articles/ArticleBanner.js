import React from "react";

const ArticleBanner = () => {
  return (
    <div className="flex items-center gap-x-3 ">
      <img
        src="https://images.unsplash.com/photo-1609692814867-d668c4487979?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        className="shadow-[0_20px_35px_rgb(0_0_0_/_25%)] shrink h-[100px] w-[150px] object-cover rounded-lg cursor-pointer"
        alt=""
      />
      <p className="truncateBannerTitle w-full  flex-1 cursor-pointer">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
        veritatis iste minima.lorem Labore veri
      </p>
    </div>
  );
};

export default ArticleBanner;
