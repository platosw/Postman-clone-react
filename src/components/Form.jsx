import React from "react";

export default function Form({ formValues, setFormValues }) {
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { key: "", value: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  return (
    <div>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <input
            type="text"
            name="key"
            value={element.key || ""}
            onChange={(e) => handleChange(index, e)}
            placeholder="Key"
            className="w-3/12 border-2 border-gray-400 p-1 rounded keyvaluepair mr-2"
          />
          <input
            type="text"
            name="value"
            value={element.value || ""}
            onChange={(e) => handleChange(index, e)}
            placeholder="Value"
            className="w-8/12 border-2 border-gray-400 p-1 rounded keyvaluepair"
          />
          <button
            type="button"
            className="button remove text-red-500 remove-btn rounded p-1"
            onClick={() => removeFormFields(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="button-section">
        <button
          className="button add add-btn rounded p-1"
          type="button"
          onClick={() => addFormFields()}
        >
          Add
        </button>
      </div>
    </div>
  );
}
