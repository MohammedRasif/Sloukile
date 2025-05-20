import { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Set the workerSrc for react-pdf to use the CDN-hosted worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function DocumentLibrary() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showLinkingPanel, setShowLinkingPanel] = useState(false);
  const [showApprovalFlow, setShowApprovalFlow] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfFileUrl, setPdfFileUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const fileInputRef = useRef(null);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Project Charter v1.0",
      type: "DOCX",
      size: "245 KB",
      modified: "Apr 15, 2024",
      status: "Approved",
      category: "Planning",
      owner: "John Smith",
      version: "1.0",
      linkedTo: ["Project Initiation", "Milestone 1"],
      approvers: [
        { name: "Jane Cooper", status: "Approved", date: "Apr 12, 2024" },
        { name: "Robert Fox", status: "Approved", date: "Apr 13, 2024" },
      ],
      versions: [
        { version: "1.0", date: "Apr 15, 2024", author: "John Smith", notes: "Final approved version" },
        { version: "0.9", date: "Apr 10, 2024", author: "John Smith", notes: "Pre-approval review" },
        { version: "0.8", date: "Apr 5, 2024", author: "John Smith", notes: "Initial draft" },
      ],
    },
    {
      id: 2,
      name: "Requirements Specification",
      type: "PDF",
      size: "1.2 MB",
      modified: "Apr 10, 2024",
      status: "In Review",
      category: "Requirements",
      owner: "Emily Davis",
      version: "2.3",
      linkedTo: ["Design Phase", "Development Phase"],
      approvers: [
        { name: "Jane Cooper", status: "Approved", date: "Apr 9, 2024" },
        { name: "Robert Fox", status: "Pending", date: null },
      ],
      versions: [
        { version: "2.3", date: "Apr 10, 2024", author: "Emily Davis", notes: "Updated requirements based on feedback" },
        { version: "2.2", date: "Apr 5, 2024", author: "Emily Davis", notes: "Added security requirements" },
        { version: "2.1", date: "Mar 30, 2024", author: "Emily Davis", notes: "Initial version" },
      ],
    },
    {
      id: 3,
      name: "Design Mockups",
      type: "ZIP",
      size: "4.5 MB",
      modified: "Apr 5, 2024",
      status: "Approved",
      category: "Design",
      owner: "Michael Brown",
      version: "3.0",
      linkedTo: ["UI Development", "Milestone 2"],
      approvers: [
        { name: "Jane Cooper", status: "Approved", date: "Apr 3, 2024" },
        { name: "Robert Fox", status: "Approved", date: "Apr 4, 2024" },
      ],
      versions: [
        { version: "3.0", date: "Apr 5, 2024", author: "Michael Brown", notes: "Final approved mockups" },
        { version: "2.0", date: "Mar 25, 2024", author: "Michael Brown", notes: "Revised based on user testing" },
        { version: "1.0", date: "Mar 15, 2024", author: "Michael Brown", notes: "Initial mockups" },
      ],
    },
    {
      id: 4,
      name: "User Training Guide",
      type: "PDF",
      size: "2.8 MB",
      modified: "Mar 28, 2024",
      status: "Draft",
      category: "Training",
      owner: "Sarah Johnson",
      version: "0.5",
      linkedTo: ["Training Phase", "User Onboarding"],
      approvers: [
        { name: "Jane Cooper", status: "Pending", date: null },
        { name: "Robert Fox", status: "Pending", date: null },
      ],
      versions: [
        { version: "0.5", date: "Mar 28, 2024", author: "Sarah Johnson", notes: "Initial draft for review" },
      ],
    },
    
  ]);

  const milestones = [
    { id: 1, name: "Project Initiation", date: "Jan 15, 2024", status: "Completed" },
    { id: 2, name: "Requirements Gathering", date: "Feb 15, 2024", status: "Completed" },
    { id: 3, name: "Design Phase", date: "Mar 30, 2024", status: "In Progress" },
    { id: 4, name: "Development Phase", date: "May 30, 2024", status: "Not Started" },
  ];

  const stages = [
    { id: 1, name: "Planning", status: "Completed", documents: 2 },
    { id: 2, name: "Design", status: "In Progress", documents: 1 },
    { id: 3, name: "Development", status: "Not Started", documents: 1 },
  ];

  const [trainingMaterials, setTrainingMaterials] = useState([
    { id: 1, name: "User Guide", audience: "End Users", format: "PDF", status: "Draft" },
    { id: 2, name: "Admin Manual", audience: "Administrators", format: "PDF", status: "Not Started" },
    { id: 3, name: "Video Tutorials", audience: "End Users", format: "MP4", status: "Not Started" },
  ]);

  const [linkForm, setLinkForm] = useState({
    milestone: "none",
    stage: "none",
    task: "none",
  });

  const [approvalForm, setApprovalForm] = useState({
    approver: "none",
    level: "required",
    notify: true,
  });

  // Collect all unique project names from linkedTo
  const projects = [
    ...new Set(documents.flatMap((doc) => doc.linkedTo)),
  ].map((name, index) => ({
    id: index + 1,
    name,
  }));

  const getStatusBadge = (status) => {
    const styles = {
      Approved: "bg-green-100 text-green-800",
      "In Review": "bg-yellow-100 text-yellow-800",
      Draft: "bg-gray-100 text-gray-800",
      Completed: "bg-green-100 text-green-800",
      "In Progress": "bg-[#00308F] text-white",
      "Not Started": "bg-gray-100 text-gray-800",
    };
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          styles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const getDocumentIcon = (type) => {
    const colors = {
      PDF: "text-red-500",
      DOCX: "text-[#00308F]",
      XLSX: "text-green-500",
      PPTX: "text-orange-500",
      ZIP: "text-purple-500",
    };
    return (
      <svg
        className={`h-6 w-6 ${colors[type] || "text-gray-500"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    );
  };

  const getApprovalStatusIcon = (status) => {
    const icons = {
      Approved: {
        class: "text-green-500",
        path: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      },
      Pending: {
        class: "text-yellow-500",
        path: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      },
    };
    const { class: iconClass, path } =
      icons[status] || {
        class: "text-gray-500",
        path: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      };
    return (
      <svg
        className={`h-5 w-5 ${iconClass}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
      </svg>
    );
  };

  const handleDocumentClick = (doc, projectId) => {
    setSelectedDocument((prev) =>
      prev?.id === doc.id && prev?.projectId === projectId ? null : { ...doc, projectId }
    );
    setShowVersionHistory(false);
    setShowLinkingPanel(false);
    setShowApprovalFlow(false);
  };

  const handleUploadDocument = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newDocument = {
        id: documents.length + 1,
        name: file.name,
        type: file.name.split(".").pop().toUpperCase(),
        size: `${(file.size / 1024).toFixed(2)} KB`,
        modified: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        status: "Draft",
        category: "General",
        owner: "Unknown",
        version: "1.0",
        linkedTo: [],
        approvers: [],
        versions: [
          {
            version: "1.0",
            date: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
            author: "Unknown",
            notes: "Initial draft",
          },
        ],
        file,
      };
      setDocuments([...documents, newDocument]);
      console.log("Uploaded document:", newDocument);
      fileInputRef.current.value = "";
    }
  };

  const handleViewDocument = (doc) => {
    if (doc.type === "PDF" && doc.file) {
      const fileUrl = URL.createObjectURL(doc.file);
      setPdfFileUrl(fileUrl);
      setShowPdfModal(true);
      setPageNumber(1);
      console.log(`Viewing PDF: ${doc.name}`);
    } else {
      console.log(`Cannot view document: ${doc.name}. Only PDF files are supported.`);
      alert("Only PDF files can be viewed. Please upload a PDF or download the document.");
    }
  };



  const handleAddDocumentToStage = (stage) => {
    console.log(`Add document to stage: ${stage.name}`);
  };

  const handleLinkDocumentToMilestone = (milestone) => {
    console.log(`Link document to milestone: ${milestone.name}`);
  };

  const handleAddTrainingMaterial = () => {
    const newMaterial = {
      id: trainingMaterials.length + 1,
      name: `New Training Material ${trainingMaterials.length + 1}`,
      audience: "End Users",
      format: "PDF",
      status: "Draft",
    };
    setTrainingMaterials([...trainingMaterials, newMaterial]);
    console.log("Added new training material:", newMaterial);
  };

  const handleViewTrainingMaterial = (material) => {
    console.log(`View training material: ${material.name}`);
  };

  const handleEditTrainingMaterial = (material) => {
    console.log(`Edit training material: ${material.name}`);
  };

  const handleAddLink = () => {
    if (!selectedDocument) return;

    const newLink = [];
    if (linkForm.milestone !== "none") {
      const milestone = milestones.find((m) => m.id.toString() === linkForm.milestone);
      if (milestone) newLink.push(milestone.name);
    }
    if (linkForm.stage !== "none") {
      const stage = stages.find((s) => s.id.toString() === linkForm.stage);
      if (stage) newLink.push(stage.name);
    }
    if (linkForm.task !== "none") {
      const tasks = {
        task1: "UI Development",
        task2: "API Development",
        task3: "User Testing",
      };
      if (tasks[linkForm.task]) newLink.push(tasks[linkForm.task]);
    }

    if (newLink.length > 0) {
      setDocuments(
        documents.map((doc) =>
          doc.id === selectedDocument.id
            ? { ...doc, linkedTo: [...new Set([...doc.linkedTo, ...newLink])] }
            : doc
        )
      );
      setSelectedDocument({
        ...selectedDocument,
        linkedTo: [...new Set([...selectedDocument.linkedTo, ...newLink])],
      });
      console.log("Added links:", newLink);
    }
    setLinkForm({ milestone: "none", stage: "none", task: "none" });
    setShowLinkingPanel(false);
  };

  const handleRemoveLink = (link) => {
    if (!selectedDocument) return;
    setDocuments(
      documents.map((doc) =>
        doc.id === selectedDocument.id
          ? { ...doc, linkedTo: doc.linkedTo.filter((l) => l !== link) }
          : doc
      )
    );
    setSelectedDocument({
      ...selectedDocument,
      linkedTo: selectedDocument.linkedTo.filter((l) => l !== link),
    });
    console.log(`Removed link: ${link}`);
  };

  const handleLinkClick = (link) => {
    console.log(`Navigated to linked item: ${link}`);
  };

  const handleAddApprover = () => {
    if (!selectedDocument || approvalForm.approver === "none") return;

    const approvers = {
      jane: "Jane Cooper",
      robert: "Robert Fox",
      alice: "Alice Johnson",
    };
    const newApprover = {
      name: approvers[approvalForm.approver],
      status: "Pending",
      date: null,
    };

    setDocuments(
      documents.map((doc) =>
        doc.id === selectedDocument.id
          ? { ...doc, approvers: [...doc.approvers, newApprover] }
          : doc
      )
    );
    setSelectedDocument({
      ...selectedDocument,
      approvers: [...selectedDocument.approvers, newApprover],
    });
    console.log(
      `Added approver: ${newApprover.name}, Level: ${approvalForm.level}, Notify: ${approvalForm.notify}`
    );
    setApprovalForm({ approver: "none", level: "required", notify: true });
    setShowApprovalFlow(false);
  };

  const closePdfModal = () => {
    setShowPdfModal(false);
    if (pdfFileUrl) {
      URL.revokeObjectURL(pdfFileUrl);
      setPdfFileUrl(null);
    }
    setNumPages(null);
    setPageNumber(1);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) =>
      Math.min(Math.max(prevPageNumber + offset, 1), numPages)
    );
  };

  return (
    <div className="container mx-auto py-6">
      {/* Hidden File Input for Upload */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".docx,.pdf,.zip,.pptx,.xlsx"
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Document Library</h1>
        </div>
        <button
          onClick={handleUploadDocument}
          className="bg-[#00308F] text-white px-4 py-2 rounded-md hover:bg-[#002070] flex items-center"
        >
          <svg
            className="h-4 w-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Upload Document
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">Documents</h2>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          {["all", "stages", "milestones", "training"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-[#00308F] text-[#00308F]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "all"
                ? "All Documents"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* All Documents Tab */}
        {activeTab === "all" && (
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">{project.name}</h3>
                <div className="grid grid-cols-1 gap-4">
                  {documents
                    .filter((doc) => doc.linkedTo.includes(project.name))
                    .map((doc) => (
                      <div key={doc.id}>
                        <div
                          className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                            selectedDocument?.id === doc.id &&
                            selectedDocument?.projectId === project.id
                              ? "border-[#00308F] bg-[#00308F]/10"
                              : "border-gray-200"
                          }`}
                          onClick={() => handleDocumentClick(doc, project.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              {getDocumentIcon(doc.type)}
                              <div>
                                <h3 className="font-medium">{doc.name}</h3>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <span className="mr-3">{doc.type}</span>
                                  <span className="mr-3">{doc.size}</span>
                                  <span className="flex items-center">
                                    <svg
                                      className="h-3 w-3 mr-1"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    {doc.modified}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              {getStatusBadge(doc.status)}
                              <span className="text-xs text-gray-500 mt-1">
                                v{doc.version}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <svg
                                className="h-3 w-3 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                />
                              </svg>
                              {doc.category}
                            </span>
                            {doc.linkedTo.length > 0 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                <svg
                                  className="h-3 w-3 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                  />
                                </svg>
                                {doc.linkedTo.length} links
                              </span>
                            )}
                          </div>
                        </div>
                        {/* Document Detail Panel */}
                        {selectedDocument?.id === doc.id &&
                          selectedDocument?.projectId === project.id && (
                            <div className="mt-4 bg-white p-6 rounded-lg shadow">
                              <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center">
                                  {getDocumentIcon(selectedDocument.type)}
                                  <div className="ml-3">
                                    <h2 className="text-xl font-semibold">
                                      {selectedDocument.name}
                                    </h2>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                      <span className="mr-3">Version {selectedDocument.version}</span>
                                      <span className="mr-3">{selectedDocument.type}</span>
                                      <span className="flex items-center">
                                        <svg
                                          className="h-3 w-3 mr-1"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                        </svg>
                                        Last modified: {selectedDocument.modified}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Document Information */}
                                <div className="space-y-4 -mt-[2px]">
                                  <div>
                                    <h3 className="text-sm font-medium mb-2">
                                      Document Information
                                    </h3>
                                    <div className="bg-gray-50 p-3 rounded-md space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">Owner:</span>
                                        <span className="text-sm font-medium">
                                          {selectedDocument.owner}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">Category:</span>
                                        <span className="text-sm font-medium">
                                          {selectedDocument.category}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">Status:</span>
                                        <span className="text-sm">
                                          {getStatusBadge(selectedDocument.status)}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-500">Size:</span>
                                        <span className="text-sm font-medium">
                                          {selectedDocument.size}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Smart Links */}
                                  <div>
                                    <div className="flex justify-between items-center mb-2">
                                      <h3 className="text-sm font-medium">Smart Links</h3>
                                      <button
                                        className="text-[#00308F] hover:text-[#002070] text-sm"
                                        onClick={() => setShowLinkingPanel(!showLinkingPanel)}
                                      >
                                        {showLinkingPanel ? "Hide" : "Manage Links"}
                                      </button>
                                    </div>
                                    {showLinkingPanel ? (
                                      <div className="bg-[#00308F]/10 p-3 rounded-md space-y-3">
                                        <div>
                                          <label className="text-xs font-medium text-[#00308F]">
                                            Link to Milestone
                                          </label>
                                          <select
                                            value={linkForm.milestone}
                                            onChange={(e) =>
                                              setLinkForm({
                                                ...linkForm,
                                                milestone: e.target.value,
                                              })
                                            }
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00308F]"
                                          >
                                            <option value="none">Select milestone</option>
                                            {milestones.map((m) => (
                                              <option key={m.id} value={m.id}>
                                                {m.name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        <div>
                                          <label className="text-xs font-medium text-[#00308F]">
                                            Link to Stage
                                          </label>
                                          <select
                                            value={linkForm.stage}
                                            onChange={(e) =>
                                              setLinkForm({
                                                ...linkForm,
                                                stage: e.target.value,
                                              })
                                            }
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00308F]"
                                          >
                                            <option value="none">Select stage</option>
                                            {stages.map((s) => (
                                              <option key={s.id} value={s.id}>
                                                {s.name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        <div>
                                          <label className="text-xs font-medium text-[#00308F]">
                                            Link to Task
                                          </label>
                                          <select
                                            value={linkForm.task}
                                            onChange={(e) =>
                                              setLinkForm({
                                                ...linkForm,
                                                task: e.target.value,
                                              })
                                            }
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00308F]"
                                          >
                                            <option value="none">Select task</option>
                                            <option value="task1">UI Development</option>
                                            <option value="task2">API Development</option>
                                            <option value="task3">User Testing</option>
                                          </select>
                                        </div>
                                        <button
                                          onClick={handleAddLink}
                                          className="w-full bg-[#00308F] text-white px-3 py-2 rounded-md hover:bg-[#002070] text-sm"
                                        >
                                          Add Link
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="bg-gray-50 p-3 rounded-md">
                                        {selectedDocument.linkedTo.length > 0 ? (
                                          <div className="space-y-2">
                                            {selectedDocument.linkedTo.map((link, index) => (
                                              <div
                                                key={index}
                                                className="flex justify-between items-center"
                                              >
                                                <div className="flex items-center">
                                                  <svg
                                                    className="h-3 w-3 text-[#00308F] mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                                    />
                                                  </svg>
                                                  <button
                                                    onClick={() => handleLinkClick(link)}
                                                    className="text-sm text-[#00308F] hover:underline"
                                                  >
                                                    {link}
                                                  </button>
                                                </div>
                                                <button
                                                  onClick={() => handleRemoveLink(link)}
                                                  className="text-gray-500 hover:text-gray-700"
                                                >
                                                  <svg
                                                    className="h-3 w-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M6 18L18 6M6 6l12 12"
                                                    />
                                                  </svg>
                                                </button>
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <div className="text-sm text-gray-500 text-center py-2">
                                            No links yet
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Approval Workflow and Version History */}
                                <div className="space-y-4">
                                  <div>
                                    <div className="flex justify-between items-center mb-2">
                                      <h3 className="text-sm font-medium">Approval Workflow</h3>
                                      <button
                                        className="text-[#00308F] hover:text-[#002070] text-sm"
                                        onClick={() => setShowApprovalFlow(!showApprovalFlow)}
                                      >
                                        {showApprovalFlow ? "Hide" : "Manage Approvals"}
                                      </button>
                                    </div>
                                    {showApprovalFlow ? (
                                      <div className="bg-[#00308F]/10 p-3 rounded-md space-y-3">
                                        <div>
                                          <label className="text-xs font-medium text-[#00308F]">
                                            Add Approver
                                          </label>
                                          <select
                                            value={approvalForm.approver}
                                            onChange={(e) =>
                                              setApprovalForm({
                                                ...approvalForm,
                                                approver: e.target.value,
                                              })
                                            }
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00308F]"
                                          >
                                            <option value="none">Select approver</option>
                                            <option value="jane">Jane Cooper</option>
                                            <option value="robert">Robert Fox</option>
                                            <option value="alice">Alice Johnson</option>
                                          </select>
                                        </div>
                                        <div>
                                          <label className="text-xs font-medium text-[#00308F]">
                                            Approval Level
                                          </label>
                                          <select
                                            value={approvalForm.level}
                                            onChange={(e) =>
                                              setApprovalForm({
                                                ...approvalForm,
                                                level: e.target.value,
                                              })
                                            }
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00308F]"
                                          >
                                            <option value="required">Required</option>
                                            <option value="optional">Optional</option>
                                          </select>
                                        </div>
                                        <div className="flex items-center">
                                          <input
                                            type="checkbox"
                                            id="notify"
                                            checked={approvalForm.notify}
                                            onChange={(e) =>
                                              setApprovalForm({
                                                ...approvalForm,
                                                notify: e.target.checked,
                                              })
                                            }
                                            className="h-4 w-4 text-[#00308F] border-gray-300 rounded focus:ring-[#00308F]"
                                          />
                                          <label
                                            htmlFor="notify"
                                            className="ml-2 text-xs text-[#00308F]"
                                          >
                                            Send email notification
                                          </label>
                                        </div>
                                        <button
                                          onClick={handleAddApprover}
                                          className="w-full bg-[#00308F] text-white px-3 py-2 rounded-md hover:bg-[#002070] text-sm"
                                        >
                                          Add Approver
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="bg-gray-50 p-3 rounded-md">
                                        {selectedDocument.approvers.length > 0 ? (
                                          <div className="space-y-2">
                                            {selectedDocument.approvers.map((approver, index) => (
                                              <div
                                                key={index}
                                                className="flex justify-between items-center"
                                              >
                                                <div className="flex items-center">
                                                  <div className="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center mr-2 text-xs">
                                                    {approver.name.charAt(0)}
                                                  </div>
                                                  <span className="text-sm">{approver.name}</span>
                                                </div>
                                                <div className="flex items-center">
                                                  {getApprovalStatusIcon(approver.status)}
                                                  <span className="text-xs ml-1">
                                                    {approver.status}
                                                  </span>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <div className="text-sm text-gray-500 text-center py-2">
                                            No approvers yet
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  <div>
                                    <div className="flex justify-between items-center mb-2">
                                      <h3 className="text-sm font-medium">Version History</h3>
                                      <button
                                        className="text-[#00308F] hover:text-[#002070] text-sm"
                                        onClick={() => setShowVersionHistory(!showVersionHistory)}
                                      >
                                        {showVersionHistory ? "Hide" : "Show History"}
                                      </button>
                                    </div>
                                    {showVersionHistory ? (
                                      <div className="bg-gray-50 p-3 rounded-md space-y-3 max-h-60 overflow-y-auto">
                                        {selectedDocument.versions.map((version, index) => (
                                          <div
                                            key={index}
                                            className="border-b border-gray-200 pb-2 last:border-0 last:pb-0"
                                          >
                                            <div className="flex justify-between items-center">
                                              <div className="flex items-center">
                                                <svg
                                                  className="h-3 w-3 text-[#00308F] mr-2"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  viewBox="0 0 24 24"
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                  />
                                                </svg>
                                                <span className="text-sm font-medium">
                                                  v{version.version}
                                                </span>
                                              </div>
                                              <span className="text-xs text-gray-500">
                                                {version.date}
                                              </span>
                                            </div>
                                            <div className="mt-1 text-xs text-gray-500">
                                              By {version.author}
                                            </div>
                                            <div className="mt-1 text-xs">{version.notes}</div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="bg-gray-50 p-3 rounded-md">
                                        <div className="flex justify-between items-center">
                                          <div className="flex items-center">
                                            <svg
                                              className="h-3 w-3 text-[#00308F] mr-2"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                              />
                                            </svg>
                                            <span className="text-sm font-medium">
                                              Current: v{selectedDocument.version}
                                            </span>
                                          </div>
                                          <span className="text-xs text-gray-500">
                                            {selectedDocument.modified}
                                          </span>
                                        </div>
                                        <div className="mt-1 text-xs text-gray-500">
                                          {selectedDocument.versions.length} previous versions
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Document Preview */}
                                <div>
                                  <h3 className="text-sm font-medium mb-2">Document Preview</h3>
                                  <div className="bg-gray-50 p-3 rounded-md h-64 flex items-center justify-center">
                                    <div className="text-center">
                                      {getDocumentIcon(selectedDocument.type)}
                                      <p className="text-sm text-gray-500 mt-2">
                                        Preview not available
                                      </p>
                                      <button
                                        onClick={() => handleViewDocument(selectedDocument)}
                                        className="mt-3 bg-[#00308F] text-white px-3 py-2 rounded-md hover:bg-[#002070] flex items-center text-sm mx-auto"
                                      >
                                        <svg
                                          className="h-4 w-4 mr-1"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                          />
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                          />
                                        </svg>
                                        Open Document
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stages Tab */}
        {activeTab === "stages" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">{stage.name}</h3>
                  {getStatusBadge(stage.status)}
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  {stage.documents} document{stage.documents !== 1 ? "s" : ""}
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => console.log(`View stage: ${stage.name}`)}
                    className="text-[#00308F] hover:text-[#002070] flex items-center text-sm"
                  >
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View
                  </button>
                  <button
                    onClick={() => handleAddDocumentToStage(stage)}
                    className="text-[#00308F] hover:text-[#002070] flex items-center text-sm"
                  >
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Document
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Milestones Tab */}
        {activeTab === "milestones" && (
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{milestone.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <svg
                        className="h-3 w-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {milestone.date}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(milestone.status)}
                    <button
                      onClick={() => console.log(`Toggle milestone details: ${milestone.name}`)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {documents.filter((d) => d.linkedTo.includes(milestone.name)).length} linked
                    documents
                  </div>
                  <button
                    onClick={() => handleLinkDocumentToMilestone(milestone)}
                    className="text-[#00308F] hover:text-[#002070] flex items-center text-sm"
                  >
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    Link Document
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Training Materials Tab */}
        {activeTab === "training" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Training Materials</h3>
              <button
                onClick={handleAddTrainingMaterial}
                className="text-[#00308F] hover:text-[#002070] flex items-center text-sm"
              >
                <svg
                  className="h-4 w-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Training Material
              </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Audience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Format
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trainingMaterials.map((material) => (
                  <tr key={material.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#00308F]">
                      {material.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {material.audience}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {material.format}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(material.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleViewTrainingMaterial(material)}
                        className="text-[#00308F] hover:text-[#002070] mr-4"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditTrainingMaterial(material)}
                        className="text-[#00308F] hover:text-[#002070]"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PDF Modal */}
      {showPdfModal && pdfFileUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl relative">
            <button
              onClick={closePdfModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl font-semibold mb-4">{selectedDocument?.name}</h2>
            <div className="max-h-[70vh] overflow-y-auto">
              <Document
                file={pdfFileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                className="flex justify-center"
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
            {numPages && (
              <div className="flex justify-center items-center mt-4 space-x-4">
                <button
                  onClick={() => changePage(-1)}
                  disabled={pageNumber <= 1}
                  className="px-3 py-1 bg-[#00308F] text-white rounded-md disabled:bg-gray-300 hover:bg-[#002070]"
                >
                  Previous
                </button>
                <p className="text-sm">
                  Page {pageNumber} of {numPages}
                </p>
                <button
                  onClick={() => changePage(1)}
                  disabled={pageNumber >= numPages}
                  className="px-3 py-1 bg-[#00308F] text-white rounded-md disabled:bg-gray-300 hover:bg-[#002070]"
                >
                  Next
                </button>
              </div>
            )}
            <button
              onClick={() => handleDownloadDocument(selectedDocument)}
              className="mt-4 bg-[#00308F] text-white px-4 py-2 rounded-md hover:bg-[#002070] flex items-center mx-auto"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentLibrary;