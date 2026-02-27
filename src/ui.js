// ui.js
// --------------------------------------------------
// Main ReactFlow canvas for pipeline builder
// Handles drag-drop, node rendering, connections
// --------------------------------------------------

import { useState, useRef, useCallback, useMemo } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
} from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";

import "reactflow/dist/style.css";

const GRID_SIZE = 20;
const PRO_OPTIONS = { hideAttribution: true };

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  /**
   * Memoized nodeTypes for performance
   */
  const nodeTypes = useMemo(
    () => ({
      customInput: InputNode,
      llm: LLMNode,
      customOutput: OutputNode,
      text: TextNode,
    }),
    []
  );

  /**
   * Initialize node data
   */
  const getInitialNodeData = (id, type) => ({
    id,
    nodeType: type,
  });

  /**
   * Handle drop event from draggable toolbar
   */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const bounds =
        reactFlowWrapper.current.getBoundingClientRect();

      const raw =
        event.dataTransfer.getData(
          "application/reactflow"
        );

      if (!raw) return;

      const { nodeType } = JSON.parse(raw);
      if (!nodeType) return;

      const position =
        reactFlowInstance.project({
          x:
            event.clientX - bounds.left,
          y:
            event.clientY - bounds.top,
        });

      const id = getNodeID(nodeType);

      addNode({
        id,
        type: nodeType,
        position,
        data: getInitialNodeData(
          id,
          nodeType
        ),
      });
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  /**
   * Allow drop
   */
  const onDragOver = useCallback(
    (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect =
        "move";
    },
    []
  );

  return (
    <div
      ref={reactFlowWrapper}
      style={{
        width: "100vw",
        height: "85vh",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={
          onNodesChange
        }
        onEdgesChange={
          onEdgesChange
        }
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={PRO_OPTIONS}
        snapGrid={[
          GRID_SIZE,
          GRID_SIZE,
        ]}
        connectionLineType="smoothstep"
      >
        <Background
          color="#1e293b"
          gap={GRID_SIZE}
        />

        <Controls />

        <MiniMap
          nodeColor="#2563eb"
          maskColor="rgba(0,0,0,0.6)"
          style={{
            background: "#1e293b",
            borderRadius: "12px",
          }}
        />
      </ReactFlow>
    </div>
  );
};