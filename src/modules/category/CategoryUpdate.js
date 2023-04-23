import React from "react";
import { Button } from "components/button";
import { Input } from "components/input";
import Field from "components/input/Field";
import Label from "components/label/Label";
import GridBlock from "components/layout/GridBlock";
import Radio from "components/radio/Radio";
import { db } from "firebase-app/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
const CategoryUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const watchStatus = watch("status");
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const cateId = param.get("id");
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "categories", cateId);
      const docData = await getDoc(docRef);
      if (docData.data()) {
        reset(docData.data());
      }
    }
    fetchData();
  }, []);
  const handleEditCategory = async (values) => {
    const colRef = doc(db, "categories", cateId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name || ""),
      status: Number(values.status),
    });
    toast.success("update successfully");
    navigate("/manage/category");
  };
  if (!cateId) return;
  return (
    <div>
      <p className="text-xl font-bold text-orange-500">Update Category</p>
      <p>Update your category</p>

      <form onSubmit={handleSubmit(handleEditCategory)}>
        <GridBlock>
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="enter your slug"
            ></Input>
          </Field>
        </GridBlock>
        <GridBlock>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                UnApproved
              </Radio>
            </div>
          </Field>
        </GridBlock>
        <span className="flex">
          <Button
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="mx-auto"
            type="submit"
          >
            Update
          </Button>
        </span>
      </form>
    </div>
  );
};

export default CategoryUpdate;
