import { Button } from "components/button";
import { Dropdown } from "components/dropdown";
import ImageUpload from "components/image/ImageUpload";
import ImageUpload01 from "components/image/ImageUpload01";
import { Input } from "components/input";
import Field from "components/input/Field";
import Label from "components/label/Label";
import GridBlock from "components/layout/GridBlock";
import Radio from "components/radio/Radio";
import Toggle from "components/toggle/Toggle";
import { useAuth } from "context/Auth-context";
import { db } from "firebase-app/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { postStatus } from "utils/constants";

const PostAddNew = () => {
  const { userInfo } = useAuth();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      image: "",
      category: {},
      user: {},
      hot: false,
      status: 2,
    },
  });
  const {
    image,
    handleDeleteImage,
    progress,
    handleUploadImage,
    handleResetImage,
    handleSelectImage,
  } = useFirebaseImage(setValue, getValues);

  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapShot = await getDocs(q);
      const result = [];
      querySnapShot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);
  const handleSelectCategory = async (category) => {
    const colRef = doc(db, "categories", category.id);
    const docData = await getDoc(colRef);

    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(category);
  };

  useEffect(() => {
    async function getDataUser() {
      if (!userInfo.email) return;
      const colRef = collection(db, "users");
      const q = query(colRef, where("email", "==", userInfo.email));
      const snapShot = await getDocs(q);
      snapShot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    getDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email]);
  const handleAddPost = async (values) => {
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(cloneValues.title || cloneValues.slug, {
        lower: true,
      });
      cloneValues.status = Number(cloneValues.status);
      handleUploadImage(cloneValues.image);

      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        categoryId: cloneValues.category.id,
        userId: cloneValues.user.id,
        createAt: serverTimestamp(),
      });
      toast.success("created new post successfully!");
      reset({
        title: "",
        slug: "",
        image: "",
        category: {},
        user: {},
        hot: false,
        status: 2,
      });
      handleResetImage();
      setSelectCategory({});
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className=" w-full container ">
      <p className="text-2xl font-bold text-orange-500">Add Post</p>
      <p>post add new</p>
      <form onSubmit={handleSubmit(handleAddPost)}>
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
            Add New Post
          </Button>
        </span>
      </form>
    </div>
  );
};

export default PostAddNew;
