import React from "react";
import { BaseNode } from "../components/BaseNode";
import { useStore } from "../store";

/**
 * LLMNode
 * ---------------------------------------
 * Represents a Large Language Model processing unit.
 *
 * Responsibilities:
 * - Accept system & prompt inputs
 * - Allow model configuration
 * - Store configuration in global state
 * - Provide response output handle
 */

export const LLMNode = ({ id, data }) => {
  const updateNodeField = useStore(
    (state) => state.updateNodeField
  );

  const model = data?.model || "gpt-4";
  const temperature = data?.temperature || 0.7;

  const handleModelChange = (e) => {
    updateNodeField(id, "model", e.target.value);
  };

  const handleTempChange = (e) => {
    updateNodeField(id, "temperature", e.target.value);
  };

  return (
    <BaseNode
      title="LLM"
      inputs={[
        { id: `${id}-system` },
        { id: `${id}-prompt` },
      ]}
      outputs={[{ id: `${id}-response` }]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        
        {/* Model Selection */}
        <div>
          <label style={{ fontSize: "12px" }}>Model</label>
          <select
            value={model}
            onChange={handleModelChange}
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
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5">GPT-3.5</option>
            <option value="claude">Claude</option>
          </select>
        </div>

        {/* Temperature Control */}
        <div>
          <label style={{ fontSize: "12px" }}>
            Temperature: {temperature}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={handleTempChange}
            style={{ width: "100%" }}
          />
        </div>

      </div>
    </BaseNode>
  );
};