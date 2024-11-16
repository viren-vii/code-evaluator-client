"use client";

import { Editor } from "@monaco-editor/react";
import React from "react";

const CodeEditor = () => {
  const handleEditorChange = (value: string | undefined) => {
    console.log(value);
  };
  return (
    <Editor
      height="100%"
      width="100%"
      defaultLanguage="python"
      defaultValue="# Welcome to PyCode Evaluator!"
      onChange={handleEditorChange}
    />
  );
};

export default CodeEditor;
