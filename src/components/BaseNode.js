import React, { useState } from "react";
import { Handle, Position } from "reactflow";

/**
 * BaseNode
 * ---------------------------------------------
 * A reusable wrapper component for all node types.
 *
 * Responsibilities:
 * - Renders left (input) handles
 * - Renders right (output) handles
 * - Provides consistent styling & hover animation
 * - Accepts dynamic children content
 *
 * This keeps node implementations loosely coupled
 * and enforces consistent design across the app.
 */

export const BaseNode = ({
  title,
  inputs = [],
  outputs = [],
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Dynamically calculate vertical spacing for handles
   * Ensures even distribution regardless of count
   */
  const getHandleTop = (index, total) => {
    if (total === 1) return "50%";
    return `${((index + 1) / (total + 1)) * 100}%`;
  };

  return (
    <div
      style={{
        width: 240,
        minHeight: 110,
        background: "#1e293b",
        color: "#f8fafc",
        borderRadius: "14px",
        border: "1px solid #334155",
        padding: "14px",
        fontSize: "13px",
        position: "relative",
        transition: "all 0.25s ease",
        boxShadow: isHovered
          ? "0 10px 35px rgba(37, 99, 235, 0.35)"
          : "0 4px 15px rgba(0,0,0,0.3)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0px)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ---------- INPUT HANDLES ---------- */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            top: getHandleTop(index, inputs.length),
            background: "#22c55e",
            width: 10,
            height: 10,
            borderRadius: "50%",
          }}
        />
      ))}

      {/* ---------- NODE TITLE ---------- */}
      <div
        style={{
          fontWeight: 600,
          marginBottom: "10px",
          fontSize: "14px",
          letterSpacing: "0.3px",
        }}
      >
        {title}
      </div>

      {/* ---------- NODE CONTENT ---------- */}
      <div>{children}</div>

      {/* ---------- OUTPUT HANDLES ---------- */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            top: getHandleTop(index, outputs.length),
            background: "#3b82f6",
            width: 10,
            height: 10,
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};