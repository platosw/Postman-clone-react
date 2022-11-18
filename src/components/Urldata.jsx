import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Urldata() {
  const selectMethod = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [data, setData] = useState();

  const handleMethod = (event) => {
    setMethod(event.target.value);
  };
  const handleUrl = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = () => {
    axios({
      url: url,
      method: method,
      params: {},
      headers: {},
      data: null,
    })
      .catch((error) => console.log(error.message))
      .then((response) => {
        setData(JSON.stringify(response.data));
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
        </div>
      </form>

      <div>
        <h1>Body</h1>
        <p>{data}</p>
      </div>
    </>
  );
}
