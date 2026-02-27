import React, { useState } from "react";

/**
 * DraggableNode
 * ---------------------------------------------
 * Represents a draggable node template in the toolbar.
 *
 * Responsibilities:
 * - Initiates drag event
 * - Sends node type metadata
 * - Provides visual feedback
 */

export const DraggableNode = ({
  type,
  label,
}) => {
  const [isDragging, setIsDragging] =
    useState(false);

  const onDragStart = (
    event
  ) => {
    const appData = {
      nodeType: type,
    };

    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );

    event.dataTransfer.effectAllowed =
      "move";

    setIsDragging(true);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      style={{
        cursor: "grab",
        minWidth: "100px",
        height: "65px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        background:
          "linear-gradient(145deg, #1e293b, #0f172a)",
        border:
          "1px solid #334155",
        color: "#f8fafc",
        fontSize: "13px",
        fontWeight: 500,
        transition:
          "all 0.2s ease",
        boxShadow: isDragging
          ? "0 8px 25px rgba(37, 99, 235, 0.35)"
          : "0 4px 10px rgba(0,0,0,0.25)",
        transform: isDragging
          ? "scale(0.95)"
          : "scale(1)",
        userSelect: "none",
      }}
    >
      {label}
    </div>
  );
};