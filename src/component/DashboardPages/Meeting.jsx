import { Calendar, ChevronLeft, ChevronRight, Clock, FileText, Plus, Users, X, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Meeting = () => {
  // State
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(new Date());
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      name: 'Weekly Status',
      date: 'May 5, 2025',
      time: '10:00 AM',
      type: 'recurring',
      frequency: 'weekly',
      participants: ['Alice', 'Bob'],
      location: 'Conference Room A',
      agenda: ['Review progress', 'Plan next steps'],
    },
  ]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [formError, setFormError] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    type: 'recurring',
    frequency: 'weekly',
    participants: '',
    location: '',
    agenda: '',
  });

  // Constants
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // Calendar Generation
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const weeks = [];
    let week = Array(firstDay).fill(null);
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      weeks.push(week);
    }
    setWeeks(weeks);
  };

  useEffect(() => {
    generateCalendar();
  }, [currentMonth, currentYear]);

  // Modal handlers
  const openAddModal = () => {
    setModalMode('add');
    setFormData({
      name: '',
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      time: '',
      type: 'recurring',
      frequency: 'weekly',
      participants: '',
      location: '',
      agenda: '',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (meeting) => {
    setModalMode('edit');
    setCurrentMeeting(meeting);
    setFormData({
      name: meeting.name,
      date: meeting.date,
      time: meeting.time,
      type: meeting.type,
      frequency: meeting.frequency,
      participants: meeting.participants.join(', '),
      location: meeting.location,
      agenda: meeting.agenda.join(', '),
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openDeleteModal = (meeting) => {
    setCurrentMeeting(meeting);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMeeting(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentMeeting(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.date || !formData.time || !formData.location) {
      setFormError('Name, Date, Time, and Location are required.');
      return;
    }

    const newMeeting = {
      id: modalMode === 'add' ? Date.now() : currentMeeting.id,
      name: formData.name,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      frequency: formData.frequency,
      participants: formData.participants.split(',').map(p => p.trim()),
      location: formData.location,
      agenda: formData.agenda.split(',').map(a => a.trim()),
    };

    if (modalMode === 'add') {
      setMeetings([...meetings, newMeeting]);
    } else if (modalMode === 'edit' && currentMeeting) {
      setMeetings(meetings.map((m) => (m.id === currentMeeting.id ? newMeeting : m)));
    }

    closeModal();
  };

  const handleDelete = () => {
    setMeetings(meetings.filter((meeting) => meeting.id !== currentMeeting.id));
    setSelectedMeeting(null);
    closeDeleteModal();
  };

  // Functions
  const prevMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = prev === 0 ? 11 : prev - 1;
      if (newMonth === 11) setCurrentYear((year) => year - 1);
      return newMonth;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = prev === 11 ? 0 : prev + 1;
      if (newMonth === 0) setCurrentYear((year) => year + 1);
      return newMonth;
    });
  };

  const hasMeeting = (day) => {
    return meetings.some(
      (meeting) =>
        new Date(meeting.date).getDate() === day &&
        new Date(meeting.date).getMonth() === currentMonth &&
        new Date(meeting.date).getFullYear() === currentYear
    );
  };

  return (
    <div className="bg-white dark:bg-[#1E232E]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Meeting Scheduling */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1E232E] shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">Meeting Scheduling</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Setup recurring and ad-hoc meetings</p>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Types</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={openAddModal}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Weekly Status
                  </button>
                  <button
                    onClick={openAddModal}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Program Board
                  </button>
                  <button
                    onClick={openAddModal}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Steering Committee
                  </button>
                </div>
              </div>

              <button
                onClick={openAddModal}
                className="w-full flex items-center justify-center px-4 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded-md hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] cursor-pointer"
              >
                <Plus className="h-3 w-3 mr-1" /> Add Meeting
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1E232E] shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">Session Organization</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Create templates for:</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="workshop"
                  defaultChecked
                  className="h-4 w-4 text-[#00308F] dark:text-[#4A6CF7] rounded"
                />
                <label htmlFor="workshop" className="text-sm text-gray-700 dark:text-gray-300">Workshops</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="agenda"
                  defaultChecked
                  className="h-4 w-4 text-[#00308F] dark:text-[#4A6CF7] rounded"
                />
                <label htmlFor="agenda" className="text-sm text-gray-700 dark:text-gray-300">Agenda</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="preread"
                  defaultChecked
                  className="h-4 w-4 text-[#00308F] dark:text-[#4A6CF7] rounded"
                />
                <label htmlFor="preread" className="text-sm text-gray-700 dark:text-gray-300">Pre-read files</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="attendee"
                  defaultChecked
                  className="h-4 w-4 text-[#00308F] dark:text-[#4A6CF7] rounded"
                />
                <label htmlFor="attendee" className="text-sm text-gray-700 dark:text-gray-300">Attendee list</label>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Calendar */}
        <div className="bg-white dark:bg-[#1E232E] shadow rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
            >
              <ChevronLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
            >
              <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
          <div className="mb-4">
            <div className="grid grid-cols-7 gap-1 text-center">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-xs font-medium text-gray-500 dark:text-gray-400 py-1">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {weeks.flat().map((day, i) => (
                <div
                  key={i}
                  className={`
                    py-2 text-sm rounded-md relative
                    ${day === null ? 'text-gray-300 dark:text-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'}
                    ${day === date.getDate() &&
                      currentMonth === date.getMonth() &&
                      currentYear === date.getFullYear()
                      ? 'bg-white dark:bg-[#374151] text-gray-900 dark:text-gray-200'
                      : ''
                    }
                  `}
                  onClick={() => day && setDate(new Date(currentYear, currentMonth, day))}
                >
                  {day}
                  {day && hasMeeting(day) && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#00308F] dark:bg-[#4A6CF7] rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200">Upcoming Meetings</h3>
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className={`
                  p-2 rounded-md text-xs border-l-4 cursor-pointer
                  ${selectedMeeting === meeting.id
                    ? 'bg-[#00308F] dark:bg-[#4A6CF7] border-[#00308F] dark:border-[#4A6CF7] text-white'
                    : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                `}
                onClick={() => setSelectedMeeting(meeting.id)}
              >
                <div className="font-medium">{meeting.name}</div>
                <div className="text-gray-500 dark:text-gray-400 flex items-center mt-1">
                  <Calendar className="h-3 w-3 mr-1" /> {meeting.date}
                </div>
                <div className="text-gray-500 dark:text-gray-400 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" /> {meeting.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Meeting Details */}
        <div className="space-y-6">
          {selectedMeeting ? (
            <>
              {meetings
                .filter((m) => m.id === selectedMeeting)
                .map((meeting) => (
                  <div key={meeting.id} className="bg-white dark:bg-[#1E232E] shadow rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">{meeting.name}</h2>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(meeting)}
                          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(meeting)}
                          className="px-3 py-1 border border-red-500 dark:border-red-400 text-red-500 dark:text-red-400 rounded-md text-sm hover:bg-red-50 dark:hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          {meeting.date} at {meeting.time}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>
                          {meeting.type === 'recurring'
                            ? `${meeting.frequency.charAt(0).toUpperCase() + meeting.frequency.slice(1)
                            } meeting`
                            : 'One-time meeting'}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{meeting.participants.length} participants</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">Location</h3>
                        <div className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded">{meeting.location}</div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">Agenda</h3>
                        <ul className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded list-disc list-inside">
                          {meeting.agenda.map((item, index) => (
                            <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <div className="bg-white dark:bg-[#1E232E] shadow rounded-lg p-4 flex flex-col items-center justify-center h-full">
              <Calendar className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-center">Select a meeting from the calendar to view details</p>
              <button
                onClick={openAddModal}
                className="mt-4 flex items-center px-4 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded-md hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
              >
                <Plus className="h-3 w-3 mr-1" /> Schedule New Meeting
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit Meeting */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1E232E] rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                {modalMode === 'add' ? 'Add New Meeting' : 'Edit Meeting'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="e.g., 05-May-2025"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="e.g., 10:00 AM"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                >
                  <option value="recurring">Recurring</option>
                  <option value="onetime">One-time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Frequency</label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="adhoc">Ad-hoc</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Participants (comma-separated)</label>
                <input
                  type="text"
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  placeholder="e.g., Alice, Bob"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Agenda (comma-separated)</label>
                <input
                  type="text"
                  name="agenda"
                  value={formData.agenda}
                  onChange={handleInputChange}
                  placeholder="e.g., Review progress, Plan next steps"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded-md hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
              >
                {modalMode === 'add' ? 'Add Meeting' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1E232E] border border-gray-300 dark:border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Confirm Delete</h2>
              <button
                onClick={closeDeleteModal}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Are you sure you want to delete "{currentMeeting?.name}"?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meeting;