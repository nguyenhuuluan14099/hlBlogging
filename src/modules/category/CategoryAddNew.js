import { Button } from "components/button";
import { Input } from "components/input";
import Field from "components/input/Field";
import Label from "components/label/Label";
import GridBlock from "components/layout/GridBlock";
import Radio from "components/radio/Radio";
import { db } from "firebase-app/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";

const CategoryAddNew = () => {
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createAt: new Date(),
    },
  });
  const watchStatus = watch("status");
  const handleAddCategory = async (values) => {
    if (!isValid) return;
    const newValues = { ...values };
    newValues.slug = slugify(newValues.name || newValues.slug, { lower: true });
    newValues.status = Number(newValues.status);
    try {
      const colRef = collection(db, "categories");
      await addDoc(colRef, {
        ...newValues,
        createAt: serverTimestamp(),
      });
      toast.success("create new category successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createAt: new Date(),
      });
    }
  };
  return (
    <div>
      <p className="font-bold text-orange-500 text-2xl">New Category</p>
      <p>Add new category</p>
      <form onSubmit={handleSubmit(handleAddCategory)}>
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
            Add New
          </Button>
        </span>
      </form>
    </div>
  );
};

export default CategoryAddNew;
