import React, { useState } from "react";
import axios from "axios";
import CodeEditor from "./Codemirror";
import Form from "./Form";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import prettyBytes from "pretty-bytes";

export default function Urldata() {
  const selectMethod = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [datas, setDatas] = useState();
  const [jsonData, setJsonData] = useState();
  const [queryParamsFormValues, setQueryParamsFormValues] = useState([
    { key: "", value: "" },
  ]);
  const [headersFormValues, setHeadersFormValues] = useState([
    { key: "", value: "" },
  ]);
  const [openTab, setOpenTab] = useState(1);
  const [requestTab, setRequestTab] = useState(1);

  const handleMethod = (event) => {
    setMethod(event.target.value);
  };

  const handleUrl = (event) => {
    setUrl(event.target.value);
  };

  const convertArrayToObject = (arr) => {
    const obj = {};

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key === "") continue;

      obj[arr[i].key] = arr[i].value;
    }

    return obj;
  };

  const handleSubmit = () => {
    axios({
      url: url,
      method: method,
      params: convertArrayToObject(queryParamsFormValues),
      headers: convertArrayToObject(headersFormValues),
      data: jsonData,
    })
      .then((response) => {
        console.log("DB is connected");
        setDatas(response);
      })
      .catch((error) => console.log(error.message));
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

  return (
    <>
      <form data-form>
        <div>
          <div className="request-select/request-url/send mb-12">
            <select
              className="h-10 w-0.5/6 border-2 border-orange-300 rounded select-url-box"
              onChange={handleMethod}
            >
              {selectMethod.map((method) => {
                return (
                  <option key={method} value={method}>
                    {method}
                  </option>
                );
              })}
            </select>
            <input
              className="w-5/6 h-10 border-2 border-orange-300 rounded select-url-box"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={handleUrl}
            />
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-400 text-white h-10 w-24 rounded"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
          <div id="request-tab" className="flex flex-wrap">
            <div className="w-full">
              <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                role="tablist"
              >
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 1
                        ? "bg-orange-500 text-white"
                        : "text-orange-500")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Query Params
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 2
                        ? "bg-orange-500 text-white"
                        : "text-orange-500")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Headers
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 3
                        ? "bg-orange-500 text-white"
                        : "text-orange-500")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(3);
                    }}
                    data-toggle="tab"
                    href="#link3"
                    role="tablist"
                  >
                    JSON
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words border-1 border-grey-500/100 w-full mb-6 shadow-lg rounded">
                <div className="px-4 py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div
                      className={openTab === 1 ? "block" : "hidden"}
                      id="link1"
                    >
                      <Form
                        formValues={queryParamsFormValues}
                        setFormValues={setQueryParamsFormValues}
                      />
                    </div>
                    <div
                      className={openTab === 2 ? "block" : "hidden"}
                      id="link2"
                    >
                      <Form
                        formValues={headersFormValues}
                        setFormValues={setHeadersFormValues}
                      />
                    </div>
                    <div
                      className={openTab === 3 ? "block" : "hidden"}
                      id="link3"
                    >
                      <div className="border-2 border-gray-400">
                        <CodeEditor
                          jsonData={jsonData}
                          setJsonData={handleJsonData}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <br />
      <br />
      <div>
        {datas && (
          <div className="response">
            <h2 className="text-3xl font-medium">Response</h2>
            <p>
              Status: {datas.status}, Time: {datas.customData.time} ms, Size:{" "}
              {prettyBytes(
                JSON.stringify(datas.data).length +
                  JSON.stringify(datas.headers).length
              )}
            </p>
            <br />
            <div id="request-tab" className="flex flex-wrap">
              <div className="w-full">
                <ul
                  className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                  role="tablist"
                >
                  <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                      className={
                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                        (requestTab === 1
                          ? "bg-orange-500 text-white"
                          : "text-orange-500")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setRequestTab(1);
                      }}
                      data-toggle="tab"
                      href="#link1"
                      role="tablist"
                    >
                      Body
                    </a>
                  </li>
                  <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                      className={
                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                        (requestTab === 2
                          ? "bg-orange-500 text-white"
                          : "text-orange-500")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setRequestTab(2);
                      }}
                      data-toggle="tab"
                      href="#link2"
                      role="tablist"
                    >
                      Headers
                    </a>
                  </li>
                </ul>
                <div className="relative flex flex-col min-w-0 break-words border-1 border-grey-500/100 w-full mb-6 shadow-lg rounded">
                  <div className="px-4 py-5 flex-auto">
                    <div className="tab-content tab-space">
                      <div
                        className={requestTab === 1 ? "block" : "hidden"}
                        id="link1"
                      >
                        <JSONPretty
                          id="json-pretty"
                          data={JSON.stringify(datas.data)}
                        ></JSONPretty>
                      </div>
                      <div
                        className={requestTab === 2 ? "block" : "hidden"}
                        id="link2"
                      >
                        {Object.entries(datas.headers).map(([key, value]) => {
                          return (
                            <div key={key}>
                              <p>
                                {key}: {value}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
