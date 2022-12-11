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
          />
          <input
            type="text"
            name="value"
            value={element.value || ""}
            onChange={(e) => handleChange(index, e)}
            placeholder="Value"
          />
          {index ? (
            <button
              type="button"
              className="button remove"
              onClick={() => removeFormFields(index)}
            >
              Remove
            </button>
          ) : null}
        </div>
      ))}
      <div className="button-section">
        <button
          className="button add"
          type="button"
          onClick={() => addFormFields()}
        >
          Add
        </button>
      </div>
    </div>
  );
}
