import React from "react";
import { BaseNode } from "../components/BaseNode";
import { useStore } from "../store";

/**
 * InputNode
 * ---------------------------------------
 * Represents an entry point of data in the pipeline.
 *
 * Responsibilities:
 * - Capture user input
 * - Store value in global Zustand state
 * - Provide output handle to connect downstream nodes
 * - (Now) Also accepts incoming connection to allow cycle testing
 */

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore(
    (state) => state.updateNodeField
  );

  const value = data?.value || "";

  const handleChange = (e) => {
    updateNodeField(id, "value", e.target.value);
  };

  return (
    <BaseNode
      title="Input"
      inputs={[
        { id: `${id}-input` },   // 🔥 Added target handle (green dot)
      ]}
      outputs={[
        { id: `${id}-output` },  // Existing source handle (blue dot)
      ]}
    >
      <div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter input..."
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #475569",
            background: "#0f172a",
            color: "#f8fafc",
            fontSize: "13px",
            outline: "none",
          }}
        />
      </div>
    </BaseNode>
  );
};