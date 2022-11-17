import React from "react";

export default function Urldata() {
  return (
    <>
      <form>
        <select className="border-2">
          <option value="GET" defaultValue>
            GET
          </option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
        <input
          className="border-2"
          type="url"
          placeholder="https://example.com"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-400 text-white"
        >
          Send
        </button>
      </form>
    </>
  );
}
