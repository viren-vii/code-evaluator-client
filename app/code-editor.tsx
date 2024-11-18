"use client";

import { Editor } from "@monaco-editor/react";
import React from "react";

const CodeEditor = ({
  code,
  setCode,
  disableEditor,
}: {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  disableEditor: boolean;
}) => {
  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };
  return (
    <Editor
      height="100%"
      width="100%"
      defaultLanguage="python"
      defaultValue={code}
      onChange={handleEditorChange}
      options={{
        readOnly: disableEditor,
      }}
    />
  );
};

export default CodeEditor;
