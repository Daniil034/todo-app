import React, { useState, useEffect } from "react";

const FileUpload = (props) => {
  useEffect(() => {
    clearFileUpload();
  }, []);

  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [src, setSrc] = useState("");

  const clearFileUpload = () => {
    setFileName("");
    setFileSize("");
    setSrc("");
    props.dataChanger("");
  };


  const onFilePicked = (e) => {
    let files = e.target.files;
    let file_name = files[0].name;
    let file_size = getFileSize(files[0].size);
    let file_size_kb = getFileSizeKB(files[0].size);
    let file_type = getFileType(files[0]).toLowerCase();

    setFileName(file_name);
    setFileSize(file_size);

    if (
      props?.max_file_size_in_kb &&
      file_size_kb > props?.max_file_size_in_kb
    ) {
      alert(
        "Maximum allowed file size = " + props?.max_file_size_in_kb + " kb"
      );
      clearFileUpload();
      return false;
    }

    if (
      props?.allowed_extensions &&
      !arrToLowerCase(props?.allowed_extensions).includes(file_type)
    ) {
      clearFileUpload();
      alert("Allowed file type = " + props?.allowed_extensions);
      return false;
    }

    let fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      console.log(fileReader.result);
      props.dataChanger(fileReader.result);
      setSrc(fileReader.result);
    });
    fileReader.readAsDataURL(files[0]);
  };

  const getFileSize = (file_size) => {
    if (file_size / 1024 >= 1024) {
      file_size = parseInt(file_size / 1024 / 1024) + " MB";
    } else {
      file_size = parseInt(file_size / 1024) + " KB";
    }
    return file_size;
  };

  const getFileSizeKB = (file_size) => {
    file_size = parseInt(file_size / 1024);
    return file_size;
  };

  const getFileType = (file) => {
    return file?.type.split("/").pop();
  };

  const arrToLowerCase = (arr = []) => {
    return arr.map((str) => str.toLowerCase());
  };

  return (
    <>

      <br />

      {fileName ? (
        <label>{fileName}</label>
      ) : (
        ""
      )}
      {fileSize ? <label>{fileSize}</label> : ""}

      <br />

      {/* new upload file */}
      {props?.type == "image" && src && props?.prev_src ? (
        <img
          src={src}
          style={{ maxHeight: "150px", maxWidth: "150px" }}
          alt=""
        />
      ) : (
        ""
      )}

      {/* previous image */}
      {props?.type == "image" && props?.prev_src && !src ? (
        <img
          src={props?.prev_src}
          style={{ maxHeight: "150px", maxWidth: "150px" }}
          alt=""
        />
      ) : (
        ""
      )}

      {props?.type == "image" && src && props?.prev_src ? (
        <button
          onClick={clearFileUpload}
          title="Remove file"
          value="delete"
        >
          <i>Delete</i>
        </button>
      ) : (
        ""
      )}

      <input
        type="file"
        data-show-upload="true"
        data-show-caption="true"
        id={props?.name}
        name={props?.name}
        required={props?.required ? true : false}
        onChange={(e) => onFilePicked(e)}
      />
    </>
  );
};

export default FileUpload;
