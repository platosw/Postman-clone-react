import React, { useState } from "react";
import axios from "axios";
import CodeEditor from "./Codemirror";
import Form from "./Form";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

export default function Urldata() {
  const selectMethod = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [datas, setDatas] = useState();
  const [jsonData, setJsonData] = useState();

  const handleMethod = (event) => {
    setMethod(event.target.value);
  };
  const handleUrl = (event) => {
    setUrl(event.target.value);
  };

  const [data, setData] = useState({});

  const handleSubmit = () => {
    axios({
      url: url,
      method: method,
      params: {},
      headers: {},
      data: jsonData,
    })
      .catch((error) => console.log(error.message))
      .then((response) => {
        console.log("DB is connected");
        setDatas(response);
      });
  };

  const handleJsonData = (jsonData) => {
    setJsonData(jsonData);
  };

  // adding form test

  axios.interceptors.request.use((request) => {
    request.customData = request.customData || {};
    request.customData.startTime = new Date().getTime();
    // console.log(request);
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

  function updateResponseHeaders(headers) {
    Object.entries(headers).forEach(([key, value]) => {
      JSON.stringify(key);
      JSON.stringify(value);
    });
  }

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
          <div id="queryparams">
            <h2 className="text-2xl">Query Params</h2>
            <Form />
          </div>
          <div id="headers">
            <h2 className="text-2xl">Headers</h2>
            <Form />
          </div>
          <h2 className="text-2xl">JSON</h2>
          <div className="border-2 border-gray-400">
            <CodeEditor jsonData={jsonData} setJsonData={handleJsonData} />
          </div>
        </div>
      </form>
      <br />
      <br />
      <div>
        {datas && (
          <div className="response">
            <h2 className="text-4xl">Response</h2>
            <p>
              Status: {datas.status}, Time: {datas.customData.time} ms
            </p>
            <br />
            <h4 className="text-2xl">Body</h4>
            <JSONPretty
              id="json-pretty"
              data={JSON.stringify(datas.data)}
            ></JSONPretty>
            <h4 className="text-2xl">Headers</h4>
            <p>
              {Object.keys(datas.headers)}: {Object.values(datas.headers)}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
