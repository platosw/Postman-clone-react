import { useEffect, useRef } from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { useState } from "react";

const extensions = [json()];

export default function CodeEditor({ setJsonData }) {
  const editor = useRef();

  const [code, setCode] = useState("{\n\n}");

  const handleData = (value) => {
    setCode(value);
    setJsonData(JSON.parse(value));
  };

  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    value: code,
    width: "100%",
    height: "100%",
    placeholder: "Write your code",
    theme: "dark",
    onChange: handleData,
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);

  return <div ref={editor} />;
}
