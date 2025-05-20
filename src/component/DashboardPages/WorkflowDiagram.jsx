"use client"

import React, { useCallback, useState, useRef } from "react"
import ReactFlow, { addEdge, Background, Controls, useNodesState, useEdgesState } from "reactflow"
import "reactflow/dist/style.css"

// Start with empty nodes and edges
const initialNodes = []
const initialEdges = []

const nodeStyles = {
  start: {
    background: "#e6f7ff dark:#1e40af",
    border: "1px solid #1890ff dark:#60a5fa",
    borderRadius: "8px",
    padding: "10px",
    width: 150,
  },
  step: {
    background: "white dark:#374151",
    border: "1px solid #ddd dark:#4b5563",
    borderRadius: "8px",
    padding: "10px",
    width: 150,
  },
  decision: {
    background: "#fff7e6 dark:#78350f",
    border: "1px solid #faad14 dark:#fbbf24",
    borderRadius: "8px",
    padding: "10px",
    width: 150,
  },
  end: {
    background: "#df3d3d dark:#7f1d1d",
    border: "1px solid #52c41a dark:#86efac",
    borderRadius: "8px",
    padding: "10px",
    width: 150,
  },
}

const WorkflowDiagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [nodeName, setNodeName] = useState("")
  const [selectedNode, setSelectedNode] = useState(null)
  const [isAddingEdge, setIsAddingEdge] = useState(false)
  const [edgeStart, setEdgeStart] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState("")
  const [lastNodePosition, setLastNodePosition] = useState({ x: 300, y: 100 })
  const [lastNodeId, setLastNodeId] = useState(null)
  const popupRef = useRef(null)

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  // Function to delete the selected node and all connected edges
  const deleteNode = useCallback(() => {
    if (selectedNode) {
      // Find all edges connected to this node
      const connectedEdges = edges.filter((edge) => edge.source === selectedNode || edge.target === selectedNode)

      // Remove the node
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode))

      // Remove all connected edges
      setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode && edge.target !== selectedNode))

      setSelectedNode(null)
    }
  }, [selectedNode, setNodes, setEdges, edges])

  // Handle node selection
  const onNodeClick = (_, node) => {
    setSelectedNode(node.id)

    if (isAddingEdge) {
      if (!edgeStart) {
        setEdgeStart(node.id)
      } else {
        // Create new edge
        const newEdgeId = `e${edgeStart}-${node.id}`
        setEdges((eds) => [...eds, { id: newEdgeId, source: edgeStart, target: node.id }])
        setEdgeStart(null)
        setIsAddingEdge(false)
      }
    }
  }

  // Start adding an edge
  const startAddingEdge = () => {
    setIsAddingEdge(true)
    setEdgeStart(null)
    setShowPopup(false)
  }

  // Save workflow
  const saveWorkflow = () => {
    const workflow = { nodes, edges }
    console.log("Saving workflow:", workflow)
    alert("Workflow saved to console!")
  }

  // Open popup for adding nodes
  const openPopup = (type) => {
    setPopupType(type)
    setShowPopup(true)
    setNodeName("")
  }

  // Close popup when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [popupRef])

  // Calculate next position based on last node
  const getNextPosition = () => {
    // If this is the first node, place it at the top center
    if (nodes.length === 0) {
      return { x: 300, y: 100 }
    }

    // Otherwise, place it below the last node
    return { x: lastNodePosition.x, y: lastNodePosition.y + 120 }
  }

  // Add a new node based on type
  const addNode = (type) => {
    const newNodeId = `${type}_${Date.now()}`
    const nodeStyle = nodeStyles[type]
    let label = nodeName || `${type.charAt(0).toUpperCase() + type.slice(1)} ${nodes.length + 1}`

    // For decision nodes, add Yes/No text
    if (type === "decision") {
      label = (
        <div className="text-center">
          <div>{nodeName || `Decision ${nodes.length + 1}`}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1"></div>
        </div>
      )
    }

    // Calculate position for the new node
    const position = getNextPosition()

    const newNode = {
      id: newNodeId,
      position: position,
      data: { label },
      style: nodeStyle,
      type,
    }

    // Add the node
    setNodes((nds) => [...nds, newNode])

    // If there's a previous node, connect it to this one
    if (lastNodeId) {
      const newEdgeId = `e${lastNodeId}-${newNodeId}`
      setEdges((eds) => [
        ...eds,
        {
          id: newEdgeId,
          source: lastNodeId,
          target: newNodeId,
          animated: type === "decision", // Animate edges to decision nodes
        },
      ])
    }

    // Update the last node info
    setLastNodePosition(position)
    setLastNodeId(newNodeId)

    setNodeName("")
    setShowPopup(false)
  }

  return (
    <div className="flex flex-col w-full h-[100vh]">
      {/* Header */}
      <div className="bg-gray-100 dark:bg-[#1E232E] p-4 border-b border-gray-300 dark:border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">WORKFLOW BUILDER</h1>
          <button
            className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded text-base text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={saveWorkflow}
          >
            Save
          </button>
        </div>
        <ul className="text-base text-gray-600 dark:text-gray-400 list-disc pl-5 mb-3">
          <li>Drag and drop to add or rearrange steps</li>
          <li>Zoom and pan map easily</li>
          <li>Left-click to select</li>
        </ul>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Process Flow</h2>
          <div className="flex space-x-3">
            <button
              className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-4 py-2 rounded text-base hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"
              onClick={() => openPopup("start")}
            >
              Add Start
            </button>
            <button
              className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-4 py-2 rounded text-base hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"
              onClick={() => openPopup("step")}
            >
              Add Step
            </button>
            <button
              className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-4 py-2 rounded text-base hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"
              onClick={() => openPopup("decision")}
            >
              Add Decision
            </button>
            <button
              className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-4 py-2 rounded text-base hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"
              onClick={() => openPopup("end")}
            >
              Add End
            </button>
            <button
              className="bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded text-base hover:bg-red-600 dark:hover:bg-red-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:text-gray-500 dark:disabled:text-gray-400"
              onClick={deleteNode}
              disabled={!selectedNode}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="flex-1 bg-gray-50 dark:bg-[#1E232E] relative" style={{ height: "50vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background variant="dots" gap={12} size={1} color="#888 dark:#444" />
          <Controls />
        </ReactFlow>

        {/* Popup for adding nodes */}
        {showPopup && (
          <div className="absolute inset-0 backdrop-blur-[3px] flex items-center justify-center z-10">
            <div ref={popupRef} className="bg-white dark:bg-[#1E232E] p-5 rounded-lg shadow-lg w-96 border border-gray-300 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Add {popupType.charAt(0).toUpperCase() + popupType.slice(1)} Node
              </h3>
              <div className="mb-4">
                <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Node Name:</label>
                <input
                  type="text"
                  value={nodeName}
                  onChange={(e) => setNodeName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-base bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                  placeholder={`Enter ${popupType} name`}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  className="px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded text-base text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded text-base hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"
                  onClick={() => addNode(popupType)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkflowDiagram