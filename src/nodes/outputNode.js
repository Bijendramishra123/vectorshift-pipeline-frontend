import React from "react";
import { BaseNode } from "../components/BaseNode";
import { useStore } from "../store";

/**
 * OutputNode
 * ---------------------------------------
 * Represents the final output stage of the pipeline.
 *
 * Responsibilities:
 * - Accept incoming value
 * - Configure output name
 * - Configure output type
 * - Store configuration in global Zustand state
 * - (Now) Can also emit output to enable cycle testing
 */

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore(
    (state) => state.updateNodeField
  );

  const outputName =
    data?.outputName ||
    id.replace("customOutput-", "output_");

  const outputType =
    data?.outputType || "Text";

  const handleNameChange = (e) => {
    updateNodeField(
      id,
      "outputName",
      e.target.value
    );
  };

  const handleTypeChange = (e) => {
    updateNodeField(
      id,
      "outputType",
      e.target.value
    );
  };

  return (
    <BaseNode
      title="Output"
      inputs={[
        { id: `${id}-value` },
      ]}
      outputs={[
        { id: `${id}-loop` }, // 🔥 Added to allow Output → Input connection (cycle testing)
      ]}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Output Name */}
        <div>
          <label style={{ fontSize: "12px" }}>
            Name
          </label>
          <input
            type="text"
            value={outputName}
            onChange={handleNameChange}
            style={{
              width: "100%",
              padding: "6px",
              borderRadius: "6px",
              border: "1px solid #475569",
              background: "#0f172a",
              color: "#f8fafc",
              fontSize: "12px",
              outline: "none",
            }}
          />
        </div>

        {/* Output Type */}
        <div>
          <label style={{ fontSize: "12px" }}>
            Type
          </label>
          <select
            value={outputType}
            onChange={handleTypeChange}
            style={{
              width: "100%",
              padding: "6px",
              borderRadius: "6px",
              border: "1px solid #475569",
              background: "#0f172a",
              color: "#f8fafc",
              fontSize: "12px",
            }}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
            <option value="JSON">JSON</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};