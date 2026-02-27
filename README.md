# VectorShift Pipeline Builder

A drag-and-drop pipeline builder built using ReactFlow (frontend) and FastAPI (backend).

This application allows users to create nodes, connect them visually, and analyze whether the pipeline forms a Directed Acyclic Graph (DAG).

---

## 🚀 Live Demo

Frontend (Vercel):
👉 https://vectorshift-pipeline-frontend.vercel.app/

Backend (Render):
👉 https://vectorshift-pipeline-backend-jff7.onrender.com

---

## 🛠 Features

- Drag and drop nodes (Input, LLM, Output, Text)
- Connect nodes visually
- Dynamic node & edge counting
- DAG validation
- Cycle detection using DFS
- Modal-based pipeline analysis
- Fully deployed frontend & backend

---

## 🧠 How DAG Detection Works

The backend constructs an adjacency list from nodes and edges.

It then performs a Depth First Search (DFS) traversal while maintaining a recursion stack.

If a node is revisited while still in the recursion stack, a cycle exists.

If no cycle is detected → The graph is a Directed Acyclic Graph (DAG).

---

## ⚙️ Tech Stack

Frontend:
- React
- ReactFlow
- Zustand (state management)
- Vercel (deployment)

Backend:
- FastAPI
- Uvicorn
- Render (deployment)

---

## Run Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload