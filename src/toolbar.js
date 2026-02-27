import { useStore } from "./store";

/**
 * Node Config
 * -----------------------------------------
 * Centralized configuration for all nodes.
 * Easy to scale in future.
 */
const NODE_TYPES = [
  { label: "Input", type: "customInput" },
  { label: "LLM", type: "llm" },
  { label: "Output", type: "customOutput" },
  { label: "Text", type: "text" },
];

export const PipelineToolbar = () => {
  const { getNodeID, addNode } = useStore();

  /**
   * Creates a new node with randomized position
   */
  const createNode = (type) => {
    const id = getNodeID(type);

    const position = {
      x: 150 + Math.random() * 400,
      y: 100 + Math.random() * 300,
    };

    addNode({
      id,
      type,
      position,
      data: { id, nodeType: type },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "14px",
        padding: "16px 20px",
        borderBottom: "1px solid #1e293b",
        background: "linear-gradient(145deg,#0f172a,#0b1220)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(6px)",
      }}
    >
      {NODE_TYPES.map(({ label, type }) => (
        <button
          key={type}
          onClick={() => createNode(type)}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "1px solid #334155",
            background: "#1e293b",
            color: "#f8fafc",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "#2563eb";
            e.currentTarget.style.transform =
              "translateY(-3px)";
            e.currentTarget.style.boxShadow =
              "0 8px 20px rgba(37, 99, 235, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "#1e293b";
            e.currentTarget.style.transform =
              "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 10px rgba(0,0,0,0.25)";
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};