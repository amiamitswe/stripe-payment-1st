"use client";
import React from "react";
import Video from "./_video-components/Video";
import NoSSRWrapper from "./_video-components/NoSSRWrapper";

function page() {
  return (
    <NoSSRWrapper>
      <Video />
    </NoSSRWrapper>
  );
}

export default page;
