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
            className="w-1/3 border-2 border-grey-300 rounded keyvaluepair"
          />
          <input
            type="text"
            name="value"
            value={element.value || ""}
            onChange={(e) => handleChange(index, e)}
            placeholder="Value"
            className="w-1/3 border-2 border-grey-300 rounded keyvaluepair"
          />
          <button
            type="button"
            className="button remove text-red-500 remove-btn rounded"
            onClick={() => removeFormFields(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="button-section">
        <button
          className="button add add-btn rounded"
          type="button"
          onClick={() => addFormFields()}
        >
          Add
        </button>
      </div>
    </div>
  );
}
