import classes from "./NoMedia.module.scss";
import { FC } from "react";
import { FileUploader } from "react-drag-drop-files";

const FILE_TYPES = ["MP4"];

type NoMediaProps = {
  handleChange: (file: File) => void;
};

const NoMedia: FC<NoMediaProps> = ({ handleChange }) => {
  return (
    <FileUploader handleChange={handleChange} name={"file"} types={FILE_TYPES}>
      <div className={classes.noMedia}>
        <h1>Drag and drop a video file or click to select a video file</h1>
      </div>
    </FileUploader>
  );
};

export default NoMedia;
