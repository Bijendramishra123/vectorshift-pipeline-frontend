import { useStore } from "./store";
import { useState } from "react";

/**
 * SubmitButton
 * ---------------------------------------------
 * Sends pipeline (nodes + edges) to backend
 * and displays DAG analysis result.
 */

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL =
    process.env.REACT_APP_API_URL;

  const handleSubmit = async () => {
    if (!nodes.length) {
      alert("Add at least one node.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_URL}/pipelines/parse`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            nodes,
            edges,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Server error"
        );
      }

      const data =
        await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Analyze Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          position: "fixed",
          bottom: "30px",
          left: "50%",
          transform:
            "translateX(-50%)",
          padding: "12px 30px",
          borderRadius: "14px",
          border: "none",
          background:
            "linear-gradient(135deg, #2563eb, #1d4ed8)",
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow:
            "0 8px 25px rgba(37, 99, 235, 0.4)",
          transition:
            "all 0.2s ease",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading
          ? "Analyzing..."
          : "Analyze Pipeline"}
      </button>

      {/* Error Message */}
      {error && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            left: "50%",
            transform:
              "translateX(-50%)",
            background: "#ef4444",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        >
          {error}
        </div>
      )}

      {/* Result Modal */}
      {result && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "center",
            backdropFilter:
              "blur(4px)",
          }}
        >
          <div
            className="fade-in"
            style={{
              background:
                "linear-gradient(145deg,#1e293b,#0f172a)",
              padding: "28px",
              borderRadius: "18px",
              width: "340px",
              textAlign: "center",
              boxShadow:
                "0 15px 50px rgba(0,0,0,0.6)",
              border:
                "1px solid #334155",
            }}
          >
            <h3
              style={{
                marginBottom: "18px",
                fontSize: "18px",
              }}
            >
              Pipeline Analysis
            </h3>

            <p>
              <strong>Nodes:</strong>{" "}
              {result.num_nodes}
            </p>

            <p>
              <strong>Edges:</strong>{" "}
              {result.num_edges}
            </p>

            <p
              style={{
                marginTop: "10px",
                fontWeight: "600",
                color: result.is_dag
                  ? "#22c55e"
                  : "#ef4444",
              }}
            >
              {result.is_dag
                ? "Valid DAG ✅"
                : "Cycle Detected ❌"}
            </p>

            <button
              onClick={() =>
                setResult(null)
              }
              style={{
                marginTop: "22px",
                padding: "8px 18px",
                borderRadius: "8px",
                border: "none",
                background:
                  "#334155",
                color: "white",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};