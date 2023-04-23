import axios from "axios";
import { Button } from "components/button";
import { Dropdown } from "components/dropdown";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import Field from "components/input/Field";
import Label from "components/label/Label";
import GridBlock from "components/layout/GridBlock";
import Radio from "components/radio/Radio";
import Toggle from "components/toggle/Toggle";
import { imgbbApi } from "config/imgbbApi";
import { db } from "firebase-app/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";
import { useSearchParams } from "react-router-dom";
import { postStatus } from "utils/constants";
import { toast } from "react-toastify";
Quill.register("modules/imageUploader", ImageUploader);
const PostUpdate = () => {
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    watch,
    getValues,
  } = useForm({
    mode: "onChange",
  });
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const [param] = useSearchParams();
  const postId = param.get("id");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const imageUrlName = getValues("image");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrlName);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const [selectCategory, setSelectCategory] = useState("");
  async function DeleteImage() {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      image: "",
    });
  }
  const { image, progress, setImage, handleDeleteImage, handleSelectImage } =
    useFirebaseImage(setValue, getValues, imageName, DeleteImage);
  const handleSelectCategory = async (category) => {
    const colRef = doc(db, "categories", category.id);
    const docData = await getDoc(colRef);

    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(category);
  };

  const handleUpdatePost = async (values) => {
    console.log(values);
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {
      ...values,
      image,
      content,
    });
    toast.success("update post successfully");
  };

  useEffect(() => {
    setImage(imageUrlName);
  }, [setImage, imageUrlName]);

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "posts", postId);
      const docData = await getDoc(docRef);
      if (docData.data()) {
        reset(docData.data());
        setSelectCategory(docData.data()?.category || "");
        setContent(docData.data()?.content || "");
      }
    }
    fetchData();
  }, [postId, reset]);

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: imgbbApi,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );

  if (!postId) return;
  return (
    <div>
      <p className="text-orange-500 font-bold text-2xl">Post Update</p>
      <p className="text-lg">Update current post</p>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
        <GridBlock>
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              control={control}
              name="title"
              placeholder="enter your title"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="enter your slug"
            ></Input>
          </Field>
        </GridBlock>
        <GridBlock>
          <Field>
            <Label htmlFor="image">image</Label>
            <ImageUpload
              image={image}
              handleDeleteImage={handleDeleteImage}
              progress={progress}
              onChange={handleSelectImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label htmlFor="categories">Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={selectCategory?.name || "select your category"}
              ></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <Dropdown.Option
                      key={category.id}
                      onClick={() => handleSelectCategory(category)}
                    >
                      {category.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </Field>
        </GridBlock>
        <div className="mb-10">
          <Field>
            <Label>Content</Label>
            <div className="entry-content">
              <ReactQuill
                modules={modules}
                onChange={setContent}
                value={content}
                theme="snow"
              ></ReactQuill>
            </div>
          </Field>
        </div>

        <GridBlock>
          <Field>
            <Label>Feature Post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="flex items-center gap-x-3">
              <Radio
                checked={Number(watchStatus) === postStatus.APPROVED}
                name="status"
                control={control}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                checked={Number(watchStatus) === postStatus.PENDING}
                name="status"
                control={control}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                checked={Number(watchStatus) === postStatus.REJECTED}
                name="status"
                control={control}
                value={postStatus.REJECTED}
              >
                Rejected
              </Radio>
            </div>
          </Field>
        </GridBlock>
        <span className="flex">
          <Button
            type="submit"
            className="mb-10"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Update Post
          </Button>
        </span>
      </form>
    </div>
  );
};

export default PostUpdate;
