import React, { memo } from "react";
import Select from "react-select";
import { Container, Form } from "react-bootstrap";

const MultiSelectInput = memo(({ options, onSelectionChange }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "1px solid #007bff" : "1px solid #ccc",
      borderRadius: "5px",
    }),
  };

  const handleSelectChange = (selectedItems) => {
    onSelectionChange(selectedItems);
    console.log(selectedItems);
  };

  return (
    <Container>
      <Form.Group>
        <Select
          options={options.map((option) => ({
            label: option,
            value: option,
          }))}
          isMulti
          styles={customStyles}
          placeholder="Select items"
          onChange={handleSelectChange}
        />
      </Form.Group>
    </Container>
  );
});

export default MultiSelectInput;
