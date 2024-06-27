"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useRef, useState } from "react";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);
  const messageRef = useRef(null);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      messageRef.current.innerHTML = message;
      console.log(message);
    });
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setLoaded(true);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const compressAndConvert = async () => {
    if (!selectedFile) {
      alert("Please select a video file first!");
      return;
    }

    const ffmpeg = ffmpegRef.current;
    const fileName = selectedFile.name;
    const fileExtension = fileName.split(".").pop();

    // Read the uploaded file
    await ffmpeg.writeFile(
      `input.${fileExtension}`,
      await fetchFile(selectedFile)
    );

    // Convert the file to WebM format with compression
    await ffmpeg.exec([
      "-i",
      `input.${fileExtension}`,
      "-c:v",
      "libvpx",
      "-b:v",
      "1M", // Adjust bitrate for compression
      "output.webm",
    ]);
    const data = await ffmpeg.readFile("output.webm");

    // Display the compressed and converted video
    videoRef.current.src = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/webm" })
    );
  };

  return loaded ? (
    <>
      <input type="file" onChange={handleFileChange} />
      <button
        className="h-[50px] rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

        onClick={compressAndConvert}
      >
        Compress and Convert to WebM
      </button>
      {videoRef && (
        <video ref={videoRef} controls style={{ marginTop: "20px" }}></video>
      )}
      <p ref={messageRef}></p>
      <p>Open Developer Tools (Ctrl+Shift+I) to View Logs</p>
    </>
  ) : (
    <button
      className="h-[50px] rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={load}
    >
      Load Video
    </button>
  );
}

