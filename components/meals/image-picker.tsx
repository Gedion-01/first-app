"use client";

import { useRef } from "react";
import classes from "./image.picker.module.css";

export default function ImagePicker({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  const imageInput = useRef<HTMLInputElement>(null);
  
  function handleClick() {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          className={classes.input}
          type="file"
          name={name}
          accept="image/png, image/jpg"
          id={name}
          ref={imageInput}
        />
        <button className={classes.button} type="button" onClick={handleClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
