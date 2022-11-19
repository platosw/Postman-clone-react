import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";

export default function Urldata() {
  const selectMethod = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [datas, setDatas] = useState();

  const handleMethod = (event) => {
    setMethod(event.target.value);
  };
  const handleUrl = (event) => {
    setUrl(event.target.value);
  };

  const textRef = useRef();
  const [code, setCode] = useState(`[\n\n]`);

  useEffect(() => {
    if (textRef.current) {
      const obj = new SelectionText(textRef.current);
      console.log("obj:", obj);
    }
  }, []);

  const handleSubmit = () => {
    axios({
      url: url,
      method: method,
      params: {},
      headers: {},
      code,
      datas,
    })
      .catch((error) => console.log(error.message))
      .then((response) => {
        setDatas(response);
      });
  };

  return (
    <>
      <form data-form>
        <div className="w-full">
          <select onChange={handleMethod}>
            {selectMethod.map((method) => {
              return (
                <option key={method} value={method}>
                  {method}
                </option>
              );
            })}
          </select>
          <input
            className="w-96"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={handleUrl}
          />
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-400 text-white"
            onClick={handleSubmit}
          >
            Send
          </button>
          <div id="editor">
            <div data-color-mode="light" id="editor-light" className="border-2">
              <CodeEditor
                value={code}
                ref={textRef}
                language="js"
                placeholder="Please enter JS code."
                onChange={(evn) => setCode(evn.target.value)}
                padding={15}
              />
            </div>
          </div>
        </div>
      </form>

      <div>
        <h2 className="text-3xl">Response</h2>
        <p>{JSON.stringify(datas)}</p>
      </div>
    </>
  );
}
