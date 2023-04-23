import React, { Fragment } from "react";

const ImageUpload01 = (props) => {
  const {
    name,
    progress = 0,
    className = "",
    image,
    handleDeleteImage = () => {},
    ...rest
  } = props;
  return (
    <label
      className={`rounded-lg w-full min-h-[250px] border cursor-pointer relative border-orange-200 flex items-center justify-center group ${className}`}
    >
      <input
        type="file"
        className="hidden"
        name={name}
        onChange={() => {}}
        {...rest}
      />
      {progress !== 0 && !image && (
        <div className="w-10 h-10  border-[3px] border-orange-400 rounded-full border-t-transparent animate-spin "></div>
      )}
      {!image && progress === 0 && (
        <div className="flex flex-col gap-y-5 items-center m-auto">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </span>
          <p>Choose your image</p>
        </div>
      )}
      {image && (
        <Fragment>
          <img
            src={image}
            className="w-full  h-[250px] object-cover rounded-lg"
            alt="image_upload"
          />
          <button
            className="flex items-center justify-center w-full h-full bg-slate-50  text-white absolute invisible group-hover:bg-opacity-50 group-hover:visible transition-all z-10"
            onClick={handleDeleteImage}
          >
            <span className=" w-[70px] h-[70px] bg-orange-500 flex items-center justify-center rounded-full ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </span>
          </button>
        </Fragment>
      )}
      {!image && (
        <div
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
          className="w-10 h-1 transition-all bg-orange-500 absolute bottom-0 left-0"
        ></div>
      )}
    </label>
  );
};

export default ImageUpload01;
