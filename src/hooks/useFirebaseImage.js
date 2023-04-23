import { useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function useFirebaseImage(
  setValue,
  getValues,
  imageName = null,
  DeleteImage = null
) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  if (!setValue || !getValues) return;

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };
  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progressPercent + "% done");
        setProgress(progressPercent);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Upload is not running");
        }
      },
      (error) => {
        console.log("image upload errors", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const handleResetImage = () => {
    setImage("");
    setProgress(0);
  };
  const handleDeleteImage = () => {
    const storage = getStorage();
    const desertRef = ref(
      storage,
      "images/" + (imageName || getValues("image_name"))
    );

    deleteObject(desertRef)
      .then(() => {
        console.log("delete image successfully");
        setImage("");
        setProgress(0);
        DeleteImage && DeleteImage();
      })
      .catch((error) => {
        console.log("can not delete image");
      });
  };
  return {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleResetImage,
    handleUploadImage,
    setImage,
  };
}
