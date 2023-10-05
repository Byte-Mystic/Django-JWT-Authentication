import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import AudioPlayer from "react-audio-player";

const AudioDropzone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log("Accepted Files:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "audio/mpeg", // Specify the accepted file type
    multiple: false, // Allow only one file to be dropped
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an MP3 audio file here, or click to select one</p>
      </div>
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const audioPlayerStyle = {
  marginTop: "20px",
};

export default AudioDropzone;
