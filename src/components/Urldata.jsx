import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";

export default function Urldata() {
  const selectMethod = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [datas, setDatas] = useState();
  const [status, setStatus] = useState("");
  const [header, setHeader] = useState("");
  const [showTime, setShowTime] = useState("");

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
        console.log(response);
        setDatas(JSON.stringify(response.data));
        setStatus(JSON.stringify(response.status));
        setHeader(JSON.stringify(response.headers));
        setShowTime(JSON.stringify(response.customData.time));
      });
  };

  axios.interceptors.request.use((request) => {
    request.customData = request.customData || {};
    request.customData.startTime = new Date().getTime();
    console.log(request);
    return request;
  });

  function updateEndTime(response) {
    response.customData = response.customData || {};
    response.customData.time =
      new Date().getTime() - response.config.customData.startTime;
    return response;
  }

  axios.interceptors.response.use(updateEndTime, (e) => {
    return Promise.reject(updateEndTime(e.response));
  });

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
            <h2 className="text-2xl">JSON</h2>
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
        {/* {datas == true && ( */}
        <div className="response">
          <h2 className="text-4xl">Response</h2>
          <br />
          <h4 className="text-2xl">Body</h4>
          <p>
            Status: {status}, Time: {showTime} ms
          </p>
          <p>{datas}</p>
          <h4 className="text-2xl">Headers</h4>
          <p>{header}</p>
        </div>
        {/* )} */}
      </div>
    </>
  );
}
