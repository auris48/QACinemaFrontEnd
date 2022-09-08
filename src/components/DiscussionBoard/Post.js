import React, { useState } from "react";

export default function Post(props){
  return (
    <div style={{ backgroundColor: "red" }}>
      <h1>{props.title}</h1>
      <h1>{props.content}</h1>
      <h1>{props.dateCreated}</h1>
    </div>
  );
};
