import React, { useState, useEffect } from 'react';
import { Calendar, Target, Plane, FileText, Upload, ChevronRight, Check, Clock, TrendingUp, Plus, X, DollarSign, MapPin, Edit2, Trash2, Save, BarChart3 } from 'lucide-react';

// Initial OKR data based on your 2026 scorecard
const initialOKRs = [
  {
    id: 1,
    category: "THOUGHT LEADERSHIP",
    weight: 15,
    objective: "Position AFP as the authoritative voice for the fundraising profession",
    keyResults: [
      { id: 'kr1a', text: "Deliver 5-6 high-profile speaking engagements", target: 6, current: 0, unit: "engagements" },
      { id: 'kr1b', text: "Publish 2-3 thought leadership pieces", target: 3, current: 0, unit: "pieces" },
      { id: 'kr1c', text: "Establish 2-3 strategic partnerships", target: 3, current: 0, unit: "partnerships" }
    ],
    color: "#4472c4"
  },
  {
    id: 2,
    category: "ORGANIZATIONAL TRANSFORMATION",
    weight: 20,
    objective: "Drive organizational transformation through FORGE Ahead",
    keyResults: [
      { id: 'kr2a', text: "Quarterly executive reviews completed", target: 4, current: 0, unit: "reviews" },
      { id: 'kr2b', text: "External thought leadership engagements", target: 3, current: 0, unit: "engagements" },
      { id: 'kr2c', text: "Strategic conversations with board/chapter leaders", target: 10, current: 0, unit: "conversations" }
    ],
    color: "#ed7d31"
  },
  {
    id: 3,
    category: "STAKEHOLDER RELATIONSHIPS",
    weight: 15,
    objective: "Strengthen strategic relationships across stakeholders",
    keyResults: [
      { id: 'kr3a', text: "Board member strategic meetings", target: 15, current: 0, unit: "meetings" },
      { id: 'kr3b', text: "Chapter engagement activities", target: 20, current: 0, unit: "activities" },
      { id: 'kr3c', text: "Foundation prospect cultivation meetings", target: 12, current: 0, unit: "meetings" },
      { id: 'kr3d', text: "Peer association leader relationships", target: 5, current: 0, unit: "relationships" }
    ],
    color: "#70ad47"
  },
  {
    id: 4,
    category: "INTERNAL LEADERSHIP",
    weight: 20,
    objective: "Deepen internal leadership presence and staff engagement",
    keyResults: [
      { id: 'kr4a', text: "All-staff sessions (quarterly)", target: 4, current: 0, unit: "sessions" },
      { id: 'kr4b', text: "Skip-level conversations", target: 24, current: 0, unit: "conversations" },
      { id: 'kr4c', text: "Department/team meeting participation", target: 6, current: 0, unit: "meetings" },
      { id: 'kr4d', text: "Informal staff gatherings", target: 4, current: 0, unit: "gatherings" },
      { id: 'kr4e', text: "Compensation framework communication sessions", target: 3, current: 0, unit: "sessions" }
    ],
    color: "#9b59b6"
  },
  {
    id: 5,
    category: "PEOPLE MANAGEMENT",
    weight: 15,
    objective: "Develop competitive employee compensation and rewards framework",
    keyResults: [
      { id: 'kr5a', text: "Board approval of compensation philosophy (Q2)", target: 1, current: 0, unit: "approval" },
      { id: 'kr5b', text: "Implementation completed by VP (Q4)", target: 1, current: 0, unit: "implementation" }
    ],
    color: "#e74c3c"
  },
  {
    id: 6,
    category: "FINANCIAL SUSTAINABILITY",
    weight: 15,
    objective: "Ensure long-term financial health and strategic resource allocation",
    keyResults: [
      { id: 'kr6a', text: "Reserves policy framework approved (Q2)", target: 1, current: 0, unit: "approval" },
      { id: 'kr6b', text: "Achieve budgeted addition to net assets", target: 1, current: 0, unit: "achieved" },
      { id: 'kr6c', text: "Foundation introductions facilitated", target: 5, current: 0, unit: "introductions" }
    ],
    color: "#1abc9c"
  }
];

export default function OKRTracker() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [okrs, setOkrs] = useState(initialOKRs);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [files, setFiles] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [editingKR, setEditingKR] = useState(null);
  const [newEventData, setNewEventData] = useState({ title: '', date: '', type: 'meeting', okrLink: '', notes: '' });
  const [newExpenseData, setNewExpenseData] = useState({ description: '', amount: '', date: '', category: 'travel', trip: '' });

  // Load data from storage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const okrData = await window.storage.get('afp-okrs');
        if (okrData) setOkrs(JSON.parse(okrData.value));
        
        const eventData = await window.storage.get('afp-events');
        if (eventData) setCalendarEvents(JSON.parse(eventData.value));
        
        const expenseData = await window.storage.get('afp-expenses');
        if (expenseData) setExpenses(JSON.parse(expenseData.value));
        
        const fileData = await window.storage.get('afp-files');
        if (fileData) setFiles(JSON.parse(fileData.value));
      } catch (e) {
        console.log('No saved data found, using defaults');
      }
    };
    loadData();
  }, []);

  // Save data to storage
  const saveData = async (key, data) => {
    try {
      await window.storage.set(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data:', e);
    }
  };

  const updateKRProgress = (okrId, krId, newValue) => {
    const updated = okrs.map(okr => {
      if (okr.id === okrId) {
        return {
          ...okr,
          keyResults: okr.keyResults.map(kr => 
            kr.id === krId ? { ...kr, current: Math.max(0, newValue) } : kr
          )
        };
      }
      return okr;
    });
    setOkrs(updated);
    saveData('afp-okrs', updated);
    setEditingKR(null);
  };

  const addCalendarEvent = () => {
    if (!newEventData.title || !newEventData.date) return;
    const newEvent = { ...newEventData, id: Date.now() };
    const updated = [...calendarEvents, newEvent];
    setCalendarEvents(updated);
    saveData('afp-events', updated);
    setNewEventData({ title: '', date: '', type: 'meeting', okrLink: '', notes: '' });
    setShowAddEvent(false);
  };

  const deleteEvent = (id) => {
    const updated = calendarEvents.filter(e => e.id !== id);
    setCalendarEvents(updated);
    saveData('afp-events', updated);
  };

  const addExpense = () => {
    if (!newExpenseData.description || !newExpenseData.amount) return;
    const newExp = { ...newExpenseData, id: Date.now(), amount: parseFloat(newExpenseData.amount) };
    const updated = [...expenses, newExp];
    setExpenses(updated);
    saveData('afp-expenses', updated);
    setNewExpenseData({ description: '', amount: '', date: '', category: 'travel', trip: '' });
    setShowAddExpense(false);
  };

  const deleteExpense = (id) => {
    const updated = expenses.filter(e => e.id !== id);
    setExpenses(updated);
    saveData('afp-expenses', updated);
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newFiles = uploadedFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      category: 'general'
    }));
    const updated = [...files, ...newFiles];
    setFiles(updated);
    saveData('afp-files', updated);
  };

  const deleteFile = (id) => {
    const updated = files.filter(f => f.id !== id);
    setFiles(updated);
    saveData('afp-files', updated);
  };

  const calculateOverallProgress = () => {
    let totalWeightedProgress = 0;
    okrs.forEach(okr => {
      const okrProgress = okr.keyResults.reduce((sum, kr) => {
        return sum + Math.min(100, (kr.current / kr.target) * 100);
      }, 0) / okr.keyResults.length;
      totalWeightedProgress += (okrProgress * okr.weight) / 100;
    });
    return Math.round(totalWeightedProgress);
  };

  const getEventTypeColor = (type) => {
    const colors = {
      meeting: '#4472c4',
      speaking: '#ed7d31',
      travel: '#70ad47',
      internal: '#9b59b6',
      other: '#95a5a6'
    };
    return colors[type] || colors.other;
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: '#e8e8e8',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '24px 32px',
        marginBottom: '24px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              margin: 0,
              background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              AFP CEO Performance Tracker
            </h1>
            <p style={{ margin: '8px 0 0', opacity: 0.7, fontSize: '14px' }}>2026 OKR Dashboard • Art Taylor</p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '12px',
            padding: '16px 24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#1a1a2e' }}>{calculateOverallProgress()}%</div>
            <div style={{ fontSize: '12px', color: '#1a1a2e', opacity: 0.8 }}>Overall Progress</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        background: 'rgba(255,255,255,0.05)',
        padding: '8px',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'okrs', label: 'OKRs', icon: Target },
          { id: 'calendar', label: 'Calendar', icon: Calendar },
          { id: 'expenses', label: 'Travel & Expenses', icon: Plane },
          { id: 'files', label: 'Documents', icon: FileText }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: activeTab === tab.id ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              color: activeTab === tab.id ? '#1a1a2e' : '#e8e8e8',
              fontWeight: activeTab === tab.id ? '600' : '400',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {okrs.map(okr => {
            const progress = okr.keyResults.reduce((sum, kr) => 
              sum + Math.min(100, (kr.current / kr.target) * 100), 0
            ) / okr.keyResults.length;
            
            return (
              <div key={okr.id} style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderLeft: `4px solid ${okr.color}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: '600', 
                    color: okr.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {okr.category}
                  </span>
                  <span style={{
                    background: okr.color,
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}>
                    {okr.weight}%
                  </span>
                </div>
                <h3 style={{ fontSize: '14px', margin: '0 0 16px', lineHeight: 1.4, fontWeight: '500' }}>
                  {okr.objective}
                </h3>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  height: '8px',
                  overflow: 'hidden',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${okr.color}, ${okr.color}88)`,
                    borderRadius: '8px',
                    transition: 'width 0.5s ease'
                  }} />
                </div>
                <div style={{ fontSize: '12px', opacity: 0.7, textAlign: 'right' }}>
                  {Math.round(progress)}% complete
                </div>
              </div>
            );
          })}
          
          {/* Quick Stats */}
          <div style={{
            gridColumn: 'span 3',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginTop: '8px'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}>
              <Calendar size={24} style={{ color: '#4facfe', marginBottom: '8px' }} />
              <div style={{ fontSize: '24px', fontWeight: '700' }}>{calendarEvents.length}</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>Scheduled Events</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}>
              <DollarSign size={24} style={{ color: '#00f2fe', marginBottom: '8px' }} />
              <div style={{ fontSize: '24px', fontWeight: '700' }}>${totalExpenses.toLocaleString()}</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>Total Expenses</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}>
              <FileText size={24} style={{ color: '#70ad47', marginBottom: '8px' }} />
              <div style={{ fontSize: '24px', fontWeight: '700' }}>{files.length}</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>Documents</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center'
            }}>
              <TrendingUp size={24} style={{ color: '#ed7d31', marginBottom: '8px' }} />
              <div style={{ fontSize: '24px', fontWeight: '700' }}>
                {okrs.reduce((sum, o) => sum + o.keyResults.filter(kr => kr.current >= kr.target).length, 0)}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>KRs Completed</div>
            </div>
          </div>
        </div>
      )}

      {/* OKRs Tab */}
      {activeTab === 'okrs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {okrs.map(okr => (
            <div key={okr.id} style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)',
              borderLeft: `4px solid ${okr.color}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: '600', 
                    color: okr.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {okr.category} • {okr.weight}% Weight
                  </span>
                  <h3 style={{ fontSize: '16px', margin: '8px 0 0', fontWeight: '600' }}>
                    {okr.objective}
                  </h3>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {okr.keyResults.map(kr => {
                  const progress = Math.min(100, (kr.current / kr.target) * 100);
                  const isComplete = kr.current >= kr.target;
                  
                  return (
                    <div key={kr.id} style={{
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '12px',
                      padding: '16px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '14px', flex: 1 }}>{kr.text}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {editingKR === kr.id ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input
                                type="number"
                                defaultValue={kr.current}
                                min="0"
                                style={{
                                  width: '60px',
                                  padding: '6px 10px',
                                  borderRadius: '6px',
                                  border: '1px solid rgba(255,255,255,0.2)',
                                  background: 'rgba(255,255,255,0.1)',
                                  color: '#fff',
                                  fontSize: '14px'
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    updateKRProgress(okr.id, kr.id, parseInt(e.target.value) || 0);
                                  }
                                }}
                                autoFocus
                              />
                              <button
                                onClick={(e) => {
                                  const input = e.target.parentElement.querySelector('input');
                                  updateKRProgress(okr.id, kr.id, parseInt(input.value) || 0);
                                }}
                                style={{
                                  background: '#4facfe',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '6px',
                                  cursor: 'pointer',
                                  display: 'flex'
                                }}
                              >
                                <Save size={16} color="#1a1a2e" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <span style={{ 
                                fontWeight: '600',
                                color: isComplete ? '#4facfe' : '#fff'
                              }}>
                                {kr.current} / {kr.target} {kr.unit}
                              </span>
                              <button
                                onClick={() => setEditingKR(kr.id)}
                                style={{
                                  background: 'rgba(255,255,255,0.1)',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '6px',
                                  cursor: 'pointer',
                                  display: 'flex'
                                }}
                              >
                                <Edit2 size={14} color="#fff" />
                              </button>
                            </>
                          )}
                          {isComplete && <Check size={18} color="#4facfe" />}
                        </div>
                      </div>
                      <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        height: '6px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${progress}%`,
                          height: '100%',
                          background: isComplete ? '#4facfe' : okr.color,
                          borderRadius: '6px',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>Calendar & Events</h2>
            <button
              onClick={() => setShowAddEvent(true)}
              style={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                color: '#1a1a2e',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Plus size={18} /> Add Event
            </button>
          </div>

          {showAddEvent && (
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '20px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0 }}>Add New Event</h3>
                <button onClick={() => setShowAddEvent(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={20} color="#fff" />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <input
                  placeholder="Event Title"
                  value={newEventData.title}
                  onChange={(e) => setNewEventData({ ...newEventData, title: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                />
                <input
                  type="date"
                  value={newEventData.date}
                  onChange={(e) => setNewEventData({ ...newEventData, date: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                />
                <select
                  value={newEventData.type}
                  onChange={(e) => setNewEventData({ ...newEventData, type: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                >
                  <option value="meeting">Board/Stakeholder Meeting</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="travel">Travel</option>
                  <option value="internal">Internal/Staff Event</option>
                  <option value="other">Other</option>
                </select>
                <select
                  value={newEventData.okrLink}
                  onChange={(e) => setNewEventData({ ...newEventData, okrLink: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Link to OKR (optional)</option>
                  {okrs.map(okr => (
                    <option key={okr.id} value={okr.id}>{okr.category}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Notes"
                  value={newEventData.notes}
                  onChange={(e) => setNewEventData({ ...newEventData, notes: e.target.value })}
                  style={{
                    gridColumn: 'span 2',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '14px',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                />
              </div>
              <button
                onClick={addCalendarEvent}
                style={{
                  marginTop: '16px',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  color: '#1a1a2e',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Save Event
              </button>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {calendarEvents.length === 0 ? (
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Calendar size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                <p style={{ opacity: 0.5 }}>No events scheduled yet. Add your first event above.</p>
              </div>
            ) : (
              calendarEvents
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map(event => (
                  <div key={event.id} style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderLeft: `4px solid ${getEventTypeColor(event.type)}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '600' }}>{event.title}</span>
                        <span style={{
                          background: getEventTypeColor(event.type),
                          color: '#fff',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '10px',
                          textTransform: 'uppercase'
                        }}>
                          {event.type}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={14} />
                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      {event.notes && <p style={{ fontSize: '13px', margin: '8px 0 0', opacity: 0.8 }}>{event.notes}</p>}
                    </div>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} color="#e74c3c" />
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>
      )}

      {/* Expenses Tab */}
      {activeTab === 'expenses' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px' }}>Travel & Expenses</h2>
              <p style={{ margin: '4px 0 0', opacity: 0.7, fontSize: '14px' }}>
                Total: <strong>${totalExpenses.toLocaleString()}</strong>
              </p>
            </div>
            <button
              onClick={() => setShowAddExpense(true)}
              style={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                color: '#1a1a2e',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Plus size={18} /> Add Expense
            </button>
          </div>

          {showAddExpense && (
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '20px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0 }}>Add New Expense</h3>
                <button onClick={() => setShowAddExpense(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={20} color="#fff" />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <input
                  placeholder="Description"
                  value={newExpenseData.description}
                  onChange={(e) => setNewExpenseData({ ...newExpenseData, description: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                />
                <input
                  type="number"
                  placeholder="Amount ($)"
                  value={newExpenseData.amount}
                  onChange={(e) => setNewExpenseData({ ...newExpenseData, amount: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                />
                <input
                  type="date"
                  value={newExpenseData.date}
                  onChange={(e) => setNewExpenseData({ ...newExpenseData, date: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                />
                <select
                  value={newExpenseData.category}
                  onChange={(e) => setNewExpenseData({ ...newExpenseData, category: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                >
                  <option value="travel">Travel (Airfare)</option>
                  <option value="hotel">Hotel</option>
                  <option value="meals">Meals</option>
                  <option value="transport">Ground Transport</option>
                  <option value="other">Other</option>
                </select>
                <input
                  placeholder="Trip/Event Name"
                  value={newExpenseData.trip}
                  onChange={(e) => setNewExpenseData({ ...newExpenseData, trip: e.target.value })}
                  style={{
                    gridColumn: 'span 2',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                />
              </div>
              <button
                onClick={addExpense}
                style={{
                  marginTop: '16px',
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  color: '#1a1a2e',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Save Expense
              </button>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {expenses.length === 0 ? (
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <DollarSign size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                <p style={{ opacity: 0.5 }}>No expenses recorded yet. Add your first expense above.</p>
              </div>
            ) : (
              expenses
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(expense => (
                  <div key={expense.id} style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '600' }}>{expense.description}</span>
                        <span style={{
                          background: 'rgba(255,255,255,0.1)',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '10px',
                          textTransform: 'uppercase'
                        }}>
                          {expense.category}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', opacity: 0.7 }}>
                        {expense.trip && <span><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />{expense.trip} • </span>}
                        {expense.date && new Date(expense.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '18px', fontWeight: '700', color: '#4facfe' }}>
                        ${expense.amount.toLocaleString()}
                      </span>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={16} color="#e74c3c" />
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      )}

      {/* Files Tab */}
      {activeTab === 'files' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>Documents & Files</h2>
            <label style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              color: '#1a1a2e',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Upload size={18} /> Upload Files
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '20px',
            border: '2px dashed rgba(255,255,255,0.2)',
            textAlign: 'center'
          }}>
            <Upload size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
            <p style={{ margin: 0, opacity: 0.7 }}>Drag and drop files here, or click "Upload Files" above</p>
            <p style={{ margin: '8px 0 0', fontSize: '12px', opacity: 0.5 }}>
              Supports receipts, reports, presentations, and other documentation
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {files.map(file => (
              <div key={file.id} style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <FileText size={32} style={{ color: '#4facfe' }} />
                  <button
                    onClick={() => deleteFile(file.id)}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={14} color="#e74c3c" />
                  </button>
                </div>
                <h4 style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  fontWeight: '500',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {file.name}
                </h4>
                <p style={{ margin: '8px 0 0', fontSize: '12px', opacity: 0.5 }}>
                  {(file.size / 1024).toFixed(1)} KB • {new Date(file.uploadDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {files.length === 0 && (
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <FileText size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <p style={{ opacity: 0.5 }}>No documents uploaded yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
