import React from "react";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

/**
 * App
 * ------------------------------------------------
 * Root component of the Pipeline Builder.
 *
 * Responsibilities:
 * - Layout orchestration
 * - Global theme container
 * - Composes Toolbar + Canvas + Submit Button
 */

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top Toolbar */}
      <div
        style={{
          borderBottom:
            "1px solid #334155",
          padding: "12px 20px",
        }}
      >
        <PipelineToolbar />
      </div>

      {/* Main Canvas Area */}
      <div
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <PipelineUI />
      </div>

      {/* Floating Submit Button */}
      <SubmitButton />
    </div>
  );
}

export default App;