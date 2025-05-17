"use client"

import { useState, useCallback, useRef } from "react"
import { Plus, Save, X, Edit, Trash2 } from "lucide-react"
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel,
  MarkerType,
} from "reactflow"
import "reactflow/dist/style.css"

// Custom node components
const StartNode = ({ data, isConnectable, id }) => (
  <div className="bg-green-500 text-white px-6 py-3 mt-2 rounded-md">
    <div className="font-medium">{data.label || "Start"}</div>
    <div className="absolute top-1 right-1 flex">
      <button className="text-white rounded-full p-1" onClick={() => data.onEdit(id)}>
        <Edit className="w-3 h-3" />
      </button>
      <button className="text-white rounded-full" onClick={() => data.onDelete(id)}>
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  </div>
)

const StepNode = ({ data, isConnectable, id }) => (
  <div className="bg-gray-200 px-6 py-3 mt-2 rounded-md">
    <div className="font-medium">{data.label || "Step"}</div>
    <div className="absolute top-1 right-1 flex">
      <button className="text-gray-600 rounded-full p-1" onClick={() => data.onEdit(id)}>
        <Edit className="w-3 h-3" />
      </button>
      <button className="text-gray-600 rounded-full" onClick={() => data.onDelete(id)}>
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  </div>
)

const DecisionNode = ({ data, isConnectable, id }) => (
  <div className="bg-gray-200 p-4 rounded-md transform rotate-45">
    <div className="transform -rotate-45 font-medium">{data.label || "Decision"}</div>
    <div className="absolute top-1 right-[63px] flex transform -rotate-45">
      <button className="text-gray-600 rounded-full p-1" onClick={() => data.onEdit(id)}>
        <Edit className="w-3 h-3" />
      </button>
      <button className="text-gray-600 rounded-full" onClick={() => data.onDelete(id)}>
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  </div>
)

const EndNode = ({ data, isConnectable, id }) => (
  <div className="bg-red-500 text-white px-6 py-3 mt-2 rounded-md">
    <div className="font-medium">{data.label || "End"}</div>
    <div className="absolute top-1 right-1 flex">
      <button className="text-white rounded-full p-1" onClick={() => data.onEdit(id)}>
        <Edit className="w-3 h-3" />
      </button>
      <button className="text-white rounded-full" onClick={() => data.onDelete(id)}>
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  </div>
)

// Define node types
const nodeTypes = {
  start: StartNode,
  step: StepNode,
  decision: DecisionNode,
  end: EndNode,
}

const WorkflowDiagram = () => {
  // React Flow states
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  // State to track which popup is open
  const [activePopup, setActivePopup] = useState(null)

  // State for editing
  const [editingNode, setEditingNode] = useState(null)
  const [editingLabel, setEditingLabel] = useState("")

  // State for connecting nodes
  const [connectingNode, setConnectingNode] = useState(null)

  // Counter for node positioning
  const nodeIdCounter = useRef({
    start: 0,
    step: 0,
    decision: 0,
    end: 0,
  })

  // Function to open a popup
  const openPopup = (type) => {
    setActivePopup(type)
    setEditingLabel("")
    setEditingNode(null)
  }

  // Function to close the popup
  const closePopup = () => {
    setActivePopup(null)
    setEditingLabel("")
    setEditingNode(null)
    setConnectingNode(null)
  }

  // Function to handle node deletion
  const handleDeleteNode = (id) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id))
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id))
  }

  // Function to handle node editing
  const handleEditNode = (id) => {
    const node = nodes.find((node) => node.id === id)
    if (node) {
      setEditingNode(id)
      setEditingLabel(node.data.label)
      setActivePopup(node.type)
    }
  }

  // Function to add a new node to the workflow
  const addNode = () => {
    if (activePopup && editingLabel.trim()) {
      const type = activePopup
      const nodeId = editingNode || `${type}-${Date.now()}`

      // Calculate position based on node type
      let position = { x: 100, y: 100 }

      // If we're adding a new node (not editing)
      if (!editingNode) {
        // Increment counter for this node type
        nodeIdCounter.current[type] = (nodeIdCounter.current[type] || 0) + 1
        const count = nodeIdCounter.current[type]

        // Position nodes based on type
        switch (type) {
          case "start":
            position = { x: 150, y: 50 }
            break
          case "step":
            position = { x: 150, y: 150 + count * 100 }
            break
          case "decision":
            position = { x: 150, y: 250 + count * 100 }
            break
          case "end":
            position = { x: 150, y: 350 + count * 100 }
            break
          default:
            position = { x: 150, y: 100 }
        }
      } else {
        // If editing, keep the same position
        const existingNode = nodes.find((node) => node.id === editingNode)
        if (existingNode) {
          position = { x: existingNode.position.x, y: existingNode.position.y }
        }
      }

      const newNode = {
        id: nodeId,
        type,
        position,
        data: {
          label: editingLabel.trim(),
          onDelete: handleDeleteNode,
          onEdit: handleEditNode,
        },
      }

      // If editing, update the node
      if (editingNode) {
        setNodes(
          nodes.map((node) =>
            node.id === editingNode ? { ...node, data: { ...node.data, label: editingLabel.trim() } } : node
          )
        )
      } else {
        // Otherwise add a new node
        setNodes((nodes) => [...nodes, newNode])

        // If we're connecting nodes, create an edge
        if (connectingNode) {
          const newEdge = {
            id: `e-${connectingNode}-${nodeId}`,
            source: connectingNode,
            target: nodeId,
            type: "smoothstep",
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          }
          setEdges((edges) => [...edges, newEdge])
          setConnectingNode(null)
        }
      }

      closePopup()
    }
  }

  // Function to handle edge connections
  const onConnect = useCallback(
    (connection) => {
      if (connection.source && connection.target) {
        setEdges((eds) =>
          addEdge(
            {
              ...connection,
              type: "smoothstep",
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
            },
            eds
          )
        )
      }
    },
    [setEdges]
  )

  // Function to start connecting from a node
  const startConnecting = (nodeId) => {
    setConnectingNode(nodeId)
    openPopup("step") // Default to adding a step when connecting
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">WORKFLOW BUILDER</h1>
        <button className="bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded-md text-gray-700 flex items-center gap-1">
          <Save className="w-4 h-4" />
          <span>Save</span>
        </button>
      </div>

      {/* Features List */}
      <ul className="list-disc pl-5 mb-6 space-y-1">
        <li>Create and customize process flowdiagrams</li>
        <li>Drag and drop to add or rearrange steps</li>
        <li>Label each step clearly</li>
        <li>Set transition rules between steps</li>
      </ul>

      {/* Process Flow Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Process Flow</h2>
        <div className="flex flex-wrap gap-2">
          <button
            className="bg-green-600 text-white px-3 py-1 rounded-md flex items-center cursor-pointer "
            onClick={() => openPopup("start")}
          >
            <Plus className="w-4 h-4 mr-1" /> Add Start
          </button>
          <button
            className="bg-gray-300  px-3 py-1 rounded-md flex items-center cursor-pointer"
            onClick={() => openPopup("step")}
          >
            <Plus className="w-4 h-4 mr-1" /> Add Step
          </button>
          <button
            className="bg-gray-300  px-3 py-1 rounded-md flex items-center cursor-pointer"
            onClick={() => openPopup("decision")}
          >
            <Plus className="w-4 h-4 mr-1" /> Add Decision
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center cursor-pointer"
            onClick={() => openPopup("end")}
          >
            <Plus className="w-4 h-4 mr-1" /> Add End
          </button>
        </div>
      </div>

      {/* Process Flow Diagram */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Process Flow</h2>
        <div style={{ height: 500 }} className="border border-gray-300 rounded-md">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background />
              <Controls />
              <Panel position="top-right">
                <div className="bg-white p-2 rounded shadow-sm text-xs">
                  <p>Drag to connect nodes</p>
                  <p>Double-click to add connection</p>
                </div>
              </Panel>
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>

      {/* Popups for adding/editing elements */}
      {activePopup && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingNode ? "Edit" : "Add"} {activePopup.charAt(0).toUpperCase() + activePopup.slice(1)}
              </h3>
              <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <label htmlFor="elementLabel" className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <input
                type="text"
                id="elementLabel"
                value={editingLabel}
                onChange={(e) => setEditingLabel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${activePopup} label`}
              />
            </div>

            {activePopup === "decision" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Branches</label>
                <div className="flex gap-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="yesOption" defaultChecked className="mr-1" />
                    <label htmlFor="yesOption" className="text-sm">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="noOption" defaultChecked className="mr-1" />
                    <label htmlFor="noOption" className="text-sm">
                      No
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activePopup === "step" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Step Properties</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="task">Task</option>
                  <option value="approval">Approval</option>
                  <option value="notification">Notification</option>
                </select>
              </div>
            )}

            {connectingNode && (
              <div className="mb-4 p-2 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-700">
                  Connecting from another node. This new node will be automatically connected.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={closePopup}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={addNode}
                disabled={!editingLabel.trim()}
                className={`px-4 py-2 rounded-md text-white ${editingLabel.trim() ? "bg-[#00308F] hover:bg-blue-800" : "bg-gray-400 cursor-not-allowed"}`}
              >
                {editingNode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkflowDiagram