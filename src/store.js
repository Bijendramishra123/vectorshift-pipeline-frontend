// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

/**
 * Global Pipeline Store (Zustand)
 * ------------------------------------------------------
 * Responsibilities:
 * - Manage nodes & edges
 * - Handle connections
 * - Provide unique node IDs
 * - Keep logic centralized & loosely coupled
 */

export const useStore = create((set, get) => ({
  /* =====================================================
     STATE
  ===================================================== */
  nodes: [],
  edges: [],
  nodeIDs: {},

  /* =====================================================
     NODE ID GENERATOR
  ===================================================== */
  getNodeID: (type) => {
    const currentIDs = { ...get().nodeIDs };

    if (!currentIDs[type]) {
      currentIDs[type] = 1;
    } else {
      currentIDs[type] += 1;
    }

    set({ nodeIDs: currentIDs });

    return `${type}-${currentIDs[type]}`;
  },

  /* =====================================================
     NODE MANAGEMENT
  ===================================================== */
  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                [fieldName]: fieldValue,
              },
            }
          : node
      ),
    }));
  },

  /* =====================================================
     EDGE MANAGEMENT
  ===================================================== */
  onConnect: (connection) => {
    set((state) => ({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        },
        state.edges
      ),
    }));
  },

  /* =====================================================
     REACTFLOW CHANGE HANDLERS
  ===================================================== */
  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(
        changes,
        state.nodes
      ),
    }));
  },

  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(
        changes,
        state.edges
      ),
    }));
  },

  /* =====================================================
     RESET (Useful for testing)
  ===================================================== */
  resetPipeline: () => {
    set({
      nodes: [],
      edges: [],
      nodeIDs: {},
    });
  },
}));