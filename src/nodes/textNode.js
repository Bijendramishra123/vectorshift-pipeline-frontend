import { useMemo, useRef, useEffect } from "react";
import { BaseNode } from "../components/BaseNode";
import { useStore } from "../store";

/**
 * TextNode
 * ------------------------------------------------
 * A dynamic text processing node.
 *
 * Features:
 * - Auto-resizing textarea
 * - Extracts {{variables}} dynamically
 * - Creates input handles for each unique variable
 * - Stores text in global Zustand state
 *
 * Example:
 *   Hello {{name}} and {{age}}
 *
 * Will create input handles:
 *   - name
 *   - age
 */

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore(
    (state) => state.updateNodeField
  );

  const textareaRef = useRef(null);

  const text = data?.text || "";

  /**
   * Auto resize height based on content
   */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [text]);

  /**
   * Extract unique variable names inside {{ }}
   * Must be valid JS identifiers
   */
  const variables = useMemo(() => {
    const regex =
      /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

    const matches = [
      ...text.matchAll(regex),
    ];

    const uniqueVars = [
      ...new Set(
        matches.map((m) => m[1])
      ),
    ];

    return uniqueVars;
  }, [text]);

  const handleChange = (e) => {
    updateNodeField(
      id,
      "text",
      e.target.value
    );
  };

  return (
    <BaseNode
      title="Text"
      inputs={variables.map((v) => ({
        id: `${id}-${v}`,
      }))}
      outputs={[
        { id: `${id}-output` },
      ]}
    >
      <div>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder="Enter text with {{variables}}"
          style={{
            width: "100%",
            resize: "none",
            padding: "8px",
            borderRadius: "8px",
            border:
              "1px solid #475569",
            background:
              "#0f172a",
            color: "#f8fafc",
            fontSize: "13px",
            overflow: "hidden",
            outline: "none",
            lineHeight: "1.4",
          }}
        />
      </div>
    </BaseNode>
  );
};