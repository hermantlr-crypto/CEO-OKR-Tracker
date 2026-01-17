<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AFP CEO Performance Tracker 2026</title>
  <!-- PDF.js library for extracting text from PDFs -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <script>
    // Set PDF.js worker (with error handling for mobile)
    try {
      if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
    } catch(e) {
      console.warn('PDF.js not available:', e);
    }
  </script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { min-height: 100vh; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); font-family: 'Segoe UI', system-ui, sans-serif; color: #e8e8e8; padding: 20px; }
    
    .setup-banner { background: linear-gradient(135deg, #f39c12, #e74c3c); border-radius: 12px; padding: 24px; margin-bottom: 20px; }
    .setup-banner h2 { margin-bottom: 12px; font-size: 20px; }
    .setup-banner input { width: 100%; padding: 12px; border-radius: 8px; border: none; font-size: 14px; margin-bottom: 12px; }
    .setup-banner .btn-row { display: flex; gap: 10px; flex-wrap: wrap; }
    .setup-banner button { padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px; }
    .btn-save { background: #fff; color: #e74c3c; }
    .btn-skip { background: rgba(255,255,255,0.2); color: #fff; }
    
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 16px; }
    .header h1 { font-size: 24px; font-weight: 600; }
    .header p { opacity: 0.7; font-size: 14px; }
    .header-right { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    
    .sync-status { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 20px; font-size: 12px; font-weight: 500; }
    .sync-status.online { background: rgba(39, 174, 96, 0.2); color: #27ae60; }
    .sync-status.offline { background: rgba(231, 76, 60, 0.2); color: #e74c3c; }
    .sync-status.syncing { background: rgba(52, 152, 219, 0.2); color: #3498db; }
    
    .user-badge { background: rgba(255,255,255,0.1); padding: 8px 14px; border-radius: 20px; font-size: 13px; cursor: pointer; }
    .user-badge:hover { background: rgba(255,255,255,0.15); }
    
    .progress-box { background: rgba(79, 172, 254, 0.15); padding: 12px 20px; border-radius: 12px; text-align: center; }
    .progress-box .number { font-size: 28px; font-weight: 700; color: #4facfe; }
    .progress-box .label { font-size: 11px; text-transform: uppercase; opacity: 0.7; }
    
    .nav-tabs { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
    .nav-tab { background: rgba(255,255,255,0.05); border: none; padding: 10px 18px; border-radius: 8px; color: #e8e8e8; cursor: pointer; font-size: 13px; transition: all 0.2s; }
    .nav-tab:hover { background: rgba(255,255,255,0.1); }
    .nav-tab.active { background: linear-gradient(135deg, #4facfe, #00f2fe); color: #1a1a2e; font-weight: 600; }
    
    .tab-content { display: none; }
    .tab-content.active { display: block; }
    
    .okr-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; }
    
    .okr-card { background: rgba(255,255,255,0.05); border-radius: 16px; padding: 20px; cursor: pointer; transition: all 0.3s; border-left: 4px solid; }
    .okr-card:hover { transform: translateY(-2px); background: rgba(255,255,255,0.08); }
    .okr-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .okr-category { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.7; }
    .okr-weight { background: rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 12px; font-size: 11px; }
    .okr-objective { font-size: 15px; font-weight: 500; margin-bottom: 16px; line-height: 1.4; }
    
    .progress-bar { height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; margin-bottom: 12px; }
    .progress-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
    
    .kr-list { font-size: 13px; }
    .kr-item { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .kr-item:last-child { border-bottom: none; }
    .kr-text { opacity: 0.85; flex: 1; }
    .kr-value { font-weight: 600; margin-left: 12px; }
    .kr-complete { color: #27ae60; }
    
    .modal { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 1000; align-items: center; justify-content: center; padding: 20px; }
    .modal.active { display: flex; }
    .modal-content { background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 16px; max-width: 700px; width: 100%; max-height: 90vh; overflow-y: auto; }
    .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .modal-header h2 { font-size: 18px; }
    .close-modal { background: none; border: none; color: #e8e8e8; font-size: 24px; cursor: pointer; padding: 4px 8px; }
    .modal-body { padding: 20px; }
    
    .edit-section { margin-bottom: 20px; }
    .edit-section h3 { font-size: 14px; margin-bottom: 12px; opacity: 0.7; }
    .edit-row { display: grid; grid-template-columns: 1fr 100px 100px 40px; gap: 10px; margin-bottom: 10px; align-items: center; }
    .edit-row input { width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; font-size: 13px; }
    .edit-row input:focus { outline: none; border-color: #4facfe; }
    .edit-row .check-btn { width: 36px; height: 36px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3); background: none; color: #e8e8e8; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }
    .edit-row .check-btn.checked { background: #27ae60; border-color: #27ae60; }
    
    .notes-area { width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; font-size: 13px; min-height: 80px; resize: vertical; font-family: inherit; }
    .notes-area:focus { outline: none; border-color: #4facfe; }
    
    .attachment-section { background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px; margin-top: 16px; }
    .attachment-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
    .attachment-item { background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px; font-size: 12px; display: flex; align-items: center; gap: 8px; }
    .attachment-item button { background: none; border: none; color: #e74c3c; cursor: pointer; font-size: 14px; }
    .file-input-wrapper { position: relative; overflow: hidden; display: inline-block; }
    .file-input-wrapper input[type=file] { position: absolute; left: 0; top: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
    .file-input-btn { padding: 10px 16px; background: rgba(255,255,255,0.1); border: 1px dashed rgba(255,255,255,0.3); border-radius: 8px; color: #e8e8e8; font-size: 13px; cursor: pointer; }
    
    .btn-primary { background: linear-gradient(135deg, #4facfe, #00f2fe); color: #1a1a2e; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; }
    .btn-secondary { background: rgba(255,255,255,0.1); color: #e8e8e8; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 14px; }
    .btn-row-modal { display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px; }
    
    .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-top: 16px; }
    .calendar-header { text-align: center; font-size: 11px; font-weight: 600; padding: 8px; opacity: 0.6; }
    .calendar-day { aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 6px; border-radius: 8px; font-size: 12px; background: rgba(255,255,255,0.03); cursor: pointer; }
    .calendar-day:hover { background: rgba(255,255,255,0.08); }
    .calendar-day.today { background: rgba(79, 172, 254, 0.2); border: 1px solid #4facfe; }
    .calendar-day.has-event { position: relative; }
    .calendar-day .event-dot { width: 6px; height: 6px; border-radius: 50%; margin-top: 4px; }
    .calendar-day.other-month { opacity: 0.3; }
    
    .calendar-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .calendar-nav button { background: rgba(255,255,255,0.1); border: none; color: #e8e8e8; padding: 8px 16px; border-radius: 8px; cursor: pointer; }
    .calendar-nav h3 { font-size: 16px; }
    
    .event-list { margin-top: 20px; }
    .event-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 10px; margin-bottom: 8px; }
    .event-date { text-align: center; min-width: 50px; }
    .event-date .day { font-size: 20px; font-weight: 700; }
    .event-date .month { font-size: 10px; text-transform: uppercase; opacity: 0.6; }
    .event-details { flex: 1; }
    .event-title { font-weight: 500; margin-bottom: 2px; }
    .event-type { font-size: 11px; padding: 3px 8px; border-radius: 10px; display: inline-block; }
    .event-type.board { background: rgba(231, 76, 60, 0.2); color: #e74c3c; }
    .event-type.speaking { background: rgba(155, 89, 182, 0.2); color: #9b59b6; }
    .event-type.travel { background: rgba(52, 152, 219, 0.2); color: #3498db; }
    .event-type.meeting { background: rgba(39, 174, 96, 0.2); color: #27ae60; }
    .event-type.deadline { background: rgba(243, 156, 18, 0.2); color: #f39c12; }
    
    .add-btn { background: rgba(255,255,255,0.1); border: 2px dashed rgba(255,255,255,0.2); border-radius: 12px; padding: 16px; text-align: center; cursor: pointer; font-size: 14px; transition: all 0.2s; }
    .add-btn:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.3); }
    
    .expense-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    .expense-table th, .expense-table td { padding: 12px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 13px; }
    .expense-table th { font-weight: 600; opacity: 0.7; font-size: 11px; text-transform: uppercase; }
    .expense-amount { font-weight: 600; color: #4facfe; }
    .expense-category { padding: 4px 10px; border-radius: 12px; font-size: 11px; background: rgba(255,255,255,0.1); }
    
    .expense-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 20px; }
    .expense-summary-card { background: rgba(255,255,255,0.05); padding: 16px; border-radius: 12px; text-align: center; }
    .expense-summary-card .amount { font-size: 24px; font-weight: 700; color: #4facfe; }
    .expense-summary-card .label { font-size: 11px; opacity: 0.6; text-transform: uppercase; margin-top: 4px; }
    
    .activity-list { max-height: 500px; overflow-y: auto; }
    .activity-item { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; }
    .activity-item:last-child { border-bottom: none; }
    .activity-user { color: #4facfe; font-weight: 500; }
    .activity-action { opacity: 0.8; }
    .activity-time { font-size: 11px; opacity: 0.5; margin-top: 4px; }
    
    .report-modal { background: #fff; color: #333; max-width: 800px; }
    .report-header { background: linear-gradient(135deg, #1a1a2e, #16213e); color: #fff; padding: 30px; text-align: center; }
    .report-header h1 { font-size: 24px; margin-bottom: 8px; }
    .report-header p { opacity: 0.8; }
    .report-body { padding: 30px; }
    .report-summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 30px; }
    .report-stat { text-align: center; padding: 16px; background: #f8f9fa; border-radius: 12px; }
    .report-stat .value { font-size: 28px; font-weight: 700; color: #1a1a2e; }
    .report-stat .label { font-size: 11px; color: #666; text-transform: uppercase; }
    .report-okr { margin-bottom: 24px; padding: 20px; border: 1px solid #eee; border-radius: 12px; }
    .report-okr-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .report-okr-category { font-weight: 600; font-size: 16px; }
    .report-okr-progress { font-size: 20px; font-weight: 700; }
    .report-kr { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
    .report-kr:last-child { border-bottom: none; }
    .report-actions { padding: 20px; border-top: 1px solid #eee; display: flex; gap: 12px; justify-content: center; }
    .report-actions button { padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; }
    
    .loading-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(26,26,46,0.95); z-index: 2000; display: flex; align-items: center; justify-content: center; flex-direction: column; }
    .loading-overlay.hidden { display: none; }
    .spinner { width: 50px; height: 50px; border: 4px solid rgba(79,172,254,0.2); border-top-color: #4facfe; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text { margin-top: 16px; opacity: 0.7; }
    
    .hidden { display: none !important; }
    
    @media (max-width: 768px) {
      .header { text-align: center; justify-content: center; }
      .header-right { justify-content: center; width: 100%; }
      .okr-grid { grid-template-columns: 1fr; }
      .edit-row { grid-template-columns: 1fr; }
      .edit-row input { margin-bottom: 8px; }
      .report-summary { grid-template-columns: repeat(2, 1fr); }
      .calendar-grid { font-size: 10px; }
    }
    
    @media print {
      body { background: #fff; }
      .report-modal { position: static; max-width: none; box-shadow: none; }
      .report-actions { display: none; }
    }
    
    /* KR Block with Attachments */
    .kr-block { background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px; margin-bottom: 16px; border-left: 3px solid #4facfe; }
    .kr-attachments { margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); }
    .kr-attachment-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 13px; opacity: 0.8; }
    .add-file-btn { padding: 6px 12px; background: rgba(79,172,254,0.2); border: 1px dashed rgba(79,172,254,0.5); border-radius: 6px; color: #4facfe; font-size: 12px; cursor: pointer; }
    .add-file-btn:hover { background: rgba(79,172,254,0.3); }
    .kr-attachment-list { display: flex; flex-direction: column; gap: 6px; }
    .no-attachments { font-size: 12px; opacity: 0.4; padding: 8px 0; }
    .attachment-item { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: rgba(255,255,255,0.05); border-radius: 8px; font-size: 12px; }
    .att-icon { font-size: 16px; }
    .att-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .att-date { font-size: 10px; opacity: 0.5; }
    .att-view { background: none; border: none; color: #4facfe; cursor: pointer; font-size: 11px; padding: 4px 8px; }
    .att-delete { background: none; border: none; color: #e74c3c; cursor: pointer; font-size: 16px; padding: 4px; }
    
    /* Drag and Drop Zone */
    .drop-zone-overlay { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(79,172,254,0.15); z-index: 9999; align-items: center; justify-content: center; pointer-events: none; }
    .drop-zone-overlay.active { display: flex; }
    .drop-zone-box { background: rgba(26,26,46,0.95); border: 3px dashed #4facfe; border-radius: 20px; padding: 60px 80px; text-align: center; animation: pulse 1.5s infinite; }
    .drop-zone-box .icon { font-size: 64px; margin-bottom: 16px; }
    .drop-zone-box .text { font-size: 24px; font-weight: 600; color: #4facfe; }
    .drop-zone-box .subtext { font-size: 14px; opacity: 0.7; margin-top: 8px; }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
    
    /* Droppable areas highlight */
    .droppable { transition: all 0.2s; }
    .droppable.drag-over { background: rgba(79,172,254,0.2) !important; border-color: #4facfe !important; }
  </style>
</head>
<body>
  <!-- Drop Zone Overlay -->
  <div class="drop-zone-overlay" id="drop-zone-overlay">
    <div class="drop-zone-box">
      <div class="icon">📎</div>
      <div class="text">Drop files here</div>
      <div class="subtext">PDFs, images, documents</div>
    </div>
  </div>

  <!-- Hidden file input for KR attachments -->
  <input type="file" id="kr-file-input" style="display:none;" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt" onchange="handleKRFileUpload(event)">
  
  <!-- Loading Overlay -->
  <div class="loading-overlay" id="loading">
    <div class="spinner"></div>
    <p class="loading-text">Loading data...</p>
  </div>
  <script>
    // Fallback: force hide loading after 5 seconds if something fails
    setTimeout(function() {
      var loadEl = document.getElementById('loading');
      if (loadEl && !loadEl.classList.contains('hidden')) {
        console.warn('Loading timeout - forcing display');
        loadEl.classList.add('hidden');
      }
    }, 5000);
  </script>

  <!-- Setup Banner -->
  <div class="setup-banner" id="setup-banner" style="display:none;">
    <h2>🔗 Connect to Google Sheets</h2>
    <p style="margin-bottom:12px;opacity:0.9;">Paste your Google Apps Script Web App URL below to enable syncing:</p>
    <input type="text" id="api-url-input" placeholder="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec">
    <div style="margin-bottom:12px;">
      <label style="font-size:13px;opacity:0.9;">Your Name (for activity tracking):</label>
      <input type="text" id="user-name-input" placeholder="e.g., Art Taylor" style="margin-top:6px;">
    </div>
    <div class="btn-row">
      <button class="btn-save" onclick="saveApiConfig()">Connect & Sync</button>
      <button class="btn-skip" onclick="skipSetup()">Use Offline Mode</button>
    </div>
  </div>

  <!-- Header -->
  <div class="header">
    <div>
      <h1>AFP CEO Performance Tracker</h1>
      <p>2026 OKR Dashboard</p>
    </div>
    <div class="header-right">
      <div class="sync-status syncing" id="sync-status">
        <span id="sync-text">Connecting...</span>
      </div>
      <span id="data-count" style="font-size: 10px; opacity: 0.5; padding: 0 8px;" title="Folders, Notes, Events"></span>
      <button onclick="showAppSettings()" style="background: rgba(255,255,255,0.1); border: none; padding: 8px 12px; border-radius: 20px; color: #e8e8e8; cursor: pointer; font-size: 13px;">⚙️</button>
      <div class="user-badge" id="user-badge" onclick="changeUser()">
        👤 <span id="current-user">Anonymous</span>
      </div>
      <div class="progress-box">
        <div class="number" id="overall-progress">0%</div>
        <div class="label">Overall Progress</div>
      </div>
    </div>
  </div>
  
  <!-- App Settings Modal -->
  <div class="modal" id="app-settings-modal">
    <div class="modal-content" style="max-width: 500px;">
      <div class="modal-header">
        <h2>⚙️ App Settings</h2>
        <button class="close-modal" onclick="closeModal('app-settings-modal')">×</button>
      </div>
      <div class="modal-body">
        <label style="display: block; font-size: 13px; margin-bottom: 6px;">Google Sheets API URL</label>
        <input type="text" id="settings-api-url" placeholder="Paste your Google Apps Script Web App URL here..." style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; margin-bottom: 8px;">
        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
          <button onclick="saveApiUrl()" style="flex: 1; padding: 10px; background: rgba(39,174,96,0.3); border: none; border-radius: 8px; color: #27ae60; cursor: pointer;">💾 Save URL</button>
          <button onclick="copyApiUrl()" style="flex: 1; padding: 10px; background: rgba(79,172,254,0.2); border: none; border-radius: 8px; color: #4facfe; cursor: pointer;">📋 Copy URL</button>
        </div>
        <p style="font-size: 11px; opacity: 0.5; margin-bottom: 16px;">Paste the Web App URL from Google Apps Script, then click Save.</p>
        
        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; margin-bottom: 16px;">
          <h4 style="font-size: 14px; margin-bottom: 12px;">🔄 Server Sync</h4>
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <button onclick="pushToServer()" style="flex: 1; padding: 10px; background: rgba(79,172,254,0.2); border: none; border-radius: 8px; color: #4facfe; cursor: pointer;">⬆️ Push to Server</button>
            <button onclick="pullFromServer()" style="flex: 1; padding: 10px; background: rgba(39,174,96,0.2); border: none; border-radius: 8px; color: #27ae60; cursor: pointer;">⬇️ Pull from Server</button>
          </div>
          <p style="font-size: 11px; opacity: 0.5;">Push sends your local data to Google Sheets. Pull overwrites local with server data.</p>
        </div>
        
        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; margin-bottom: 16px;">
          <h4 style="font-size: 14px; margin-bottom: 12px;">📦 Backup & Restore Data</h4>
          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <button onclick="exportData()" style="flex: 1; padding: 10px; background: rgba(39,174,96,0.2); border: none; border-radius: 8px; color: #27ae60; cursor: pointer;">💾 Export Data</button>
            <button onclick="triggerImportData()" style="flex: 1; padding: 10px; background: rgba(155,89,182,0.2); border: none; border-radius: 8px; color: #9b59b6; cursor: pointer;">📥 Import Data</button>
          </div>
          <input type="file" id="import-data-input" style="display:none;" accept=".json" onchange="importData(event)">
          <p style="font-size: 11px; opacity: 0.5;">Export saves all your OKRs, folders, notes, and events to a file. Import restores from a backup.</p>
        </div>
        
        <button onclick="resetApp()" style="width: 100%; padding: 10px; background: rgba(231,76,60,0.2); border: none; border-radius: 8px; color: #e74c3c; cursor: pointer;">🗑️ Reset App (Clear All Local Data)</button>
      </div>
    </div>
  </div>
  
  <!-- Navigation Tabs -->
  <div class="nav-tabs">
    <button class="nav-tab active" data-tab="dashboard">📊 Dashboard</button>
    <button class="nav-tab" data-tab="ai-assistant">🤖 AI Assistant</button>
    <button class="nav-tab" data-tab="folders">📁 Folders</button>
    <button class="nav-tab" data-tab="notes">📝 Notes</button>
    <button class="nav-tab" data-tab="calendar">📅 Calendar</button>
    <button class="nav-tab" data-tab="expenses">✈️ Expenses</button>
    <button class="nav-tab" data-tab="activity">📜 Activity</button>
    <button class="nav-tab" data-tab="report">📄 Report</button>
  </div>
  
  <!-- Dashboard Tab -->
  <div id="dashboard" class="tab-content active">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <p style="opacity: 0.7; font-size: 14px;">Click any objective to view details and update progress.</p>
      <button onclick="showAddOKRModal()" style="padding: 10px 20px; background: linear-gradient(135deg, #4facfe, #00f2fe); border: none; border-radius: 8px; color: #1a1a2e; font-weight: 600; cursor: pointer; font-size: 14px;">+ Add OKR</button>
    </div>
    <div class="okr-grid" id="okr-grid"></div>
  </div>
  
  <!-- AI Assistant Tab -->
  <div id="ai-assistant" class="tab-content">
    <div style="display: flex; flex-direction: column; height: calc(100vh - 220px); min-height: 500px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 style="font-size: 18px;">🤖 AI Performance Coach</h3>
        <button onclick="showAISettings()" style="background: rgba(255,255,255,0.1); border: none; padding: 8px 16px; border-radius: 8px; color: #e8e8e8; cursor: pointer; font-size: 13px;">⚙️ API Key</button>
      </div>
      
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
        <button onclick="askAI('How am I tracking overall against my 2026 OKRs?')" style="padding: 8px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; font-size: 12px; cursor: pointer; color: #e8e8e8;">How am I tracking?</button>
        <button onclick="askAI('What should I focus on this week?')" style="padding: 8px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; font-size: 12px; cursor: pointer; color: #e8e8e8;">What to focus on?</button>
        <button onclick="askAI('Write a brief progress update for the board')" style="padding: 8px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; font-size: 12px; cursor: pointer; color: #e8e8e8;">Draft board update</button>
        <button onclick="askAI('Which key results are at risk?')" style="padding: 8px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; font-size: 12px; cursor: pointer; color: #e8e8e8;">What's at risk?</button>
        <button onclick="askAI('Review all my attached images and documents and summarize the key information')" style="padding: 8px 14px; background: rgba(79,172,254,0.15); border: 1px solid rgba(79,172,254,0.3); border-radius: 20px; font-size: 12px; cursor: pointer; color: #4facfe;">📎 Analyze attachments</button>
        <button onclick="askAI('Search for the latest news and trends in nonprofit fundraising')" style="padding: 8px 14px; background: rgba(39,174,96,0.15); border: 1px solid rgba(39,174,96,0.3); border-radius: 20px; font-size: 12px; cursor: pointer; color: #27ae60;">🔍 Web search</button>
      </div>
      
      <div id="ai-chat-messages" style="flex: 1; overflow-y: auto; background: rgba(0,0,0,0.2); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; gap: 12px; margin-bottom: 16px;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">🤖</div>
          <div style="background: rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 12px; font-size: 14px; line-height: 1.5;">
            <p>Hi Art! I'm your AI Performance Coach. I can help with your OKRs, analyze your documents, and 🔍 search the web for information. Click ⚙️ API Key to get started.</p>
          </div>
        </div>
      </div>
      
      <div style="display: flex; gap: 12px;">
        <textarea id="ai-chat-input" placeholder="Ask about your OKRs..." rows="2" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendAIMessage();}" style="flex: 1; padding: 14px; border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; background: rgba(255,255,255,0.05); color: #e8e8e8; font-size: 14px; font-family: inherit; resize: none;"></textarea>
        <button onclick="startVoiceInput('ai-chat-input')" id="ai-voice-btn" style="padding: 14px 16px; background: rgba(255,255,255,0.1); border: none; border-radius: 12px; color: #e8e8e8; cursor: pointer; font-size: 18px;" title="Voice input">🎤</button>
        <button id="ai-send-btn" onclick="sendAIMessage()" style="padding: 14px 24px; background: linear-gradient(135deg, #667eea, #764ba2); border: none; border-radius: 12px; color: #fff; font-weight: 600; cursor: pointer;">Send</button>
      </div>
    </div>
  </div>
  
  <!-- AI Settings Modal -->
  <div class="modal" id="ai-settings-modal">
    <div class="modal-content" style="max-width: 450px;">
      <div class="modal-header">
        <h2>🤖 AI Settings</h2>
        <button class="close-modal" onclick="closeModal('ai-settings-modal')">×</button>
      </div>
      <div class="modal-body">
        <label style="display: block; font-size: 13px; margin-bottom: 6px;">Anthropic API Key</label>
        <input type="password" id="anthropic-api-key" placeholder="sk-ant-..." style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; margin-bottom: 16px;">
        <p style="font-size: 11px; opacity: 0.5; margin-bottom: 16px;">Key is stored locally in your browser only.</p>
        <button onclick="saveAISettings()" class="btn-primary" style="width: 100%;">Save</button>
      </div>
    </div>
  </div>
  
  <!-- KR Item Modal -->
  <div class="modal" id="kr-item-modal" style="z-index: 2000;">
    <div class="modal-content" style="max-width: 650px; max-height: 85vh; overflow-y: auto;">
      <div class="modal-header" style="position:sticky;top:0;background:#1a1a2e;z-index:1;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.1);">
        <div>
          <h2 id="kr-item-modal-title" style="margin-bottom:4px;">📁 Item</h2>
        </div>
        <button class="close-modal" onclick="closeKRItemModal()">×</button>
      </div>
      <div class="modal-body" style="padding-top:16px;">
        
        <!-- Header with name and status -->
        <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;">
          <div style="flex:1;min-width:200px;">
            <label style="display:block;font-size:12px;opacity:0.6;margin-bottom:4px;">Name</label>
            <input type="text" id="kr-item-name" placeholder="e.g., Microsoft Partnership" style="width:100%;padding:12px;border:1px solid rgba(255,255,255,0.2);border-radius:8px;background:rgba(255,255,255,0.05);color:#e8e8e8;font-size:15px;font-weight:500;">
          </div>
          <div style="width:160px;">
            <label style="display:block;font-size:12px;opacity:0.6;margin-bottom:4px;">Status</label>
            <select id="kr-item-status" style="width:100%;padding:12px;border:1px solid rgba(255,255,255,0.2);border-radius:8px;background:rgba(255,255,255,0.05);color:#e8e8e8;">
              <option value="Not Started">⚪ Not Started</option>
              <option value="In Progress" selected>🔵 In Progress</option>
              <option value="On Hold">🟡 On Hold</option>
              <option value="Complete">🟢 Complete</option>
            </select>
          </div>
        </div>
        
        <!-- Notes Section -->
        <div style="margin-bottom:20px;background:rgba(0,0,0,0.2);border-radius:10px;padding:14px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <label style="font-size:14px;font-weight:600;">📝 Notes & Comments</label>
            <div style="display:flex;gap:6px;">
              <button onclick="showItemAIPrompt()" style="background:rgba(155,89,182,0.2);border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:12px;color:#9b59b6;">🤖 AI Assist</button>
              <button onclick="startVoiceInput(this, 'kr-item-notes')" style="background:rgba(79,172,254,0.2);border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:12px;">🎤 Voice</button>
            </div>
          </div>
          
          <!-- AI Prompt Input (hidden by default) -->
          <div id="item-ai-prompt-section" style="display:none;margin-bottom:12px;padding:12px;background:rgba(155,89,182,0.1);border:1px solid rgba(155,89,182,0.3);border-radius:8px;">
            <div style="font-size:12px;margin-bottom:8px;color:#9b59b6;">
              🤖 AI can read your uploaded PDFs. Tell it what to do:
            </div>
            <div style="display:flex;gap:8px;">
              <input type="text" id="item-ai-instruction" placeholder="e.g., Summarize the PDF, Extract action items, Clean up my notes..." style="flex:1;padding:10px;border:1px solid rgba(155,89,182,0.3);border-radius:6px;background:rgba(255,255,255,0.05);color:#e8e8e8;font-size:13px;">
              <button onclick="runItemAI()" style="padding:10px 16px;background:#9b59b6;border:none;border-radius:6px;color:#fff;cursor:pointer;font-size:12px;white-space:nowrap;">Run AI</button>
              <button onclick="hideItemAIPrompt()" style="padding:10px 12px;background:rgba(255,255,255,0.1);border:none;border-radius:6px;color:#fff;cursor:pointer;font-size:12px;">✕</button>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
              <button onclick="setItemAIInstruction('Summarize the uploaded documents')" style="padding:4px 8px;background:rgba(255,255,255,0.1);border:none;border-radius:4px;color:#ccc;cursor:pointer;font-size:11px;">📄 Summarize docs</button>
              <button onclick="setItemAIInstruction('Extract key points and action items')" style="padding:4px 8px;background:rgba(255,255,255,0.1);border:none;border-radius:4px;color:#ccc;cursor:pointer;font-size:11px;">✅ Action items</button>
              <button onclick="setItemAIInstruction('Clean up and organize my notes')" style="padding:4px 8px;background:rgba(255,255,255,0.1);border:none;border-radius:4px;color:#ccc;cursor:pointer;font-size:11px;">✨ Clean up notes</button>
              <button onclick="setItemAIInstruction('List key contacts and next steps')" style="padding:4px 8px;background:rgba(255,255,255,0.1);border:none;border-radius:4px;color:#ccc;cursor:pointer;font-size:11px;">👥 Contacts & next steps</button>
            </div>
          </div>
          
          <div id="item-ai-status" style="display:none;padding:10px;border-radius:6px;margin-bottom:10px;font-size:12px;"></div>
          
          <textarea id="kr-item-notes" placeholder="Add notes, meeting summaries, action items, comments..." style="width:100%;padding:12px;border:1px solid rgba(255,255,255,0.15);border-radius:8px;background:rgba(255,255,255,0.03);color:#e8e8e8;min-height:140px;resize:vertical;font-size:13px;line-height:1.6;"></textarea>
        </div>
        
        <!-- Files Section -->
        <div style="margin-bottom:20px;background:rgba(0,0,0,0.2);border-radius:10px;padding:14px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <label style="font-size:14px;font-weight:600;">📎 Documents & Files</label>
            <button onclick="document.getElementById('kr-item-file-input').click()" style="background:rgba(79,172,254,0.2);border:none;padding:8px 14px;border-radius:6px;cursor:pointer;font-size:12px;color:#4facfe;">+ Add File</button>
          </div>
          <input type="file" id="kr-item-file-input" style="display:none;" onchange="handleItemFileUpload(event)" multiple>
          <div id="kr-item-files-list" style="max-height:200px;overflow-y:auto;"></div>
        </div>
        
        <!-- Links Section -->
        <div style="margin-bottom:20px;background:rgba(0,0,0,0.2);border-radius:10px;padding:14px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <label style="font-size:14px;font-weight:600;">🔗 Links</label>
            <button onclick="toggleItemLinkForm()" id="add-link-btn" style="background:rgba(79,172,254,0.2);border:none;padding:8px 14px;border-radius:6px;cursor:pointer;font-size:12px;color:#4facfe;">+ Add Link</button>
          </div>
          <div id="kr-item-link-form" style="display:none;margin-bottom:12px;padding:12px;background:rgba(255,255,255,0.03);border-radius:8px;">
            <input type="text" id="kr-item-link-title" placeholder="Link title (e.g., Partner Portal)" style="width:100%;padding:10px;border:1px solid rgba(255,255,255,0.2);border-radius:6px;background:rgba(255,255,255,0.05);color:#e8e8e8;font-size:13px;margin-bottom:8px;">
            <div style="display:flex;gap:8px;">
              <input type="url" id="kr-item-link-url" placeholder="https://..." style="flex:1;padding:10px;border:1px solid rgba(255,255,255,0.2);border-radius:6px;background:rgba(255,255,255,0.05);color:#e8e8e8;font-size:13px;">
              <button onclick="addItemLink()" style="padding:10px 16px;background:#27ae60;border:none;border-radius:6px;color:#fff;cursor:pointer;font-size:12px;">Add</button>
              <button onclick="toggleItemLinkForm()" style="padding:10px 12px;background:rgba(255,255,255,0.1);border:none;border-radius:6px;color:#fff;cursor:pointer;font-size:12px;">✕</button>
            </div>
          </div>
          <div id="kr-item-links-list" style="max-height:150px;overflow-y:auto;"></div>
        </div>
        
        <!-- Action Buttons -->
        <div style="display:flex;gap:10px;margin-top:20px;">
          <button onclick="saveKRItem()" class="btn-primary" style="flex:1;padding:14px;font-size:14px;">💾 Save Changes</button>
          <button onclick="confirmDeleteKRItem()" id="delete-item-btn" style="padding:14px 20px;background:rgba(231,76,60,0.2);border:1px solid rgba(231,76,60,0.3);border-radius:8px;color:#e74c3c;cursor:pointer;font-size:14px;">🗑️</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Folders Tab -->
  <div id="folders" class="tab-content">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
      <h3 style="font-size: 18px;">📁 Conversation Folders</h3>
      <button onclick="showAddFolderModal()" style="padding: 10px 20px; background: linear-gradient(135deg, #4facfe, #00f2fe); border: none; border-radius: 8px; color: #1a1a2e; font-weight: 600; cursor: pointer; font-size: 13px;">+ New Folder</button>
    </div>
    <p style="font-size: 13px; opacity: 0.7; margin-bottom: 16px;">Organize conversations with your Board Chair, SG Team, etc. Add links and transcripts for AI analysis.</p>
    <div id="folders-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;"></div>
  </div>
  
  <!-- Folder View Modal -->
  <div class="modal" id="folder-view-modal">
    <div class="modal-content" style="max-width: 650px; max-height: 80vh; overflow-y: auto;">
      <div class="modal-header">
        <h2 id="folder-view-title">Folder</h2>
        <button class="close-modal" onclick="closeModal('folder-view-modal')">×</button>
      </div>
      <div class="modal-body">
        <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
          <button onclick="addFolderItem('link')" style="padding: 10px 16px; background: rgba(79,172,254,0.2); border: none; border-radius: 8px; color: #4facfe; cursor: pointer; font-size: 12px;">🔗 Add Link</button>
          <button onclick="addFolderItem('transcript')" style="padding: 10px 16px; background: rgba(155,89,182,0.2); border: none; border-radius: 8px; color: #9b59b6; cursor: pointer; font-size: 12px;">🎙️ Add Transcript</button>
          <button onclick="addFolderItem('note')" style="padding: 10px 16px; background: rgba(39,174,96,0.2); border: none; border-radius: 8px; color: #27ae60; cursor: pointer; font-size: 12px;">📝 Add Note</button>
          <button onclick="triggerFolderFileUpload()" id="folder-pdf-btn" style="padding: 10px 16px; background: rgba(243,156,18,0.2); border: none; border-radius: 8px; color: #f39c12; cursor: pointer; font-size: 12px;">📄 Add PDF</button>
        </div>
        <input type="file" id="folder-file-input" style="display:none;" accept=".pdf,.txt" onchange="handleFolderFileUpload(event)">
        <div id="folder-upload-status" style="display:none; padding: 16px; background: rgba(79,172,254,0.2); border: 2px solid #4facfe; border-radius: 8px; margin-bottom: 16px; color: #fff; font-weight: 500; text-align: center;"></div>
        <div id="folder-items-list"></div>
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
          <button onclick="askAIAboutFolder()" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); border: none; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer;">🤖 Ask AI About This Folder</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Add Folder Modal -->
  <div class="modal" id="folder-modal">
    <div class="modal-content" style="max-width: 450px;">
      <div class="modal-header">
        <h2>New Folder</h2>
        <button class="close-modal" onclick="closeModal('folder-modal')">×</button>
      </div>
      <div class="modal-body">
        <input type="text" id="folder-name" placeholder="Folder name (e.g., Board Chair, SG Team)" style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; margin-bottom: 12px;">
        <textarea id="folder-desc" placeholder="Description (optional)" style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; min-height: 60px; font-family: inherit; margin-bottom: 12px;"></textarea>
        <button onclick="saveFolder()" class="btn-primary" style="width: 100%;">Create Folder</button>
      </div>
    </div>
  </div>
  
  <!-- Add Folder Item Modal -->
  <div class="modal" id="folder-item-modal">
    <div class="modal-content" style="max-width: 550px;">
      <div class="modal-header">
        <h2 id="folder-item-title">Add Item</h2>
        <button class="close-modal" onclick="closeModal('folder-item-modal')">×</button>
      </div>
      <div class="modal-body">
        <input type="text" id="folder-item-name" placeholder="Title (e.g., Call with Roger 1/6/26)" style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; margin-bottom: 12px;">
        <input type="text" id="folder-item-url" placeholder="URL (optional - for links)" style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; margin-bottom: 12px;">
        <div style="position: relative;">
          <textarea id="folder-item-content" placeholder="Content: paste transcript, notes, or summary here..." style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; min-height: 200px; font-family: inherit; margin-bottom: 12px;"></textarea>
          <button onclick="startVoiceInput('folder-item-content')" style="position: absolute; top: 8px; right: 8px; padding: 8px; background: rgba(255,255,255,0.1); border: none; border-radius: 6px; cursor: pointer; font-size: 16px;" title="Voice input">🎤</button>
        </div>
        <button onclick="saveFolderItem()" class="btn-primary" style="width: 100%;">Save</button>
      </div>
    </div>
  </div>
  
  <!-- Notes Tab -->
  <div id="notes" class="tab-content">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
      <h3 style="font-size: 18px;">📝 Meeting Notes & Journal</h3>
      <div style="display: flex; gap: 12px; align-items: center;">
        <select id="notes-filter" onchange="renderNotes()" style="padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; font-size: 13px;">
          <option value="">All Tags</option>
          <option value="board">Board</option>
          <option value="staff">Staff</option>
          <option value="external">External</option>
          <option value="chapter">Chapter</option>
          <option value="personal">Personal</option>
        </select>
        <button onclick="showAddNoteModal()" style="padding: 10px 20px; background: linear-gradient(135deg, #4facfe, #00f2fe); border: none; border-radius: 8px; color: #1a1a2e; font-weight: 600; cursor: pointer; font-size: 13px;">+ New Note</button>
      </div>
    </div>
    <div id="notes-list"></div>
  </div>
  
  <!-- Note Modal -->
  <div class="modal" id="note-modal">
    <div class="modal-content" style="max-width: 600px;">
      <div class="modal-header">
        <h2 id="note-modal-title">New Note</h2>
        <button class="close-modal" onclick="closeModal('note-modal')">×</button>
      </div>
      <div class="modal-body">
        <input type="text" id="note-title" placeholder="Title" style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; margin-bottom: 12px;">
        <div style="display: flex; gap: 12px; margin-bottom: 12px;">
          <input type="date" id="note-date" style="flex: 1; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8;">
          <select id="note-tag" style="flex: 1; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8;">
            <option value="board">Board</option>
            <option value="staff">Staff</option>
            <option value="external">External</option>
            <option value="chapter">Chapter</option>
            <option value="personal">Personal</option>
          </select>
        </div>
        <div style="position: relative;">
          <textarea id="note-content" placeholder="Meeting notes, key takeaways, action items..." style="width: 100%; padding: 12px; padding-right: 50px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; min-height: 150px; font-family: inherit; margin-bottom: 12px;"></textarea>
          <button onclick="startVoiceInput('note-content')" style="position: absolute; top: 8px; right: 8px; padding: 8px; background: rgba(255,255,255,0.1); border: none; border-radius: 6px; cursor: pointer; font-size: 16px;" title="Voice input">🎤</button>
        </div>
        <div style="margin-bottom: 12px;">
          <label style="font-size: 12px; opacity: 0.7; display: block; margin-bottom: 6px;">🔗 Add Link (Google Drive, YouTube, etc.)</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="note-link" placeholder="Paste URL" style="flex: 1; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; font-size: 13px;">
            <button onclick="addNoteLink()" style="padding: 10px 16px; background: rgba(79,172,254,0.2); border: none; border-radius: 8px; color: #4facfe; cursor: pointer;">Add</button>
          </div>
          <div id="note-links-list" style="margin-top: 8px;"></div>
        </div>
        <button onclick="saveNote()" class="btn-primary" style="width: 100%;">Save Note</button>
      </div>
    </div>
  </div>
  
  <!-- Calendar Tab -->
  <div id="calendar" class="tab-content">
    <div class="calendar-nav">
      <button onclick="changeMonth(-1)">← Prev</button>
      <h3 id="calendar-title">January 2026</h3>
      <button onclick="changeMonth(1)">Next →</button>
    </div>
    <div class="calendar-grid" id="calendar-grid"></div>
    <div style="margin-top: 20px; display: flex; gap: 12px; flex-wrap: wrap;">
      <div class="add-btn" onclick="showAddEventModal()">+ Add Event</div>
      <div class="add-btn" onclick="showImportScheduleModal()" style="background: rgba(46,204,113,0.2); color: #2ecc71;">📋 Import Schedule (Copilot)</div>
      <div class="add-btn" onclick="triggerCalendarImport()" style="background: rgba(155,89,182,0.2); color: #9b59b6;">📥 Import File (.ics)</div>
      <div class="add-btn" onclick="showCalendarURLImport()" style="background: rgba(52,152,219,0.2); color: #3498db;">🔗 Import from URL</div>
      <div class="add-btn" onclick="clearImportedEvents()" style="background: rgba(231,76,60,0.2); color: #e74c3c;">🗑️ Clear Imported</div>
    </div>
    <input type="file" id="ics-file-input" style="display:none;" accept=".ics" onchange="handleICSImport(event)">
    <input type="file" id="schedule-pdf-input" style="display:none;" accept=".pdf,.txt" onchange="handleSchedulePDFImport(event)">
    <div id="calendar-url-input" style="display:none; margin-top: 12px; padding: 16px; background: rgba(52,152,219,0.1); border-radius: 8px;">
      <p style="font-size: 13px; margin-bottom: 8px;">Paste your Outlook calendar URL (ICS link):</p>
      <div style="display: flex; gap: 8px;">
        <input type="text" id="cal-url" placeholder="https://outlook.office365.com/owa/calendar/..." style="flex: 1; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; background: rgba(255,255,255,0.05); color: #e8e8e8;">
        <button onclick="importFromURL()" style="padding: 10px 20px; background: #3498db; border: none; border-radius: 6px; color: #fff; cursor: pointer;">Import</button>
      </div>
      <p style="font-size: 11px; opacity: 0.6; margin-top: 8px;">💡 In Outlook Web: Calendar → Share → Publish → Copy ICS link</p>
    </div>
    <div id="import-status" style="display:none; margin-top: 12px; padding: 12px; border-radius: 8px;"></div>
    <div id="event-list"></div>
  </div>
  
  <!-- Expenses Tab -->
  <div id="expenses" class="tab-content">
    <div class="expense-summary" id="expense-summary"></div>
    <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
      <div class="add-btn" onclick="showAddExpenseModal()">+ Add Expense</div>
      <button onclick="exportExpensesToCSV()" style="padding: 10px 16px; background: rgba(46,204,113,0.2); border: 1px solid rgba(46,204,113,0.3); border-radius: 8px; color: #2ecc71; cursor: pointer; font-size: 14px;">📊 Export CSV</button>
      <button onclick="exportFinancialReportPDF()" style="padding: 10px 16px; background: rgba(231,76,60,0.2); border: 1px solid rgba(231,76,60,0.3); border-radius: 8px; color: #e74c3c; cursor: pointer; font-size: 14px;">📄 Export PDF</button>
    </div>
    <table class="expense-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="expense-tbody"></tbody>
    </table>
  </div>
  
  <!-- Activity Tab -->
  <div id="activity" class="tab-content">
    <h3 style="margin-bottom: 16px;">Recent Activity</h3>
    <div class="activity-list" id="activity-list"></div>
  </div>
  
  <!-- Report Tab -->
  <div id="report" class="tab-content">
    <div style="text-align: center; padding: 40px;">
      <h3 style="margin-bottom: 12px;">Generate Performance Report</h3>
      <p style="opacity: 0.7; margin-bottom: 20px;">Create a printable summary of your OKR progress.</p>
      <button class="btn-primary" onclick="generateReport()">📄 Generate Report</button>
    </div>
  </div>
  
  <!-- Add OKR Modal -->
  <div class="modal" id="add-okr-modal">
    <div class="modal-content" style="max-width: 600px;">
      <div class="modal-header">
        <h2>+ Add New OKR</h2>
        <button class="close-modal" onclick="closeModal('add-okr-modal')">×</button>
      </div>
      <div class="modal-body">
        <div style="margin-bottom: 16px;">
          <label style="font-size: 13px; display: block; margin-bottom: 6px;">Category</label>
          <input type="text" id="new-okr-category" placeholder="e.g., Board Relations, Fundraising" style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; font-size: 14px;">
        </div>
        <div style="margin-bottom: 16px;">
          <label style="font-size: 13px; display: block; margin-bottom: 6px;">Objective</label>
          <textarea id="new-okr-objective" placeholder="What do you want to achieve?" style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; font-size: 14px; min-height: 80px;"></textarea>
        </div>
        <div style="display: flex; gap: 16px; margin-bottom: 16px;">
          <div style="flex: 1;">
            <label style="font-size: 13px; display: block; margin-bottom: 6px;">Weight (%)</label>
            <input type="number" id="new-okr-weight" value="10" min="0" max="100" style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; font-size: 14px;">
          </div>
          <div style="flex: 1;">
            <label style="font-size: 13px; display: block; margin-bottom: 6px;">Color</label>
            <input type="color" id="new-okr-color" value="#4facfe" style="width: 100%; height: 46px; border: none; border-radius: 8px; cursor: pointer;">
          </div>
        </div>
        <div style="margin-bottom: 16px;">
          <label style="font-size: 13px; display: block; margin-bottom: 6px;">Key Results (one per line: text | target | unit)</label>
          <textarea id="new-okr-krs" placeholder="Complete board training | 100 | %&#10;Hold quarterly meetings | 4 | meetings&#10;Recruit new members | 3 | members" style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; font-size: 14px; min-height: 120px; font-family: monospace;"></textarea>
        </div>
        <div class="btn-row-modal">
          <button class="btn-secondary" onclick="closeModal('add-okr-modal')">Cancel</button>
          <button class="btn-primary" onclick="saveNewOKR()">Create OKR</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- OKR Detail Modal -->
  <div class="modal" id="okr-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="modal-title">Edit Objective</h2>
        <button class="close-modal" onclick="closeModal('okr-modal')">×</button>
      </div>
      <div class="modal-body">
        <div class="edit-section">
          <h3>Key Results</h3>
          <div id="kr-editor"></div>
        </div>
        <div class="edit-section">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h3 style="margin:0;">Notes</h3>
            <div style="display:flex;gap:6px;">
              <button onclick="cleanupNotes('okr-notes')" style="background:rgba(155,89,182,0.2);border:none;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;color:#9b59b6;">✨ Clean up</button>
              <button onclick="startVoiceInput(this, 'okr-notes')" style="background:rgba(79,172,254,0.2);border:none;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:12px;">🎤 Voice</button>
            </div>
          </div>
          <textarea class="notes-area" id="okr-notes" placeholder="Add notes about this objective..."></textarea>
        </div>
        <div class="attachment-section">
          <h3 style="font-size: 14px; margin-bottom: 8px;">📎 Attachments</h3>
          <div class="file-input-wrapper">
            <span class="file-input-btn">+ Add File</span>
            <input type="file" id="file-input" onchange="handleFileUpload(event)" multiple>
          </div>
          <div class="attachment-list" id="attachment-list"></div>
        </div>
        <div class="btn-row-modal" style="justify-content: space-between;">
          <button onclick="deleteOKR()" style="background: rgba(231,76,60,0.2); color: #e74c3c; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer;">🗑️ Delete OKR</button>
          <div style="display: flex; gap: 12px;">
            <button class="btn-secondary" onclick="closeModal('okr-modal')">Cancel</button>
            <button class="btn-primary" onclick="saveOKRChanges()">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Event Modal -->
  <div class="modal" id="event-modal">
    <div class="modal-content" style="max-width: 500px;">
      <div class="modal-header">
        <h2 id="event-modal-title">Add Event</h2>
        <button class="close-modal" onclick="closeModal('event-modal')">×</button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="event-id">
        <div class="edit-section">
          <label style="font-size: 13px; display: block; margin-bottom: 6px;">Event Title</label>
          <input type="text" id="event-title" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8;">
        </div>
        <div class="edit-section">
          <label style="font-size: 13px; display: block; margin-bottom: 6px;">Date</label>
          <input type="date" id="event-date" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8;">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="edit-section">
            <label style="font-size: 13px; display: block; margin-bottom: 6px;">Start Time</label>
            <input type="time" id="event-start-time" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8;">
          </div>
          <div class="edit-section">
            <label style="font-size: 13px; display: block; margin-bottom: 6px;">End Time</label>
            <input type="time" id="event-end-time" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8;">
          </div>
        </div>
        <div class="edit-section">
          <label style="font-size: 13px; display: block; margin-bottom: 6px;">Location</label>
          <input type="text" id="event-location" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8;">
        </div>
        <div class="edit-section">
          <label style="font-size: 13px; display: block; margin-bottom: 6px;">Type</label>
          <select id="event-type" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8;">
            <option value="meeting">Meeting</option>
            <option value="board">Board</option>
            <option value="speaking">Speaking</option>
            <option value="travel">Travel</option>
            <option value="deadline">Deadline</option>
            <option value="personal">Personal</option>
          </select>
        </div>
        <div class="edit-section">
          <label style="font-size: 13px; display: block; margin-bottom: 6px;">Notes</label>
          <textarea id="event-notes" rows="3" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; resize: vertical;"></textarea>
        </div>
        <div class="btn-row-modal">
          <button class="btn-secondary" onclick="closeModal('event-modal')">Cancel</button>
          <button class="btn-primary" onclick="saveEvent()">Save Event</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Import Schedule Modal -->
  <div class="modal" id="import-schedule-modal">
    <div class="modal-content" style="max-width: 700px; max-height: 90vh;">
      <div class="modal-header">
        <h2>📋 Import Schedule from Copilot</h2>
        <button class="close-modal" onclick="closeModal('import-schedule-modal')">×</button>
      </div>
      <div class="modal-body" style="overflow-y: auto;">
        <p style="font-size: 13px; opacity: 0.8; margin-bottom: 16px;">
          Paste the calendar listing from Copilot below, or upload a PDF/text file.
        </p>
        <div class="edit-section">
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <button onclick="document.getElementById('schedule-pdf-input').click()" style="padding: 8px 16px; background: rgba(155,89,182,0.2); border: 1px solid rgba(155,89,182,0.3); border-radius: 6px; color: #9b59b6; cursor: pointer;">📄 Upload PDF/TXT</button>
            <button onclick="document.getElementById('schedule-text').value=''" style="padding: 8px 16px; background: rgba(231,76,60,0.2); border: 1px solid rgba(231,76,60,0.3); border-radius: 6px; color: #e74c3c; cursor: pointer;">🗑️ Clear</button>
          </div>
          <textarea id="schedule-text" placeholder="Paste your Copilot calendar output here...

Example format:
Monday, January 12, 2026
Staff Meeting
Time: 9:00 AM – 10:00 AM
Location: Conference Room
Invitees: John, Jane
..." style="width: 100%; height: 300px; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8; font-family: monospace; font-size: 12px; resize: vertical;"></textarea>
        </div>
        <div id="schedule-preview" style="display: none; margin-top: 16px; padding: 12px; background: rgba(46,204,113,0.1); border-radius: 8px; max-height: 200px; overflow-y: auto;">
          <h4 style="margin-bottom: 8px; color: #2ecc71;">Preview</h4>
          <div id="schedule-preview-content"></div>
        </div>
        <div class="btn-row-modal" style="margin-top: 16px;">
          <button class="btn-secondary" onclick="closeModal('import-schedule-modal')">Cancel</button>
          <button class="btn-secondary" onclick="previewScheduleImport()" style="background: rgba(52,152,219,0.2); color: #3498db;">👁️ Preview</button>
          <button class="btn-primary" onclick="importScheduleFromText()">📥 Import Events</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Expense Modal -->
  <div class="modal" id="expense-modal">
    <div class="modal-content" style="max-width: 500px;">
      <div class="modal-header">
        <h2>Add Expense</h2>
        <button class="close-modal" onclick="closeModal('expense-modal')">×</button>
      </div>
      <div class="modal-body">
        <div class="edit-section">
          <label style="font-size: 13px; display: block; margin-bottom: 6px;">Description</label>
          <input type="text" id="expense-desc" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8;">
        </div>
        <div class="edit-section">
          <label style="font-size: 13px; display: block; margin-bottom: 6px;">Amount ($)</label>
          <input type="number" id="expense-amount" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8;">
        </div>
        <div class="edit-section">
          <label style="font-size: 13px; display: block; margin-bottom: 6px;">Date</label>
          <input type="date" id="expense-date" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8;">
        </div>
        <div class="edit-section">
          <label style="font-size: 13px; display: block; margin-bottom: 6px;">Category</label>
          <select id="expense-category" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8;">
            <option value="Travel">Travel</option>
            <option value="Meals">Meals</option>
            <option value="Lodging">Lodging</option>
            <option value="Conference">Conference</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="edit-section">
          <label style="font-size: 13px; display: block; margin-bottom: 6px;">Trip/Event Name (optional)</label>
          <input type="text" id="expense-trip" style="width: 100%; padding: 10px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.05); color: #e8e8e8;">
        </div>
        <div class="btn-row-modal">
          <button class="btn-secondary" onclick="closeModal('expense-modal')">Cancel</button>
          <button class="btn-primary" onclick="saveExpense()">Save Expense</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Report Modal -->
  <div class="modal" id="report-modal">
    <div class="modal-content report-modal" id="report-content"></div>
  </div>

<script>
// ============================================
// STATE & CONFIG
// ============================================
let API_URL = localStorage.getItem('api_url') || '';
let ANTHROPIC_API_KEY = localStorage.getItem('anthropic_api_key') || '';
let currentUser = localStorage.getItem('current_user') || 'Anonymous';
let currentOKRId = null;
let currentMonth = new Date();
let chatHistory = [];

let data = {
  okrs: [],
  events: [],
  expenses: [],
  activity: [],
  notes: [],
  folders: []
};

let currentNoteId = null;
let currentNoteLinks = [];
let currentFolderId = null;
let currentFolderItemType = null;

// Default OKRs for offline mode
const defaultOKRs = [
  {
    id: 'okr_1', category: 'Thought Leadership & External Positioning', weight: 15, color: '#1e88e5',
    objective: 'Position AFP as the authoritative voice for the fundraising profession',
    notes: '', attachments: [],
    keyresults: [
      { id: 'kr_1_1', text: 'Deliver high-profile speaking engagements', target: 6, current: 0, unit: 'speeches', complete: false },
      { id: 'kr_1_2', text: 'Publish thought leadership pieces', target: 3, current: 0, unit: 'pieces', complete: false },
      { id: 'kr_1_3', text: 'Establish strategic partnerships', target: 3, current: 0, unit: 'partnerships', complete: false }
    ]
  },
  {
    id: 'okr_2', category: 'Organizational Transformation (FORGE Ahead)', weight: 20, color: '#43a047',
    objective: 'Drive organizational transformation through FORGE Ahead',
    notes: '', attachments: [],
    keyresults: [
      { id: 'kr_2_1', text: 'Quarterly executive reviews ensuring alignment', target: 4, current: 0, unit: 'reviews', complete: false },
      { id: 'kr_2_2', text: 'External thought leadership engagements', target: 3, current: 0, unit: 'engagements', complete: false },
      { id: 'kr_2_3', text: 'Strategic conversations with board/chapter leaders', target: 10, current: 0, unit: 'conversations', complete: false }
    ]
  },
  {
    id: 'okr_3', category: 'Stakeholder Relationships', weight: 15, color: '#8e24aa',
    objective: 'Strengthen strategic relationships across stakeholders',
    notes: '', attachments: [],
    keyresults: [
      { id: 'kr_3_1', text: 'Board member meetings', target: 15, current: 0, unit: 'meetings', complete: false },
      { id: 'kr_3_2', text: 'Chapter activities', target: 20, current: 0, unit: 'activities', complete: false },
      { id: 'kr_3_3', text: 'Foundation prospect meetings', target: 12, current: 0, unit: 'meetings', complete: false },
      { id: 'kr_3_4', text: 'Peer association leader relationships', target: 5, current: 0, unit: 'relationships', complete: false }
    ]
  },
  {
    id: 'okr_4', category: 'Internal Leadership & Staff Engagement', weight: 20, color: '#fb8c00',
    objective: 'Deepen internal leadership presence and staff engagement',
    notes: '', attachments: [],
    keyresults: [
      { id: 'kr_4_1', text: 'Quarterly all-staff sessions', target: 4, current: 0, unit: 'sessions', complete: false },
      { id: 'kr_4_2', text: 'Skip-level conversations', target: 24, current: 0, unit: 'conversations', complete: false },
      { id: 'kr_4_3', text: 'Department meetings', target: 6, current: 0, unit: 'meetings', complete: false },
      { id: 'kr_4_4', text: 'Informal gatherings', target: 4, current: 0, unit: 'gatherings', complete: false },
      { id: 'kr_4_5', text: 'Compensation communication sessions', target: 3, current: 0, unit: 'sessions', complete: false }
    ]
  },
  {
    id: 'okr_5', category: 'People Management', weight: 15, color: '#e53935',
    objective: 'Develop competitive employee compensation framework',
    notes: '', attachments: [],
    keyresults: [
      { id: 'kr_5_1', text: 'Board approval of compensation philosophy by Q2', target: 100, current: 0, unit: '%', complete: false },
      { id: 'kr_5_2', text: 'VP completes implementation (salary bands, metrics, benefits) by Q4', target: 100, current: 0, unit: '%', complete: false }
    ]
  },
  {
    id: 'okr_6', category: 'Financial Sustainability', weight: 15, color: '#00897b',
    objective: 'Ensure long-term financial health and resource allocation',
    notes: '', attachments: [],
    keyresults: [
      { id: 'kr_6_1', text: 'Board approval of reserves policy by Q2', target: 100, current: 0, unit: '%', complete: false },
      { id: 'kr_6_2', text: 'Achieve budgeted net assets', target: 100, current: 0, unit: '%', complete: false },
      { id: 'kr_6_3', text: 'Support Foundation campaign through introductions', target: 10, current: 0, unit: 'intros', complete: false }
    ]
  }
];

// ============================================
// API & SYNC
// ============================================

// Merge arrays by ID, preferring local data for existing items
function mergeArraysById(localArr, serverArr) {
  const merged = [...localArr];
  const localIds = new Set(localArr.map(item => item.id));
  
  // Add server items that don't exist locally
  for (const serverItem of serverArr) {
    if (!localIds.has(serverItem.id)) {
      merged.push(serverItem);
    }
  }
  
  return merged;
}

// Merge OKRs, preserving local progress and notes
function mergeOKRs(localOKRs, serverOKRs) {
  const merged = [];
  const localById = {};
  localOKRs.forEach(o => localById[o.id] = o);
  
  // Start with server OKRs but overlay local progress
  for (const serverOKR of serverOKRs) {
    const localOKR = localById[serverOKR.id];
    
    if (localOKR) {
      // Merge: use local progress/notes/attachments
      const mergedOKR = {
        ...serverOKR,
        notes: localOKR.notes || serverOKR.notes || '',
        attachments: localOKR.attachments || serverOKR.attachments || [],
        keyresults: mergeKeyResults(localOKR.keyresults || [], serverOKR.keyresults || [])
      };
      merged.push(mergedOKR);
      delete localById[serverOKR.id];
    } else {
      merged.push(serverOKR);
    }
  }
  
  // Add any local-only OKRs
  for (const id in localById) {
    merged.push(localById[id]);
  }
  
  return merged;
}

// Merge key results, preserving local progress
function mergeKeyResults(localKRs, serverKRs) {
  const merged = [];
  const localById = {};
  localKRs.forEach(kr => localById[kr.id] = kr);
  
  for (const serverKR of serverKRs) {
    const localKR = localById[serverKR.id];
    
    if (localKR) {
      // Prefer local progress and items
      merged.push({
        ...serverKR,
        current: localKR.current || serverKR.current || 0,
        complete: localKR.complete || serverKR.complete || false,
        notes: localKR.notes || serverKR.notes || '',
        description: localKR.description || serverKR.description || '',
        attachments: localKR.attachments || serverKR.attachments || [],
        items: localKR.items || serverKR.items || [],
        links: localKR.links || serverKR.links || []
      });
      delete localById[serverKR.id];
    } else {
      merged.push(serverKR);
    }
  }
  
  // Add local-only KRs
  for (const id in localById) {
    merged.push(localById[id]);
  }
  
  return merged;
}

async function syncData() {
  if (!API_URL) {
    console.log('No API URL set, loading local data only');
    loadLocal();
    updateSyncStatus('offline');
    return;
  }
  
  // Load local data FIRST so we have it as backup
  loadLocal();
  
  // Save ALL local data before sync
  const localOKRs = JSON.parse(JSON.stringify(data.okrs || []));
  const localEvents = JSON.parse(JSON.stringify(data.events || []));
  const localNotes = JSON.parse(JSON.stringify(data.notes || []));
  const localFolders = JSON.parse(JSON.stringify(data.folders || []));
  const localExpenses = JSON.parse(JSON.stringify(data.expenses || []));
  
  console.log('Local data before sync:', { okrs: localOKRs.length, events: localEvents.length });
  
  updateSyncStatus('syncing');
  
  try {
    console.log('Fetching from:', API_URL + '?action=getData');
    const response = await fetch(API_URL + '?action=getData');
    const result = await response.json();
    
    console.log('Server response:', result);
    
    if (result.error) throw new Error(result.error);
    
    // Map server OKRs
    const serverOKRs = (result.okrs || []).map(o => ({
      id: o.id,
      category: o.category,
      weight: o.weight,
      objective: o.objective,
      color: o.color,
      notes: o.notes || '',
      attachments: o.attachments || [],
      keyresults: o.keyresults || []
    }));
    
    console.log('Server OKRs mapped:', serverOKRs.length, serverOKRs);
    
    // Merge OKRs: prefer local progress/notes, but get any new OKRs from server
    if (serverOKRs.length > 0 && localOKRs.length > 0) {
      data.okrs = mergeOKRs(localOKRs, serverOKRs);
    } else if (localOKRs.length > 0) {
      data.okrs = localOKRs;
    } else if (serverOKRs.length > 0) {
      data.okrs = serverOKRs;
    }
    
    // Merge events: combine local and server, remove duplicates
    const serverEvents = result.events || [];
    data.events = mergeArraysById(localEvents, serverEvents);
    
    // Merge expenses
    const serverExpenses = result.expenses || [];
    data.expenses = mergeArraysById(localExpenses, serverExpenses);
    
    // Merge notes: keep local if server is empty, otherwise merge
    const serverNotes = (result.notes || []).map(n => ({
      id: n.id,
      title: n.title,
      date: n.date,
      tag: n.tag,
      content: n.content,
      links: n.links || []
    }));
    data.notes = mergeArraysById(localNotes, serverNotes);
    
    // Merge folders: keep local if server is empty, otherwise merge
    const serverFolders = (result.folders || []).map(f => ({
      id: f.id,
      name: f.name,
      description: f.description || '',
      items: f.items || []
    }));
    data.folders = mergeArraysById(localFolders, serverFolders);
    
    data.activity = result.activity || [];
    
    saveLocal();
    updateSyncStatus('online');
    render();
  } catch (error) {
    console.error('Sync error:', error);
    loadLocal();
    updateSyncStatus('offline');
    render();
  }
}

async function saveToServer(action, payload) {
  if (!API_URL) {
    saveLocal();
    return { success: true };
  }
  
  updateSyncStatus('syncing');
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...payload, user: currentUser })
    });
    const result = await response.json();
    
    if (result.error) throw new Error(result.error);
    
    updateSyncStatus('online');
    saveLocal();
    return result;
  } catch (error) {
    console.error('Save error:', error);
    updateSyncStatus('offline');
    saveLocal();
    return { error: error.message };
  }
}

function updateSyncStatus(status) {
  const el = document.getElementById('sync-status');
  const text = document.getElementById('sync-text');
  
  el.className = 'sync-status ' + status;
  text.textContent = status === 'online' ? '🟢 Synced' : status === 'syncing' ? '🔄 Syncing...' : '🔴 Offline';
}

function saveLocal() {
  try {
    // Count items for debugging
    let totalItems = 0;
    (data.okrs || []).forEach(okr => {
      (okr.keyresults || []).forEach(kr => {
        totalItems += (kr.items || []).length;
      });
    });
    
    const counts = {
      okrs: (data.okrs || []).length,
      folders: (data.folders || []).length,
      notes: (data.notes || []).length,
      events: (data.events || []).length,
      expenses: (data.expenses || []).length,
      krItems: totalItems
    };
    console.log('Saving to localStorage:', counts);
    
    localStorage.setItem('okr_data', JSON.stringify(data));
    
    // Also save a timestamped backup
    localStorage.setItem('okr_data_backup', JSON.stringify({
      timestamp: new Date().toISOString(),
      data: data
    }));
    
    // Update status indicator if exists
    const statusEl = document.getElementById('data-count');
    if (statusEl) {
      statusEl.textContent = `${totalItems} items`;
    }
  } catch (e) {
    console.error('Error saving to localStorage:', e);
    // If quota exceeded, try to clear old backups
    if (e.name === 'QuotaExceededError') {
      localStorage.removeItem('okr_data_backup');
      localStorage.setItem('okr_data', JSON.stringify(data));
    }
  }
}

function loadLocal() {
  try {
    const saved = localStorage.getItem('okr_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Preserve existing data structure
      data.okrs = parsed.okrs || data.okrs || [...defaultOKRs];
      data.notes = parsed.notes || [];
      data.folders = parsed.folders || [];
      data.events = parsed.events || [];
      data.expenses = parsed.expenses || [];
      data.activity = parsed.activity || [];
      
      console.log('Loaded from localStorage:', {
        okrs: data.okrs.length,
        folders: data.folders.length,
        notes: data.notes.length,
        events: data.events.length
      });
      
      // Count and log items
      let totalItems = 0;
      data.okrs.forEach(okr => {
        (okr.keyresults || []).forEach(kr => {
          totalItems += (kr.items || []).length;
        });
      });
      console.log('Total KR items loaded:', totalItems);
    } else {
      // Check for backup first
      const backup = localStorage.getItem('okr_data_backup');
      if (backup) {
        const parsed = JSON.parse(backup);
        if (parsed.data) {
          data.okrs = parsed.data.okrs || [...defaultOKRs];
          data.notes = parsed.data.notes || [];
          data.folders = parsed.data.folders || [];
          data.events = parsed.data.events || [];
          data.expenses = parsed.data.expenses || [];
          data.activity = parsed.data.activity || [];
          console.log('Restored from backup:', parsed.timestamp);
          return;
        }
      }
      
      // No saved data - use defaults
      data.okrs = [...defaultOKRs];
      data.notes = [];
      data.folders = [];
      data.events = [];
      data.expenses = [];
      data.activity = [];
      console.log('No saved data found, using defaults');
    }
  } catch (e) {
    console.error('Error loading from localStorage:', e);
    // Try to load backup
    try {
      const backup = localStorage.getItem('okr_data_backup');
      if (backup) {
        const parsed = JSON.parse(backup);
        data = parsed.data || {};
        data.okrs = data.okrs || [...defaultOKRs];
        data.notes = data.notes || [];
        data.folders = data.folders || [];
        data.events = data.events || [];
        console.log('Restored from backup');
      }
    } catch (e2) {
      console.error('Backup also failed:', e2);
      data.okrs = [...defaultOKRs];
      data.notes = [];
      data.folders = [];
      data.events = [];
    }
  }
}

// ============================================
// SETUP & CONFIG
// ============================================
function saveApiConfig() {
  const url = document.getElementById('api-url-input').value.trim();
  const name = document.getElementById('user-name-input').value.trim();
  
  if (!url) {
    alert('Please enter your Web App URL');
    return;
  }
  
  API_URL = url;
  currentUser = name || 'Anonymous';
  
  localStorage.setItem('api_url', API_URL);
  localStorage.setItem('current_user', currentUser);
  
  document.getElementById('setup-banner').style.display = 'none';
  document.getElementById('current-user').textContent = currentUser;
  
  syncData();
}

function skipSetup() {
  document.getElementById('setup-banner').style.display = 'none';
  loadLocal();
  render();
  document.getElementById('loading').classList.add('hidden');
}

function changeUser() {
  const name = prompt('Enter your name:', currentUser);
  if (name) {
    currentUser = name;
    localStorage.setItem('current_user', currentUser);
    document.getElementById('current-user').textContent = currentUser;
  }
}

function showAppSettings() {
  document.getElementById('settings-api-url').value = API_URL || '';
  document.getElementById('app-settings-modal').classList.add('active');
}

function saveApiUrl() {
  const url = document.getElementById('settings-api-url').value.trim();
  if (url && !url.startsWith('https://script.google.com/')) {
    alert('Invalid URL. It should start with https://script.google.com/');
    return;
  }
  API_URL = url;
  localStorage.setItem('api_url', url);
  alert(url ? '✅ API URL saved! Click "Pull from Server" to get your data.' : 'API URL cleared.');
}

function copyApiUrl() {
  const url = API_URL;
  if (!url) {
    alert('No API URL configured');
    return;
  }
  navigator.clipboard.writeText(url).then(() => {
    alert('URL copied! Paste this on your other devices.');
  }).catch(() => {
    prompt('Copy this URL:', url);
  });
}

async function pushToServer() {
  if (!API_URL) {
    alert('No API URL set. Please connect to Google Sheets first.');
    return;
  }
  
  if (!confirm('Push your local data to Google Sheets?\n\nThis will update the server with your current data.')) return;
  
  try {
    updateSyncStatus('syncing');
    
    // Create deep copy to ensure all nested data is included
    const payload = {
      action: 'syncAll',
      okrs: JSON.parse(JSON.stringify(data.okrs)),
      events: JSON.parse(JSON.stringify(data.events || [])),
      notes: JSON.parse(JSON.stringify(data.notes || [])),
      folders: JSON.parse(JSON.stringify(data.folders || [])),
      expenses: JSON.parse(JSON.stringify(data.expenses || [])),
      user: currentUser
    };
    
    console.log('Pushing data:', payload);
    console.log('OKR 1 KR 3 items:', payload.okrs[0]?.keyresults?.[2]?.items);
    
    // Try direct fetch first (works if CORS is properly configured)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      console.log('Push result:', result);
      
      if (result.success) {
        alert('✅ Data pushed successfully! (' + payload.okrs.length + ' OKRs, ' + payload.folders.length + ' folders)');
        updateSyncStatus('online');
        return;
      }
    } catch (fetchError) {
      console.log('Direct fetch failed, trying alternative method...', fetchError);
    }
    
    // Fallback: Use image beacon approach for CORS-restricted environments
    const jsonData = encodeURIComponent(JSON.stringify(payload));
    
    // Split into chunks if too large (URL limit ~2000 chars)
    if (jsonData.length < 1900) {
      // Small enough to send via GET
      const img = new Image();
      img.src = API_URL + '?push=1&data=' + jsonData;
    } else {
      // Use iframe POST for larger data
      const iframe = document.createElement('iframe');
      iframe.name = 'push_frame_' + Date.now();
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = API_URL;
      form.target = iframe.name;
      form.enctype = 'application/x-www-form-urlencoded';
      
      const input = document.createElement('textarea');
      input.name = 'data';
      input.value = JSON.stringify(payload);
      input.style.display = 'none';
      form.appendChild(input);
      
      document.body.appendChild(form);
      form.submit();
      
      setTimeout(() => {
        try {
          document.body.removeChild(form);
          document.body.removeChild(iframe);
        } catch(e) {}
      }, 5000);
    }
    
    // Wait then verify
    await new Promise(r => setTimeout(r, 3000));
    
    try {
      const checkResponse = await fetch(API_URL + '?action=getData');
      const checkResult = await checkResponse.json();
      
      // Check if items were saved
      const savedItems = checkResult.okrs?.[0]?.keyresults?.[2]?.items || [];
      console.log('Verified saved items:', savedItems);
      
      if (checkResult.okrs && checkResult.okrs.length > 0) {
        if (savedItems.length > 0) {
          alert('✅ Data pushed with all items! (' + checkResult.okrs.length + ' OKRs saved)');
        } else {
          alert('✅ Data pushed! (' + checkResult.okrs.length + ' OKRs saved)\nNote: Verify items in Google Sheet.');
        }
        updateSyncStatus('online');
      } else {
        alert('⚠️ Push sent but could not verify. Check your Google Sheet.');
        updateSyncStatus('online');
      }
    } catch (e) {
      alert('✅ Data pushed! Check your Google Sheet to verify.');
      updateSyncStatus('online');
    }
  } catch (error) {
    console.error('Push error:', error);
    alert('❌ Error pushing data: ' + error.message);
    updateSyncStatus('offline');
  }
}

async function pullFromServer() {
  if (!API_URL) {
    alert('No API URL set. Please connect to Google Sheets first.');
    return;
  }
  
  if (!confirm('Pull from server?\n\nThis will replace your local data with the server data.')) return;
  
  try {
    console.log('Pulling from server...');
    updateSyncStatus('syncing');
    const response = await fetch(API_URL + '?action=getData');
    const result = await response.json();
    
    console.log('Pull result:', result);
    
    if (result.error) throw new Error(result.error);
    
    // Replace local data with server data
    if (result.okrs && result.okrs.length > 0) {
      data.okrs = result.okrs.map(okr => ({
        ...okr,
        keyresults: (okr.keyresults || []).map(kr => ({
          ...kr,
          items: kr.items || [],
          links: kr.links || [],
          attachments: kr.attachments || []
        }))
      }));
    }
    
    if (result.folders) {
      data.folders = result.folders;
    }
    
    if (result.events) {
      data.events = result.events;
    }
    
    if (result.notes) {
      data.notes = result.notes;
    }
    
    if (result.expenses) {
      data.expenses = result.expenses;
    }
    
    saveLocal();
    render();
    
    const okrCount = data.okrs?.length || 0;
    const folderCount = data.folders?.length || 0;
    alert(`✅ Pulled from server!\n${okrCount} OKRs, ${folderCount} folders loaded.`);
    updateSyncStatus('online');
  } catch (error) {
    console.error('Pull error:', error);
    alert('❌ Error pulling data: ' + error.message);
    updateSyncStatus('offline');
  }
}

function resetApp() {
  if (!confirm('This will clear all local data. Your data in Google Sheets will NOT be deleted.\n\nContinue?')) return;
  localStorage.clear();
  location.reload();
}

function exportData() {
  const exportObj = {
    exportDate: new Date().toISOString(),
    version: '2.0',
    data: {
      okrs: data.okrs,
      notes: data.notes,
      folders: data.folders,
      events: data.events,
      expenses: data.expenses
    },
    settings: {
      apiUrl: API_URL,
      currentUser: currentUser,
      anthropicApiKey: ANTHROPIC_API_KEY
    }
  };
  
  const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AFP_Tracker_Backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  alert('Data exported! Save this file to restore your data later.');
}

function triggerImportData() {
  document.getElementById('import-data-input').click();
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      
      if (!imported.data) {
        alert('Invalid backup file format.');
        return;
      }
      
      if (!confirm(`Import data from ${imported.exportDate || 'backup'}?\n\nThis will merge with your existing data. Your current data will be preserved.`)) {
        return;
      }
      
      // Merge imported data with existing
      if (imported.data.okrs) {
        data.okrs = mergeOKRs(data.okrs || [], imported.data.okrs);
      }
      if (imported.data.notes) {
        data.notes = mergeArraysById(data.notes || [], imported.data.notes);
      }
      if (imported.data.folders) {
        data.folders = mergeArraysById(data.folders || [], imported.data.folders);
      }
      if (imported.data.events) {
        data.events = mergeArraysById(data.events || [], imported.data.events);
      }
      if (imported.data.expenses) {
        data.expenses = mergeArraysById(data.expenses || [], imported.data.expenses);
      }
      
      // Restore settings including API key
      if (imported.settings) {
        if (imported.settings.anthropicApiKey) {
          ANTHROPIC_API_KEY = imported.settings.anthropicApiKey;
          localStorage.setItem('anthropic_api_key', ANTHROPIC_API_KEY);
        }
        if (imported.settings.apiUrl && !API_URL) {
          API_URL = imported.settings.apiUrl;
          localStorage.setItem('afp_api_url', API_URL);
        }
        if (imported.settings.currentUser) {
          currentUser = imported.settings.currentUser;
          localStorage.setItem('current_user', currentUser);
          document.getElementById('current-user').textContent = currentUser;
        }
      }
      
      saveLocal();
      render();
      closeModal('app-settings-modal');
      
      alert('Data imported successfully!' + (imported.settings?.anthropicApiKey ? ' AI key restored.' : ''));
    } catch (err) {
      alert('Error reading backup file: ' + err.message);
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

// ============================================
// RENDERING
// ============================================
function render() {
  renderOKRs();
  renderCalendar();
  renderEvents();
  renderExpenses();
  renderActivity();
  renderNotes();
  renderFolders();
  updateOverallProgress();
}

function renderOKRs() {
  const grid = document.getElementById('okr-grid');
  grid.innerHTML = data.okrs.map(okr => {
    const progress = calculateOKRProgress(okr);
    return `
      <div class="okr-card" style="border-color: ${okr.color}" onclick="openOKRModal('${okr.id}')">
        <div class="okr-card-header">
          <span class="okr-category">${okr.category}</span>
          <span class="okr-weight">${okr.weight}%</span>
        </div>
        <div class="okr-objective">${okr.objective}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%; background: ${okr.color}"></div>
        </div>
        <div class="kr-list">
          ${(okr.keyresults || []).map(kr => `
            <div class="kr-item">
              <span class="kr-text">${kr.text}</span>
              <span>
                ${(kr.attachments && kr.attachments.length > 0) ? `<span style="color:#f39c12;margin-right:6px;">📎${kr.attachments.length}</span>` : ''}
                <span class="kr-value ${kr.complete ? 'kr-complete' : ''}">${formatKRValue(kr)}</span>
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function formatKRValue(kr) {
  if (kr.complete) return '✓';
  if (kr.unit === '$') return `$${(kr.current || 0).toLocaleString()}/$${kr.target.toLocaleString()}`;
  return `${kr.current || 0}/${kr.target} ${kr.unit}`;
}

function calculateOKRProgress(okr) {
  const krs = okr.keyresults || [];
  if (krs.length === 0) return 0;
  
  const total = krs.reduce((sum, kr) => {
    if (kr.complete) return sum + 100;
    if (kr.target === 0) return sum;
    return sum + Math.min(100, ((kr.current || 0) / kr.target) * 100);
  }, 0);
  
  return Math.round(total / krs.length);
}

function updateOverallProgress() {
  let totalWeighted = 0;
  let totalWeight = 0;
  
  data.okrs.forEach(okr => {
    const progress = calculateOKRProgress(okr);
    totalWeighted += progress * (okr.weight || 0);
    totalWeight += okr.weight || 0;
  });
  
  const overall = totalWeight > 0 ? Math.round(totalWeighted / totalWeight) : 0;
  document.getElementById('overall-progress').textContent = overall + '%';
}

// ============================================
// OKR MODAL
// ============================================
let currentKRIndex = null;

function showAddOKRModal() {
  document.getElementById('new-okr-category').value = '';
  document.getElementById('new-okr-objective').value = '';
  document.getElementById('new-okr-weight').value = '10';
  document.getElementById('new-okr-color').value = '#4facfe';
  document.getElementById('new-okr-krs').value = '';
  document.getElementById('add-okr-modal').classList.add('active');
}

async function saveNewOKR() {
  const category = document.getElementById('new-okr-category').value.trim();
  const objective = document.getElementById('new-okr-objective').value.trim();
  const weight = parseInt(document.getElementById('new-okr-weight').value) || 10;
  const color = document.getElementById('new-okr-color').value;
  const krsText = document.getElementById('new-okr-krs').value.trim();
  
  if (!category || !objective) {
    alert('Please enter a category and objective');
    return;
  }
  
  // Parse key results
  const keyresults = krsText.split('\n').filter(line => line.trim()).map((line, i) => {
    const parts = line.split('|').map(p => p.trim());
    return {
      id: 'kr_new_' + Date.now() + '_' + i,
      text: parts[0] || 'Key Result',
      target: parseFloat(parts[1]) || 100,
      unit: parts[2] || '%',
      current: 0,
      complete: false,
      notes: '',
      attachments: []
    };
  });
  
  if (keyresults.length === 0) {
    keyresults.push({
      id: 'kr_new_' + Date.now() + '_0',
      text: 'Define key result',
      target: 100,
      unit: '%',
      current: 0,
      complete: false,
      notes: '',
      attachments: []
    });
  }
  
  const newOKR = {
    id: 'okr_' + Date.now(),
    category,
    objective,
    weight,
    color,
    notes: '',
    attachments: [],
    keyresults
  };
  
  data.okrs.push(newOKR);
  await saveToServer('saveOKR', { okr: newOKR });
  
  closeModal('add-okr-modal');
  render();
}

function openOKRModal(id) {
  currentOKRId = id;
  const okr = data.okrs.find(o => o.id === id);
  if (!okr) return;
  
  document.getElementById('modal-title').textContent = okr.category;
  document.getElementById('okr-notes').value = okr.notes || '';
  
  // Render KR editor with attachments per KR
  const editor = document.getElementById('kr-editor');
  editor.innerHTML = (okr.keyresults || []).map((kr, i) => {
    // Ensure kr has all arrays
    if (!kr.attachments) kr.attachments = [];
    if (!kr.notes) kr.notes = '';
    if (!kr.description) kr.description = '';
    if (!kr.items) kr.items = [];
    
    return `
    <div class="kr-block" data-kr-index="${i}">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="font-size:13px;font-weight:600;color:#4facfe;">KR ${i + 1}</span>
        <button class="check-btn ${kr.complete ? 'checked' : ''}" onclick="toggleKRComplete(${i})" style="margin-left:auto;">✓</button>
      </div>
      
      <div class="edit-row" style="margin-bottom:8px;">
        <label style="font-size:11px;opacity:0.6;width:60px;">Title:</label>
        <input type="text" value="${kr.text}" data-kr-index="${i}" data-field="text" placeholder="KR title (e.g., Partnerships)" style="flex:1;">
      </div>
      
      <div class="edit-row" style="margin-bottom:8px;">
        <label style="font-size:11px;opacity:0.6;width:60px;">Target:</label>
        <input type="number" id="kr-current-${i}" value="${kr.current || 0}" data-kr-index="${i}" data-field="current" placeholder="Current" style="width:70px;">
        <span style="padding:8px;">of ${kr.target} ${kr.unit}</span>
      </div>
      
      <!-- Individual Items Section - VERY Prominent -->
      <div class="kr-items" style="margin:16px 0;background:linear-gradient(135deg, rgba(39,174,96,0.15), rgba(79,172,254,0.1));border:2px solid rgba(39,174,96,0.5);border-radius:12px;padding:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:10px;">
          <div>
            <div style="font-size:15px;font-weight:700;color:#27ae60;">📋 Individual ${kr.unit.charAt(0).toUpperCase() + kr.unit.slice(1)}</div>
            <div id="kr-items-count-${i}" style="font-size:12px;opacity:0.7;margin-top:2px;">${(kr.items || []).length} of ${kr.target} added</div>
          </div>
          <button onclick="addKRItem(${i})" style="padding:12px 20px;background:#27ae60;border:none;border-radius:8px;color:#fff;cursor:pointer;font-size:14px;font-weight:600;box-shadow:0 2px 8px rgba(39,174,96,0.3);">➕ Add ${kr.unit.replace(/s$/, '').charAt(0).toUpperCase() + kr.unit.replace(/s$/, '').slice(1)}</button>
        </div>
        <div id="kr-items-${i}" style="max-height:300px;overflow-y:auto;">
          ${renderKRItems(kr.items || [], i)}
        </div>
      </div>
      
      <div class="kr-notes-field" style="margin-bottom:8px;position:relative;">
        <label style="font-size:11px;opacity:0.6;display:block;margin-bottom:4px;">📝 General Notes (AI readable):</label>
        <div style="position:absolute;top:0;right:0;display:flex;gap:4px;">
          <button onclick="cleanupNotes('kr-notes-${i}')" style="background:rgba(155,89,182,0.2);border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:11px;color:#9b59b6;">✨ Clean</button>
          <button onclick="startVoiceInput(this, 'kr-notes-${i}')" style="background:rgba(79,172,254,0.2);border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:12px;">🎤</button>
        </div>
        <textarea id="kr-notes-${i}" data-kr-index="${i}" data-field="notes" placeholder="Overall notes for this KR..." style="width:100%;padding:10px;border:1px solid rgba(255,255,255,0.2);border-radius:8px;background:rgba(255,255,255,0.05);color:#e8e8e8;font-size:13px;min-height:50px;resize:vertical;">${kr.notes || ''}</textarea>
      </div>
      
      <div class="kr-attachments">
        <div class="kr-attachment-header">
          <span>📎 General Documents (${kr.attachments.length})</span>
          <button class="add-file-btn" onclick="triggerKRFileUpload(${i})">+ Add File</button>
        </div>
        <div class="kr-attachment-list" id="kr-att-${i}">
          ${renderKRAttachments(kr.attachments, i)}
        </div>
      </div>
    </div>
  `}).join('');
  
  document.getElementById('okr-modal').classList.add('active');
}

function renderKRItems(items, krIndex) {
  if (!items || items.length === 0) {
    return '<div style="font-size:12px;opacity:0.5;text-align:center;padding:15px;background:rgba(255,255,255,0.03);border-radius:6px;border:1px dashed rgba(255,255,255,0.2);">No items yet. Click the button above to add one.</div>';
  }
  return items.map((item, itemIndex) => {
    const statusColors = {
      'Not Started': '#95a5a6',
      'In Progress': '#3498db', 
      'On Hold': '#f39c12',
      'Complete': '#27ae60'
    };
    const statusColor = statusColors[item.status] || '#95a5a6';
    const fileCount = (item.files || []).length;
    const linkCount = (item.links || []).length;
    const itemNumber = itemIndex + 1;
    
    return `
    <div class="kr-item-folder" onclick="openItemFolder(${krIndex}, ${itemIndex})" style="background:rgba(255,255,255,0.05);border-radius:10px;padding:14px;margin-bottom:10px;border-left:4px solid ${statusColor};cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">
      <div style="display:flex;justify-content:space-between;align-items:start;">
        <div style="flex:1;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:${statusColor};color:#fff;border-radius:50%;font-size:12px;font-weight:600;">${itemNumber}</span>
            <span style="font-weight:600;font-size:15px;color:#fff;">${item.name}</span>
          </div>
          <div style="display:inline-block;font-size:11px;padding:3px 10px;border-radius:12px;background:${statusColor}22;color:${statusColor};margin-bottom:6px;margin-left:32px;">${item.status || 'In Progress'}</div>
          ${item.notes ? `<div style="font-size:12px;opacity:0.7;margin-top:6px;margin-left:32px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:300px;">${item.notes.split('\n')[0].substring(0, 60)}${item.notes.length > 60 ? '...' : ''}</div>` : ''}
        </div>
        <div style="text-align:right;font-size:11px;opacity:0.6;">
          ${fileCount > 0 ? `<div>📎 ${fileCount} file${fileCount > 1 ? 's' : ''}</div>` : ''}
          ${linkCount > 0 ? `<div>🔗 ${linkCount} link${linkCount > 1 ? 's' : ''}</div>` : ''}
          <div style="margin-top:4px;color:#4facfe;">Click to open →</div>
        </div>
      </div>
    </div>
  `}).join('');
}

let currentKRItemIndex = null;
let currentKRForItem = null;

function addKRItem(krIndex) {
  console.log('addKRItem called with krIndex:', krIndex);
  currentKRForItem = krIndex;
  currentKRItemIndex = null;
  pendingItemFiles = [];
  pendingItemLinks = [];
  
  document.getElementById('kr-item-name').value = '';
  document.getElementById('kr-item-status').value = 'In Progress';
  document.getElementById('kr-item-notes').value = '';
  document.getElementById('kr-item-modal-title').textContent = '📁 New Item';
  document.getElementById('kr-item-link-form').style.display = 'none';
  document.getElementById('delete-item-btn').style.display = 'none';
  renderItemFilesList();
  renderItemLinksList();
  document.getElementById('kr-item-modal').classList.add('active');
}

function openItemFolder(krIndex, itemIndex) {
  console.log('openItemFolder called:', krIndex, itemIndex);
  const okr = data.okrs.find(o => o.id === currentOKRId);
  if (!okr || !okr.keyresults[krIndex] || !okr.keyresults[krIndex].items || !okr.keyresults[krIndex].items[itemIndex]) {
    console.error('Could not find item');
    return;
  }
  
  const item = okr.keyresults[krIndex].items[itemIndex];
  currentKRForItem = krIndex;
  currentKRItemIndex = itemIndex;
  pendingItemFiles = item.files ? [...item.files] : [];
  pendingItemLinks = item.links ? [...item.links] : [];
  
  document.getElementById('kr-item-name').value = item.name || '';
  document.getElementById('kr-item-status').value = item.status || 'In Progress';
  document.getElementById('kr-item-notes').value = item.notes || '';
  document.getElementById('kr-item-modal-title').textContent = '📁 ' + (item.name || 'Item');
  document.getElementById('kr-item-link-form').style.display = 'none';
  document.getElementById('delete-item-btn').style.display = 'block';
  renderItemFilesList();
  renderItemLinksList();
  document.getElementById('kr-item-modal').classList.add('active');
}

// Keep editKRItem as alias for openItemFolder
function editKRItem(krIndex, itemIndex) {
  openItemFolder(krIndex, itemIndex);
}

// Pending links for item
let pendingItemLinks = [];

function toggleItemLinkForm() {
  const form = document.getElementById('kr-item-link-form');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
  if (form.style.display === 'block') {
    document.getElementById('kr-item-link-title').value = '';
    document.getElementById('kr-item-link-url').value = '';
    document.getElementById('kr-item-link-title').focus();
  }
}

function addItemLink() {
  const title = document.getElementById('kr-item-link-title').value.trim();
  const url = document.getElementById('kr-item-link-url').value.trim();
  
  if (!url) {
    alert('Please enter a URL');
    return;
  }
  
  pendingItemLinks.push({
    title: title || url,
    url: url,
    addedAt: new Date().toISOString()
  });
  
  document.getElementById('kr-item-link-title').value = '';
  document.getElementById('kr-item-link-url').value = '';
  document.getElementById('kr-item-link-form').style.display = 'none';
  renderItemLinksList();
}

function removeItemLink(index) {
  pendingItemLinks.splice(index, 1);
  renderItemLinksList();
}

function renderItemLinksList() {
  const container = document.getElementById('kr-item-links-list');
  if (!container) return;
  
  if (pendingItemLinks.length === 0) {
    container.innerHTML = '<div style="font-size:12px;opacity:0.5;padding:10px;text-align:center;">No links added yet</div>';
    return;
  }
  
  container.innerHTML = pendingItemLinks.map((link, index) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:rgba(255,255,255,0.05);border-radius:6px;margin-bottom:6px;">
      <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0;">
        <span style="font-size:16px;">🔗</span>
        <a href="${link.url}" target="_blank" style="color:#4facfe;text-decoration:none;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${link.title || link.url}</a>
      </div>
      <button onclick="removeItemLink(${index})" style="background:rgba(231,76,60,0.2);border:none;padding:5px 10px;border-radius:4px;color:#e74c3c;cursor:pointer;font-size:11px;margin-left:10px;">×</button>
    </div>
  `).join('');
}

function confirmDeleteKRItem() {
  if (!confirm('Delete this item and all its contents?')) return;
  deleteKRItem(currentKRForItem, currentKRItemIndex);
  closeKRItemModal();
}

function closeKRItemModal() {
  document.getElementById('kr-item-modal').classList.remove('active');
  pendingItemFiles = [];
  pendingItemLinks = [];
}

async function researchItem() {
  const name = document.getElementById('kr-item-name').value.trim();
  if (!name) {
    alert('Please enter a name to research');
    return;
  }
  
  if (!ANTHROPIC_API_KEY) {
    alert('Please set your Anthropic API key in AI Settings first');
    return;
  }
  
  const statusEl = document.getElementById('research-status');
  statusEl.style.display = 'block';
  statusEl.style.background = 'rgba(155,89,182,0.2)';
  statusEl.style.color = '#9b59b6';
  statusEl.innerHTML = '🔍 Searching for information about "' + name + '"...';
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        tools: [{
          type: 'web_search_20250305',
          name: 'web_search'
        }],
        messages: [{
          role: 'user',
          content: `Search for information about "${name}" and provide a brief summary with key details that would be useful for tracking a business partnership, speaking engagement, or professional relationship. Include: what they do, key contacts if available, recent news, and any relevant details. Keep it concise (3-4 bullet points).`
        }]
      })
    });
    
    if (!response.ok) throw new Error('API request failed');
    
    const result = await response.json();
    let researchText = '';
    for (const block of result.content) {
      if (block.type === 'text') {
        researchText += block.text;
      }
    }
    
    if (researchText) {
      // Append to notes
      const notesEl = document.getElementById('kr-item-notes');
      const existingNotes = notesEl.value.trim();
      notesEl.value = existingNotes + (existingNotes ? '\n\n' : '') + '--- Research ---\n' + researchText;
      
      statusEl.style.background = 'rgba(39,174,96,0.2)';
      statusEl.style.color = '#27ae60';
      statusEl.innerHTML = '✅ Research added to notes!';
      setTimeout(() => { statusEl.style.display = 'none'; }, 3000);
    } else {
      throw new Error('No results found');
    }
  } catch (e) {
    console.error('Research error:', e);
    statusEl.style.background = 'rgba(231,76,60,0.2)';
    statusEl.style.color = '#e74c3c';
    statusEl.innerHTML = '❌ Could not find information. Try a more specific name.';
    setTimeout(() => { statusEl.style.display = 'none'; }, 4000);
  }
}

async function fetchURLInfo() {
  const url = document.getElementById('kr-item-url').value.trim();
  if (!url) {
    alert('Please paste a URL first');
    return;
  }
  
  if (!ANTHROPIC_API_KEY) {
    alert('Please set your Anthropic API key in AI Settings first');
    return;
  }
  
  const statusEl = document.getElementById('research-status');
  statusEl.style.display = 'block';
  statusEl.style.background = 'rgba(52,152,219,0.2)';
  statusEl.style.color = '#3498db';
  statusEl.innerHTML = '🔗 Fetching information from URL...';
  
  try {
    // Try to fetch via CORS proxy
    let pageContent = '';
    try {
      const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
      const fetchResponse = await fetch(proxyUrl);
      if (fetchResponse.ok) {
        pageContent = await fetchResponse.text();
        // Strip HTML tags for cleaner text
        pageContent = pageContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                                 .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                                 .replace(/<[^>]+>/g, ' ')
                                 .replace(/\s+/g, ' ')
                                 .substring(0, 5000);
      }
    } catch (e) {
      console.log('Direct fetch failed, using search instead');
    }
    
    // Use AI to summarize
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        tools: pageContent ? [] : [{
          type: 'web_search_20250305',
          name: 'web_search'
        }],
        messages: [{
          role: 'user',
          content: pageContent 
            ? `Summarize the key information from this webpage content. Extract: organization name, what they do, key people/contacts, and any relevant details for a business relationship. Be concise.\n\nURL: ${url}\n\nContent:\n${pageContent}`
            : `Search for and summarize key information from this URL: ${url}. Include: what the organization/event is, key details, and any useful information for tracking a business relationship. Be concise.`
        }]
      })
    });
    
    if (!response.ok) throw new Error('API request failed');
    
    const result = await response.json();
    let summaryText = '';
    for (const block of result.content) {
      if (block.type === 'text') {
        summaryText += block.text;
      }
    }
    
    if (summaryText) {
      const notesEl = document.getElementById('kr-item-notes');
      const existingNotes = notesEl.value.trim();
      notesEl.value = existingNotes + (existingNotes ? '\n\n' : '') + '--- From URL ---\n🔗 ' + url + '\n\n' + summaryText;
      
      statusEl.style.background = 'rgba(39,174,96,0.2)';
      statusEl.style.color = '#27ae60';
      statusEl.innerHTML = '✅ URL info added to notes!';
      document.getElementById('kr-item-url').value = '';
      setTimeout(() => { statusEl.style.display = 'none'; }, 3000);
    } else {
      throw new Error('Could not extract information');
    }
  } catch (e) {
    console.error('Fetch URL error:', e);
    statusEl.style.background = 'rgba(231,76,60,0.2)';
    statusEl.style.color = '#e74c3c';
    statusEl.innerHTML = '❌ Could not fetch URL info. Try the Research button instead.';
    setTimeout(() => { statusEl.style.display = 'none'; }, 4000);
  }
}

function deleteKRItem(krIndex, itemIndex) {
  const okr = data.okrs.find(o => o.id === currentOKRId);
  if (okr && okr.keyresults[krIndex] && okr.keyresults[krIndex].items) {
    okr.keyresults[krIndex].items.splice(itemIndex, 1);
    
    // Auto-update KR current count
    okr.keyresults[krIndex].current = okr.keyresults[krIndex].items.length;
    
    // Update the current input field
    const krCurrentInput = document.getElementById(`kr-current-${krIndex}`);
    if (krCurrentInput) {
      krCurrentInput.value = okr.keyresults[krIndex].current;
    }
    
    // Update items count display
    const itemsCountEl = document.getElementById(`kr-items-count-${krIndex}`);
    if (itemsCountEl) {
      itemsCountEl.textContent = `${okr.keyresults[krIndex].items.length} of ${okr.keyresults[krIndex].target} added`;
    }
    
    saveLocal();
    document.getElementById(`kr-items-${krIndex}`).innerHTML = renderKRItems(okr.keyresults[krIndex].items, krIndex);
  }
}

function saveKRItem() {
  console.log('saveKRItem called. currentOKRId:', currentOKRId, 'currentKRForItem:', currentKRForItem);
  
  const okr = data.okrs.find(o => o.id === currentOKRId);
  if (!okr) {
    alert('Error: Could not find OKR. Please try again.');
    console.error('OKR not found:', currentOKRId);
    return;
  }
  
  if (currentKRForItem === null || currentKRForItem === undefined) {
    alert('Error: No KR selected. Please try again.');
    console.error('currentKRForItem is null');
    return;
  }
  
  const name = document.getElementById('kr-item-name').value.trim();
  if (!name) {
    alert('Please enter a name');
    return;
  }
  
  const item = {
    id: 'item_' + Date.now(),
    name: name,
    status: document.getElementById('kr-item-status').value,
    notes: document.getElementById('kr-item-notes').value,
    files: [...pendingItemFiles],
    links: [...pendingItemLinks],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Ensure items array exists
  if (!okr.keyresults[currentKRForItem].items) {
    okr.keyresults[currentKRForItem].items = [];
  }
  
  // Preserve createdAt and id if editing
  if (currentKRItemIndex !== null && okr.keyresults[currentKRForItem].items[currentKRItemIndex]) {
    const existing = okr.keyresults[currentKRForItem].items[currentKRItemIndex];
    item.createdAt = existing.createdAt || item.createdAt;
    item.id = existing.id || item.id;
    okr.keyresults[currentKRForItem].items[currentKRItemIndex] = item;
  } else {
    okr.keyresults[currentKRForItem].items.push(item);
  }
  
  // Auto-update KR current count to match number of items
  okr.keyresults[currentKRForItem].current = okr.keyresults[currentKRForItem].items.length;
  
  // Save immediately
  saveLocal();
  
  // Update the items display
  const itemsContainer = document.getElementById(`kr-items-${currentKRForItem}`);
  if (itemsContainer) {
    itemsContainer.innerHTML = renderKRItems(okr.keyresults[currentKRForItem].items, currentKRForItem);
  }
  
  // Update the KR current input field
  const krCurrentInput = document.getElementById(`kr-current-${currentKRForItem}`);
  if (krCurrentInput) {
    krCurrentInput.value = okr.keyresults[currentKRForItem].current;
  }
  
  // Update the items count display
  const itemsCountEl = document.getElementById(`kr-items-count-${currentKRForItem}`);
  if (itemsCountEl) {
    itemsCountEl.textContent = `${okr.keyresults[currentKRForItem].items.length} of ${okr.keyresults[currentKRForItem].target} added`;
  }
  
  // Clear pending data
  pendingItemFiles = [];
  pendingItemLinks = [];
  
  // Close just the item modal
  closeKRItemModal();
  
  console.log('Item saved successfully:', item.name);
}

// Pending files for item being edited/created
let pendingItemFiles = [];

async function handleItemFileUpload(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;
  
  for (const file of files) {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: e.target.result,
        uploadedAt: new Date().toISOString()
      };
      
      // Extract text from PDFs
      if (file.type === 'application/pdf') {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const extractedText = await extractPDFText(arrayBuffer);
          if (extractedText) {
            fileData.extractedText = extractedText;
          }
        } catch (err) {
          console.error('PDF extraction error:', err);
        }
      }
      
      pendingItemFiles.push(fileData);
      renderItemFilesList();
    };
    
    reader.readAsDataURL(file);
  }
  
  // Clear the input
  event.target.value = '';
}

function renderItemFilesList() {
  const container = document.getElementById('kr-item-files-list');
  if (!container) return;
  
  if (pendingItemFiles.length === 0) {
    container.innerHTML = '<div style="font-size:12px;opacity:0.5;padding:8px;text-align:center;">No files attached</div>';
    return;
  }
  
  container.innerHTML = pendingItemFiles.map((file, index) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:rgba(255,255,255,0.05);border-radius:6px;margin-bottom:6px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span>${getFileIcon(file.type)}</span>
        <span style="font-size:12px;">${file.name}</span>
        ${file.extractedText ? '<span style="font-size:10px;color:#27ae60;">✓ AI readable</span>' : ''}
      </div>
      <button onclick="removeItemFile(${index})" style="background:rgba(231,76,60,0.2);border:none;padding:4px 8px;border-radius:4px;color:#e74c3c;cursor:pointer;font-size:11px;">×</button>
    </div>
  `).join('');
}

function removeItemFile(index) {
  pendingItemFiles.splice(index, 1);
  renderItemFilesList();
}

function renderKRAttachments(attachments, krIndex) {
  if (!attachments || attachments.length === 0) {
    return '<div class="no-attachments">No files attached</div>';
  }
  return attachments.map((att, attIndex) => `
    <div class="attachment-item">
      <span class="att-icon">${getFileIcon(att.type)}</span>
      <span class="att-name">${att.name}${att.extractedText ? ' ✓ AI readable' : ''}</span>
      <span class="att-date">${formatAttDate(att.uploadedAt)}</span>
      ${att.type && att.type.startsWith('image/') ? `<button class="att-view" onclick="viewAttachment(${krIndex}, ${attIndex})">View</button>` : ''}
      ${att.extractedText ? `<button class="att-view" onclick="viewExtractedText(${krIndex}, ${attIndex})">Text</button>` : ''}
      <button class="att-delete" onclick="removeKRAttachment(${krIndex}, ${attIndex})">×</button>
    </div>
  `).join('');
}

function getFileIcon(type) {
  if (!type) return '📄';
  if (type.startsWith('image/')) return '🖼️';
  if (type.includes('pdf')) return '📕';
  if (type.includes('word') || type.includes('document')) return '📘';
  if (type.includes('sheet') || type.includes('excel')) return '📗';
  if (type.includes('presentation') || type.includes('powerpoint')) return '📙';
  return '📄';
}

function formatAttDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function triggerKRFileUpload(krIndex) {
  currentKRIndex = krIndex;
  document.getElementById('kr-file-input').click();
}

// Extract text from PDF using PDF.js
async function extractPDFText(arrayBuffer) {
  try {
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += `\n--- Page ${i} ---\n${pageText}`;
    }
    
    return fullText.trim();
  } catch (e) {
    console.error('PDF extraction error:', e);
    return null;
  }
}

async function handleKRFileUpload(event) {
  const okr = data.okrs.find(o => o.id === currentOKRId);
  if (!okr || currentKRIndex === null) return;
  
  const kr = okr.keyresults[currentKRIndex];
  if (!kr.attachments) kr.attachments = [];
  
  const files = event.target.files;
  for (let file of files) {
    // Check file size (limit to 5MB per file)
    if (file.size > 5 * 1024 * 1024) {
      alert(`File "${file.name}" is too large. Max 5MB per file.`);
      continue;
    }
    
    // Handle PDFs - extract text
    if (file.type === 'application/pdf') {
      const statusEl = document.getElementById(`kr-att-${currentKRIndex}`);
      statusEl.innerHTML = '<div style="padding:12px;color:#4facfe;">📄 Extracting text from PDF...</div>';
      
      const arrayBuffer = await file.arrayBuffer();
      const extractedText = await extractPDFText(arrayBuffer);
      
      if (extractedText) {
        kr.attachments.push({
          name: file.name,
          type: 'application/pdf',
          size: file.size,
          extractedText: extractedText.substring(0, 50000), // Limit to ~50k chars
          uploadedBy: currentUser,
          uploadedAt: new Date().toISOString()
        });
        statusEl.innerHTML = renderKRAttachments(kr.attachments, currentKRIndex);
        
        // Auto-add summary to notes if empty
        if (!kr.notes) {
          kr.notes = `[PDF: ${file.name}]\n${extractedText.substring(0, 500)}...`;
        }
      } else {
        alert('Could not extract text from PDF. Try a different file.');
        statusEl.innerHTML = renderKRAttachments(kr.attachments, currentKRIndex);
      }
      continue;
    }
    
    // Handle text files - read directly
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const text = await file.text();
      kr.attachments.push({
        name: file.name,
        type: 'text/plain',
        size: file.size,
        extractedText: text.substring(0, 50000),
        uploadedBy: currentUser,
        uploadedAt: new Date().toISOString()
      });
      document.getElementById(`kr-att-${currentKRIndex}`).innerHTML = renderKRAttachments(kr.attachments, currentKRIndex);
      continue;
    }
    
    // Handle images and other files - store as base64
    const reader = new FileReader();
    reader.onload = (e) => {
      kr.attachments.push({
        name: file.name,
        type: file.type,
        size: file.size,
        data: e.target.result,
        uploadedBy: currentUser,
        uploadedAt: new Date().toISOString()
      });
      document.getElementById(`kr-att-${currentKRIndex}`).innerHTML = renderKRAttachments(kr.attachments, currentKRIndex);
    };
    reader.readAsDataURL(file);
  }
  event.target.value = '';
}

function removeKRAttachment(krIndex, attIndex) {
  if (!confirm('Remove this attachment?')) return;
  const okr = data.okrs.find(o => o.id === currentOKRId);
  if (okr && okr.keyresults[krIndex]) {
    okr.keyresults[krIndex].attachments.splice(attIndex, 1);
    document.getElementById(`kr-att-${krIndex}`).innerHTML = renderKRAttachments(okr.keyresults[krIndex].attachments, krIndex);
  }
}

function viewAttachment(krIndex, attIndex) {
  const okr = data.okrs.find(o => o.id === currentOKRId);
  if (okr && okr.keyresults[krIndex] && okr.keyresults[krIndex].attachments[attIndex]) {
    const att = okr.keyresults[krIndex].attachments[attIndex];
    if (att.type && att.type.startsWith('image/')) {
      // Show image in new window
      const win = window.open();
      win.document.write(`<img src="${att.data}" style="max-width:100%;">`);
    } else {
      // Download other files
      const link = document.createElement('a');
      link.href = att.data;
      link.download = att.name;
      link.click();
    }
  }
}

function viewExtractedText(krIndex, attIndex) {
  const okr = data.okrs.find(o => o.id === currentOKRId);
  if (okr && okr.keyresults[krIndex] && okr.keyresults[krIndex].attachments[attIndex]) {
    const att = okr.keyresults[krIndex].attachments[attIndex];
    if (att.extractedText) {
      // Show extracted text in a modal/new window
      const win = window.open('', '_blank', 'width=800,height=600');
      win.document.write(`
        <html>
        <head><title>${att.name} - Extracted Text</title>
        <style>body{font-family:system-ui;padding:20px;line-height:1.6;max-width:800px;margin:0 auto;}</style>
        </head>
        <body>
        <h2>📄 ${att.name}</h2>
        <p style="color:#666;font-size:14px;">This text was extracted from the PDF and is readable by the AI.</p>
        <hr>
        <pre style="white-space:pre-wrap;font-size:14px;">${att.extractedText}</pre>
        </body>
        </html>
      `);
    }
  }
}

function toggleKRComplete(index) {
  const okr = data.okrs.find(o => o.id === currentOKRId);
  if (okr && okr.keyresults[index]) {
    okr.keyresults[index].complete = !okr.keyresults[index].complete;
    openOKRModal(currentOKRId); // Re-render
  }
}

function renderAttachments(okr) {
  const list = document.getElementById('attachment-list');
  const attachments = okr.attachments || [];
  
  list.innerHTML = attachments.map((att, i) => `
    <div class="attachment-item">
      📎 ${att.name}
      <button onclick="removeAttachment(${i})">×</button>
    </div>
  `).join('');
}

function handleFileUpload(event) {
  const okr = data.okrs.find(o => o.id === currentOKRId);
  if (!okr) return;
  
  const files = event.target.files;
  for (let file of files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!okr.attachments) okr.attachments = [];
      okr.attachments.push({
        name: file.name,
        type: file.type,
        data: e.target.result,
        uploadedBy: currentUser,
        uploadedAt: new Date().toISOString()
      });
      renderAttachments(okr);
    };
    reader.readAsDataURL(file);
  }
}

function removeAttachment(index) {
  const okr = data.okrs.find(o => o.id === currentOKRId);
  if (okr && okr.attachments) {
    okr.attachments.splice(index, 1);
    renderAttachments(okr);
  }
}

async function saveOKRChanges() {
  const okr = data.okrs.find(o => o.id === currentOKRId);
  if (!okr) return;
  
  // Get updated KR values from inputs
  const inputs = document.querySelectorAll('#kr-editor input');
  inputs.forEach(input => {
    const index = parseInt(input.dataset.krIndex);
    const field = input.dataset.field;
    if (okr.keyresults[index]) {
      if (field === 'text') {
        okr.keyresults[index].text = input.value;
      } else {
        okr.keyresults[index][field] = parseFloat(input.value) || 0;
      }
    }
  });
  
  // Get updated KR notes and descriptions from textareas
  const textareas = document.querySelectorAll('#kr-editor textarea');
  textareas.forEach(textarea => {
    const index = parseInt(textarea.dataset.krIndex);
    const field = textarea.dataset.field;
    if (okr.keyresults[index] && field) {
      okr.keyresults[index][field] = textarea.value;
    }
  });
  
  okr.notes = document.getElementById('okr-notes').value;
  
  await saveToServer('saveOKR', { okr });
  
  closeModal('okr-modal');
  render();
}

async function deleteOKR() {
  const okr = data.okrs.find(o => o.id === currentOKRId);
  if (!okr) return;
  
  if (!confirm(`Delete "${okr.category}"? This cannot be undone.`)) return;
  
  data.okrs = data.okrs.filter(o => o.id !== currentOKRId);
  await saveToServer('deleteItem', { type: 'okr', id: currentOKRId });
  
  closeModal('okr-modal');
  render();
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// ============================================
// CALENDAR
// ============================================

// ICS Import Functions
function triggerCalendarImport() {
  document.getElementById('ics-file-input').click();
}

function showCalendarURLImport() {
  const urlInput = document.getElementById('calendar-url-input');
  urlInput.style.display = urlInput.style.display === 'none' ? 'block' : 'none';
}

async function importFromURL() {
  const url = document.getElementById('cal-url').value.trim();
  if (!url) {
    alert('Please paste a calendar URL');
    return;
  }
  
  const statusEl = document.getElementById('import-status');
  statusEl.style.display = 'block';
  statusEl.style.background = 'rgba(79,172,254,0.2)';
  statusEl.style.color = '#4facfe';
  statusEl.innerHTML = '⏳ Fetching calendar from URL...';
  
  try {
    // Try direct fetch first
    let response;
    try {
      response = await fetch(url);
    } catch (e) {
      // CORS error - try proxy
      statusEl.innerHTML = '⏳ Trying alternate method...';
      response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(url));
    }
    
    if (!response.ok) {
      throw new Error('Could not fetch calendar. Status: ' + response.status);
    }
    
    const text = await response.text();
    
    if (!text.includes('BEGIN:VCALENDAR')) {
      throw new Error('URL does not contain valid calendar data');
    }
    
    statusEl.innerHTML = '⏳ Parsing events...';
    const events = parseICS(text);
    
    if (events.length === 0) {
      statusEl.style.background = 'rgba(231,76,60,0.2)';
      statusEl.style.color = '#e74c3c';
      statusEl.innerHTML = '❌ No events found. The calendar may be set to "availability only".';
      setTimeout(() => { statusEl.style.display = 'none'; }, 5000);
      return;
    }
    
    // Add events
    let imported = 0;
    for (const evt of events) {
      const exists = data.events.some(e => e.title === evt.title && e.date === evt.date);
      if (!exists) {
        data.events.push(evt);
        imported++;
      }
    }
    
    saveLocal();
    renderCalendar();
    renderEvents();
    
    // Save URL for future use
    localStorage.setItem('calendar_url', url);
    
    document.getElementById('calendar-url-input').style.display = 'none';
    document.getElementById('cal-url').value = '';
    
    statusEl.style.background = 'rgba(39,174,96,0.2)';
    statusEl.style.color = '#27ae60';
    statusEl.innerHTML = `✅ Imported ${imported} events from URL!`;
    setTimeout(() => { statusEl.style.display = 'none'; }, 5000);
    
  } catch (e) {
    console.error('URL import error:', e);
    statusEl.style.background = 'rgba(231,76,60,0.2)';
    statusEl.style.color = '#e74c3c';
    statusEl.innerHTML = `❌ Error: ${e.message}. Try downloading the .ics file instead.`;
    setTimeout(() => { statusEl.style.display = 'none'; }, 6000);
  }
}

function clearImportedEvents() {
  const importedCount = data.events.filter(e => e.id && e.id.startsWith('evt_')).length;
  
  if (importedCount === 0) {
    alert('No imported events to clear.');
    return;
  }
  
  if (!confirm(`Clear ${importedCount} imported events? This cannot be undone.`)) return;
  
  // Remove events that were imported (have evt_ prefix)
  data.events = data.events.filter(e => !e.id || !e.id.startsWith('evt_'));
  saveLocal();
  renderCalendar();
  renderEvents();
  
  alert(`Cleared ${importedCount} imported events. You can now re-import your calendar.`);
}

// ============================================
// SCHEDULE IMPORT FROM COPILOT
// ============================================

function showImportScheduleModal() {
  document.getElementById('schedule-text').value = '';
  document.getElementById('schedule-preview').style.display = 'none';
  document.getElementById('import-schedule-modal').classList.add('active');
}

function parseCopilotSchedule(text) {
  const events = [];
  const lines = text.split('\n');
  
  let currentDate = null;
  let currentEvent = null;
  let inFullInvitation = false;
  let fullInvitationText = '';
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const monthAbbrev = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Helper to parse date like "Monday, January 12, 2026" or "Monday, Jan 12, 2026"
  function parseDate(line) {
    const dateMatch = line.match(/(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s+(\w+)\s+(\d+),?\s+(\d{4})/i);
    if (dateMatch) {
      let month = monthNames.indexOf(dateMatch[1]);
      // Try abbreviated month names if full name not found
      if (month === -1) {
        month = monthAbbrev.indexOf(dateMatch[1]);
      }
      const day = parseInt(dateMatch[2]);
      const year = parseInt(dateMatch[3]);
      if (month >= 0 && day > 0 && year > 2000) {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      }
    }
    return null;
  }
  
  // Helper to parse time like "8:00 AM – 9:00 AM" with or without "Time:" prefix
  function parseTime(line) {
    // Match with "Time:" prefix
    let timeMatch = line.match(/Time:\s*(\d{1,2}:\d{2}\s*(?:AM|PM))\s*[–-]\s*(\d{1,2}:\d{2}\s*(?:AM|PM))/i);
    if (timeMatch) {
      return { start: timeMatch[1].trim(), end: timeMatch[2].trim() };
    }
    // Match standalone time (no "Time:" prefix)
    timeMatch = line.match(/^(\d{1,2}:\d{2}\s*(?:AM|PM))\s*[–-]\s*(\d{1,2}:\d{2}\s*(?:AM|PM))$/i);
    if (timeMatch) {
      return { start: timeMatch[1].trim(), end: timeMatch[2].trim() };
    }
    return null;
  }
  
  // Helper to determine event type from title
  function guessEventType(title) {
    const t = title.toLowerCase();
    if (t.includes('board')) return 'board';
    if (t.includes('speak') || t.includes('panel') || t.includes('webinar') || t.includes('presentation')) return 'speaking';
    if (t.includes('travel') || t.includes('flight')) return 'travel';
    if (t.includes('deadline') || t.includes('due')) return 'deadline';
    return 'meeting';
  }
  
  function saveCurrentEvent() {
    if (currentEvent && currentEvent.title && currentDate) {
      currentEvent.date = currentDate;
      if (inFullInvitation && fullInvitationText) {
        currentEvent.fullInvitation = fullInvitationText.trim();
      }
      currentEvent.type = guessEventType(currentEvent.title);
      currentEvent.id = 'evt_copilot_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
      currentEvent.source = 'copilot';
      events.push({...currentEvent});
      currentEvent = null;
      inFullInvitation = false;
      fullInvitationText = '';
    }
  }
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines and separator lines (like "----")
    if (!line || /^-+$/.test(line)) {
      if (!inFullInvitation) continue;
    }
    
    // Check for date line
    const newDate = parseDate(line);
    if (newDate) {
      saveCurrentEvent();
      currentDate = newDate;
      continue;
    }
    
    // Check for time line - can appear with or without event already started
    const timeInfo = parseTime(line);
    if (timeInfo) {
      if (currentEvent) {
        // Time for existing event
        currentEvent.time = timeInfo.start + ' - ' + timeInfo.end;
        currentEvent.startTime = timeInfo.start;
        currentEvent.endTime = timeInfo.end;
      } else if (currentDate && i > 0) {
        // Standalone time after a title - previous line was likely the title
        const prevLine = lines[i-1].trim();
        if (prevLine && !prevLine.match(/^-+$/) && !parseDate(prevLine)) {
          saveCurrentEvent();
          currentEvent = { 
            title: prevLine,
            time: timeInfo.start + ' - ' + timeInfo.end,
            startTime: timeInfo.start,
            endTime: timeInfo.end
          };
        }
      }
      continue;
    }
    
    // Check for organizer
    if (line.startsWith('Organizer:') && currentEvent) {
      currentEvent.organizer = line.replace('Organizer:', '').trim();
      continue;
    }
    
    // Check for location
    if (line.startsWith('Location:') && currentEvent) {
      currentEvent.location = line.replace('Location:', '').trim();
      continue;
    }
    
    // Check for Meeting ID
    if (line.match(/Meeting ID:/i) && currentEvent) {
      if (!currentEvent.notes) currentEvent.notes = '';
      currentEvent.notes += (currentEvent.notes ? '\n' : '') + line;
      continue;
    }
    
    // Check for Status
    if (line.startsWith('Status:') && currentEvent) {
      currentEvent.status = line.replace('Status:', '').trim();
      continue;
    }
    
    // Check for Category
    if (line.startsWith('Category:') && currentEvent) {
      currentEvent.category = line.replace('Category:', '').trim();
      continue;
    }
    
    // Check for invitees section
    if (line.startsWith('Invitees:') && currentEvent) {
      currentEvent.invitees = [];
      const inviteesText = line.replace('Invitees:', '').trim();
      if (inviteesText) {
        // Split by semicolon or comma
        const inviteesList = inviteesText.split(/[;,]/).map(i => i.trim()).filter(i => i);
        currentEvent.invitees.push(...inviteesList);
      }
      continue;
    }
    
    // Collect invitees (lines starting with •)
    if ((line.startsWith('•') || line.startsWith('-')) && currentEvent && !inFullInvitation) {
      if (!currentEvent.invitees) currentEvent.invitees = [];
      const invitee = line.replace(/^[•\-]\s*/, '').trim();
      if (invitee && !invitee.startsWith('http')) {
        currentEvent.invitees.push(invitee);
      }
      continue;
    }
    
    // Check for notes
    if (line.startsWith('Notes:') && currentEvent) {
      currentEvent.notes = line.replace('Notes:', '').trim();
      continue;
    }
    
    // Check for conflicts
    if (line.startsWith('Conflicts with:') && currentEvent) {
      currentEvent.conflicts = line.replace('Conflicts with:', '').trim();
      continue;
    }
    
    // Check for Full Invitation section
    if (line.startsWith('Full Invitation:')) {
      inFullInvitation = true;
      fullInvitationText = '';
      continue;
    }
    
    // If in Full Invitation, collect text until next event
    if (inFullInvitation) {
      // Check if this looks like a new event title (line after a date, before Time:)
      if (currentDate && lines[i+1] && (lines[i+1].trim().startsWith('Time:') || parseTime(lines[i+1].trim()))) {
        inFullInvitation = false;
        saveCurrentEvent();
        currentEvent = { title: line };
      } else {
        fullInvitationText += line + '\n';
      }
      continue;
    }
    
    // If we have a date and this isn't a known field, it might be an event title
    // But only if it's not just a separator line and looks like actual content
    if (currentDate && line && !line.includes(':') && !line.startsWith('•') && !line.startsWith('_') && !/^-+$/.test(line)) {
      // Check if next line is Time: or a time pattern to confirm this is a title
      const nextLine = lines[i+1] ? lines[i+1].trim() : '';
      const nextLineTime = parseTime(nextLine);
      if (nextLine.startsWith('Time:') || nextLineTime || (i > 0 && parseDate(lines[i-1]))) {
        // Don't save if this looks like it might be a continuation of event details
        if (!currentEvent || (currentEvent && currentEvent.time)) {
          saveCurrentEvent();
          currentEvent = { title: line };
        }
      }
    }
  }
  
  // Save last event
  saveCurrentEvent();
  
  return events;
}

function previewScheduleImport() {
  const text = document.getElementById('schedule-text').value;
  if (!text.trim()) {
    alert('Please paste your schedule first.');
    return;
  }
  
  const events = parseCopilotSchedule(text);
  const previewEl = document.getElementById('schedule-preview');
  const contentEl = document.getElementById('schedule-preview-content');
  
  if (events.length === 0) {
    previewEl.style.display = 'block';
    previewEl.style.background = 'rgba(231,76,60,0.1)';
    contentEl.innerHTML = '<p style="color: #e74c3c;">No events detected. Make sure the format matches the Copilot output.</p>';
    return;
  }
  
  previewEl.style.display = 'block';
  previewEl.style.background = 'rgba(46,204,113,0.1)';
  contentEl.innerHTML = `
    <p style="margin-bottom: 8px;"><strong>${events.length} events detected:</strong></p>
    ${events.map(e => `
      <div style="padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <strong>${e.title}</strong><br>
        <span style="opacity: 0.7; font-size: 12px;">${e.date} ${e.time || ''} ${e.location ? '• ' + e.location : ''}</span>
      </div>
    `).join('')}
  `;
}

function importScheduleFromText() {
  const text = document.getElementById('schedule-text').value;
  if (!text.trim()) {
    alert('Please paste your schedule first.');
    return;
  }
  
  const events = parseCopilotSchedule(text);
  
  if (events.length === 0) {
    alert('No events detected. Make sure the format matches the Copilot output.');
    return;
  }
  
  // Check for duplicates
  const existingIds = new Set(data.events.map(e => e.date + '_' + e.title));
  let addedCount = 0;
  let skippedCount = 0;
  
  events.forEach(event => {
    const eventKey = event.date + '_' + event.title;
    if (existingIds.has(eventKey)) {
      skippedCount++;
    } else {
      data.events.push(event);
      existingIds.add(eventKey);
      addedCount++;
    }
  });
  
  saveLocal();
  renderCalendar();
  renderEvents();
  
  closeModal('import-schedule-modal');
  
  let message = `✅ Imported ${addedCount} events!`;
  if (skippedCount > 0) {
    message += `\n(${skippedCount} duplicates skipped)`;
  }
  alert(message);
}

async function handleSchedulePDFImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const textArea = document.getElementById('schedule-text');
  
  if (file.name.endsWith('.txt')) {
    const text = await file.text();
    textArea.value = text;
    previewScheduleImport();
    return;
  }
  
  if (file.name.endsWith('.pdf')) {
    // Use PDF.js if available, otherwise inform user
    if (typeof pdfjsLib !== 'undefined') {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        let fullText = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += pageText + '\n';
        }
        
        textArea.value = fullText;
        previewScheduleImport();
      } catch (e) {
        alert('Error reading PDF. Please copy/paste the text instead.');
      }
    } else {
      alert('PDF parsing not available. Please copy/paste the text from your PDF directly.');
    }
  }
  
  // Reset file input
  event.target.value = '';
}

async function handleICSImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const statusEl = document.getElementById('import-status');
  statusEl.style.display = 'block';
  statusEl.style.background = 'rgba(79,172,254,0.2)';
  statusEl.style.color = '#4facfe';
  statusEl.innerHTML = '⏳ Reading file...';
  
  try {
    const text = await file.text();
    statusEl.innerHTML = '⏳ Parsing events...';
    
    const events = parseICS(text);
    
    if (events.length === 0) {
      statusEl.style.background = 'rgba(231,76,60,0.2)';
      statusEl.style.color = '#e74c3c';
      statusEl.innerHTML = '❌ No events found in the file. Make sure it\'s a valid .ics file.';
      setTimeout(() => { statusEl.style.display = 'none'; }, 4000);
      return;
    }
    
    statusEl.innerHTML = `⏳ Importing ${events.length} events...`;
    
    // Add events to data
    let imported = 0;
    for (const evt of events) {
      // Check if event already exists (by title + date)
      const exists = data.events.some(e => e.title === evt.title && e.date === evt.date);
      if (!exists) {
        data.events.push(evt);
        imported++;
      }
    }
    
    saveLocal();
    renderCalendar();
    renderEvents();
    
    // Save to server in background (don't wait)
    if (API_URL && imported > 0) {
      statusEl.innerHTML = `✅ Imported ${imported} events! Syncing to server...`;
      const newEvents = data.events.slice(-imported);
      for (const evt of newEvents) {
        saveToServer('saveEvent', { event: evt }).catch(e => console.error('Save error:', e));
      }
    }
    
    statusEl.style.background = 'rgba(39,174,96,0.2)';
    statusEl.style.color = '#27ae60';
    statusEl.innerHTML = `✅ Imported ${imported} events! (${events.length - imported} duplicates skipped)`;
    setTimeout(() => { statusEl.style.display = 'none'; }, 5000);
    
  } catch (e) {
    console.error('ICS import error:', e);
    statusEl.style.background = 'rgba(231,76,60,0.2)';
    statusEl.style.color = '#e74c3c';
    statusEl.innerHTML = '❌ Error: ' + e.message;
    setTimeout(() => { statusEl.style.display = 'none'; }, 5000);
  }
  
  event.target.value = '';
}

function parseICS(icsText) {
  const events = [];
  
  // Normalize line endings and unfold long lines (ICS spec allows line folding)
  let normalized = icsText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  normalized = normalized.replace(/\n[ \t]/g, ''); // Unfold continued lines
  
  // Split into individual VEVENT blocks
  const eventBlocks = normalized.split('BEGIN:VEVENT');
  
  console.log('Found ' + (eventBlocks.length - 1) + ' event blocks');
  
  for (let i = 1; i < eventBlocks.length; i++) {
    const block = eventBlocks[i].split('END:VEVENT')[0];
    
    try {
      const event = {
        id: 'evt_' + Date.now() + '_' + i,
        title: '',
        date: '',
        type: 'meeting',
        notes: '',
        okrLink: ''
      };
      
      // Parse line by line for better reliability
      const lines = block.split('\n');
      let description = '';
      let location = '';
      let organizer = '';
      let attendees = [];
      
      for (const line of lines) {
        // SUMMARY (title)
        if (line.startsWith('SUMMARY')) {
          event.title = line.split(':').slice(1).join(':').replace(/\\n/g, ' ').replace(/\\,/g, ',').trim();
        }
        
        // DTSTART (date) - handles multiple formats
        if (line.startsWith('DTSTART')) {
          const dateStr = line.split(':').slice(1).join(':');
          // Extract YYYYMMDD from various formats
          const match = dateStr.match(/(\d{4})(\d{2})(\d{2})/);
          if (match) {
            event.date = `${match[1]}-${match[2]}-${match[3]}`;
          }
        }
        
        // DESCRIPTION (notes)
        if (line.startsWith('DESCRIPTION')) {
          description = line.split(':').slice(1).join(':').replace(/\\n/g, '\n').replace(/\\,/g, ',').trim();
        }
        
        // LOCATION
        if (line.startsWith('LOCATION')) {
          location = line.split(':').slice(1).join(':').replace(/\\,/g, ',').trim();
        }
        
        // ORGANIZER
        if (line.startsWith('ORGANIZER')) {
          const orgMatch = line.match(/CN=([^;:]+)/i);
          if (orgMatch) organizer = orgMatch[1];
        }
        
        // ATTENDEE
        if (line.startsWith('ATTENDEE')) {
          const attMatch = line.match(/CN=([^;:]+)/i);
          if (attMatch) attendees.push(attMatch[1]);
        }
        
        // X-ALT-DESC (Outlook HTML description)
        if (line.startsWith('X-ALT-DESC')) {
          // Sometimes has better info than DESCRIPTION
          const altDesc = line.split(':').slice(1).join(':').replace(/<[^>]*>/g, ' ').trim();
          if (altDesc.length > description.length) {
            description = altDesc.substring(0, 500);
          }
        }
      }
      
      // If title is "Busy" or empty, try to build from other fields
      if (!event.title || event.title.toLowerCase() === 'busy' || event.title.toLowerCase() === 'free') {
        if (description) {
          // Use first line of description as title
          event.title = description.split('\n')[0].substring(0, 100);
        } else if (organizer) {
          event.title = `Meeting with ${organizer}`;
        } else if (attendees.length > 0) {
          event.title = `Meeting with ${attendees[0]}${attendees.length > 1 ? ' +' + (attendees.length - 1) : ''}`;
        } else {
          event.title = 'Busy (private event)';
        }
      }
      
      // Build notes from available info
      let notesParts = [];
      if (description && description !== event.title) notesParts.push(description.substring(0, 300));
      if (location) notesParts.push(`📍 ${location}`);
      if (organizer) notesParts.push(`👤 Organizer: ${organizer}`);
      if (attendees.length > 0) notesParts.push(`👥 Attendees: ${attendees.slice(0, 5).join(', ')}${attendees.length > 5 ? '...' : ''}`);
      event.notes = notesParts.join('\n');
      
      // Guess event type from title
      if (event.title) {
        const titleLower = event.title.toLowerCase();
        if (titleLower.includes('board')) event.type = 'board';
        else if (titleLower.includes('travel') || titleLower.includes('flight') || titleLower.includes('hotel')) event.type = 'travel';
        else if (titleLower.includes('speak') || titleLower.includes('conference') || titleLower.includes('keynote')) event.type = 'speaking';
        else if (titleLower.includes('deadline') || titleLower.includes('due')) event.type = 'deadline';
      }
      
      // Only add if we have title and date
      if (event.title && event.date) {
        events.push(event);
        console.log('Parsed event:', event.title, event.date);
      }
    } catch (e) {
      console.error('Error parsing event block:', e);
    }
  }
  
  return events;
}

function renderCalendar() {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  document.getElementById('calendar-title').textContent = 
    currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  const grid = document.getElementById('calendar-grid');
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  
  let html = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    .map(d => `<div class="calendar-header">${d}</div>`).join('');
  
  // Previous month padding
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--) {
    html += `<div class="calendar-day other-month">${prevMonthDays - i}</div>`;
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = data.events.filter(e => e.date === dateStr);
    const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    
    html += `
      <div class="calendar-day ${isToday ? 'today' : ''} ${dayEvents.length ? 'has-event' : ''}" onclick="showDayEvents('${dateStr}')">
        ${day}
        ${dayEvents.slice(0, 2).map(e => `<div class="event-dot" style="background: ${getEventColor(e.type)}"></div>`).join('')}
      </div>
    `;
  }
  
  // Next month padding
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  for (let i = 1; i <= totalCells - firstDay - daysInMonth; i++) {
    html += `<div class="calendar-day other-month">${i}</div>`;
  }
  
  grid.innerHTML = html;
}

function showDayEvents(dateStr) {
  const dayEvents = data.events.filter(e => e.date === dateStr);
  const dateDisplay = new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  
  if (dayEvents.length === 0) {
    alert(`No events on ${dateDisplay}`);
    return;
  }
  
  const eventList = dayEvents.map(e => `• ${e.title}${e.notes ? ' - ' + e.notes.substring(0, 50) : ''}`).join('\n');
  alert(`${dateDisplay}\n\n${eventList}`);
}

function getEventColor(type) {
  const colors = { board: '#e74c3c', speaking: '#9b59b6', travel: '#3498db', meeting: '#27ae60', deadline: '#f39c12' };
  return colors[type] || '#666';
}

function changeMonth(delta) {
  currentMonth.setMonth(currentMonth.getMonth() + delta);
  renderCalendar();
  renderEvents();
}

function renderEvents() {
  const list = document.getElementById('event-list');
  
  // Show events for the current displayed month
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const monthEvents = data.events
    .filter(e => {
      const d = new Date(e.date + 'T12:00:00');
      return d.getFullYear() === year && d.getMonth() === month;
    })
    .sort((a, b) => {
      // Sort by date, then by time
      const dateCompare = new Date(a.date + 'T12:00:00') - new Date(b.date + 'T12:00:00');
      if (dateCompare !== 0) return dateCompare;
      if (a.startTime && b.startTime) {
        return a.startTime.localeCompare(b.startTime);
      }
      return 0;
    });
  
  if (monthEvents.length === 0) {
    list.innerHTML = '<p style="opacity: 0.5; padding: 20px; text-align: center;">No events this month</p>';
    return;
  }
  
  list.innerHTML = monthEvents.map(e => {
    const date = new Date(e.date + 'T12:00:00');
    const hasDetails = e.time || e.location || e.invitees;
    return `
      <div class="event-item" style="cursor: pointer;" onclick="showEventDetails('${e.id}')">
        <div class="event-date">
          <div class="day">${date.getDate()}</div>
          <div class="month">${date.toLocaleDateString('en-US', { month: 'short' })}</div>
        </div>
        <div class="event-details" style="flex: 1;">
          <div class="event-title">${e.title}</div>
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span class="event-type ${e.type}">${e.type}</span>
            ${e.time ? `<span style="font-size: 11px; opacity: 0.7;">🕐 ${e.time}</span>` : ''}
            ${e.location ? `<span style="font-size: 11px; opacity: 0.7;">📍 ${e.location.substring(0, 30)}${e.location.length > 30 ? '...' : ''}</span>` : ''}
          </div>
          ${e.invitees && e.invitees.length > 0 ? `<div style="font-size: 11px; opacity: 0.6; margin-top: 4px;">👥 ${e.invitees.length} attendees</div>` : ''}
        </div>
        <button style="background:none;border:none;color:#e74c3c;cursor:pointer;font-size:18px;" onclick="event.stopPropagation(); deleteEvent('${e.id}')">×</button>
      </div>
    `;
  }).join('');
}

function showEventDetails(eventId) {
  const e = data.events.find(ev => ev.id === eventId);
  if (!e) return;
  
  // Populate modal for editing
  document.getElementById('event-modal-title').textContent = '✏️ Edit Event';
  document.getElementById('event-id').value = e.id;
  document.getElementById('event-title').value = e.title || '';
  document.getElementById('event-date').value = e.date || '';
  document.getElementById('event-location').value = e.location || '';
  document.getElementById('event-type').value = e.type || 'meeting';
  document.getElementById('event-notes').value = e.notes || '';
  
  // Parse time - could be "8:00 AM - 9:00 AM" or "8:00 AM" or "08:00"
  let startTime = '';
  let endTime = '';
  if (e.startTime) {
    startTime = convertTo24Hour(e.startTime);
  } else if (e.time) {
    const timeParts = e.time.split(' - ');
    startTime = convertTo24Hour(timeParts[0]);
    if (timeParts[1]) endTime = convertTo24Hour(timeParts[1]);
  }
  document.getElementById('event-start-time').value = startTime;
  document.getElementById('event-end-time').value = endTime || e.endTime ? convertTo24Hour(e.endTime) : '';
  
  document.getElementById('event-modal').classList.add('active');
}

function convertTo24Hour(timeStr) {
  if (!timeStr) return '';
  timeStr = timeStr.trim();
  
  // Already in 24-hour format
  if (/^\d{2}:\d{2}$/.test(timeStr)) return timeStr;
  
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return '';
  
  let hours = parseInt(match[1]);
  const minutes = match[2];
  const period = match[3];
  
  if (period) {
    if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
    if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
  }
  
  return String(hours).padStart(2, '0') + ':' + minutes;
}

function convertTo12Hour(timeStr) {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':');
  let h = parseInt(hours);
  const period = h >= 12 ? 'PM' : 'AM';
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${h}:${minutes} ${period}`;
}

function showAddEventModal() {
  document.getElementById('event-modal-title').textContent = '📅 Add Event';
  document.getElementById('event-id').value = '';
  document.getElementById('event-title').value = '';
  document.getElementById('event-date').value = '';
  document.getElementById('event-start-time').value = '';
  document.getElementById('event-end-time').value = '';
  document.getElementById('event-location').value = '';
  document.getElementById('event-type').value = 'meeting';
  document.getElementById('event-notes').value = '';
  document.getElementById('event-modal').classList.add('active');
}

async function saveEvent() {
  const existingId = document.getElementById('event-id').value;
  const title = document.getElementById('event-title').value.trim();
  const date = document.getElementById('event-date').value;
  
  if (!title || !date) {
    alert('Please fill in title and date');
    return;
  }
  
  const startTime = document.getElementById('event-start-time').value;
  const endTime = document.getElementById('event-end-time').value;
  const timeDisplay = startTime ? 
    (endTime ? `${convertTo12Hour(startTime)} - ${convertTo12Hour(endTime)}` : convertTo12Hour(startTime)) : '';
  
  const eventData = {
    title: title,
    date: date,
    time: timeDisplay,
    startTime: startTime ? convertTo12Hour(startTime) : '',
    endTime: endTime ? convertTo12Hour(endTime) : '',
    location: document.getElementById('event-location').value.trim(),
    type: document.getElementById('event-type').value,
    notes: document.getElementById('event-notes').value.trim()
  };
  
  if (existingId) {
    // Update existing event
    const index = data.events.findIndex(e => e.id === existingId);
    if (index !== -1) {
      data.events[index] = { ...data.events[index], ...eventData };
    }
  } else {
    // Add new event
    eventData.id = 'evt_' + Date.now();
    data.events.push(eventData);
  }
  
  saveLocal();
  closeModal('event-modal');
  render();
}

async function deleteEvent(id) {
  if (!confirm('Delete this event?')) return;
  data.events = data.events.filter(e => e.id !== id);
  await saveToServer('deleteItem', { type: 'event', id });
  render();
}

// ============================================
// EXPENSES
// ============================================
function renderExpenses() {
  // Summary
  const total = data.expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const byCategory = {};
  data.expenses.forEach(e => {
    byCategory[e.category] = (byCategory[e.category] || 0) + (parseFloat(e.amount) || 0);
  });
  
  document.getElementById('expense-summary').innerHTML = `
    <div class="expense-summary-card">
      <div class="amount">$${total.toLocaleString()}</div>
      <div class="label">Total Expenses</div>
    </div>
    ${Object.entries(byCategory).map(([cat, amt]) => `
      <div class="expense-summary-card">
        <div class="amount">$${amt.toLocaleString()}</div>
        <div class="label">${cat}</div>
      </div>
    `).join('')}
  `;
  
  // Table
  const tbody = document.getElementById('expense-tbody');
  tbody.innerHTML = data.expenses
    .sort((a, b) => new Date(b.date + 'T12:00:00') - new Date(a.date + 'T12:00:00'))
    .map(e => `
      <tr>
        <td>${new Date(e.date + 'T12:00:00').toLocaleDateString()}</td>
        <td>${e.description}${e.trip ? ` <small style="opacity:0.6">(${e.trip})</small>` : ''}</td>
        <td><span class="expense-category">${e.category}</span></td>
        <td class="expense-amount">$${parseFloat(e.amount).toLocaleString()}</td>
        <td><button style="background:none;border:none;color:#e74c3c;cursor:pointer;" onclick="deleteExpense('${e.id}')">×</button></td>
      </tr>
    `).join('');
}

function showAddExpenseModal() {
  document.getElementById('expense-desc').value = '';
  document.getElementById('expense-amount').value = '';
  document.getElementById('expense-date').value = '';
  document.getElementById('expense-category').value = 'Travel';
  document.getElementById('expense-trip').value = '';
  document.getElementById('expense-modal').classList.add('active');
}

async function saveExpense() {
  const expense = {
    id: 'exp_' + Date.now(),
    description: document.getElementById('expense-desc').value,
    amount: parseFloat(document.getElementById('expense-amount').value),
    date: document.getElementById('expense-date').value,
    category: document.getElementById('expense-category').value,
    trip: document.getElementById('expense-trip').value
  };
  
  if (!expense.description || !expense.amount || !expense.date) {
    alert('Please fill in all required fields');
    return;
  }
  
  data.expenses.push(expense);
  await saveToServer('saveExpense', { expense });
  
  closeModal('expense-modal');
  render();
}

async function deleteExpense(id) {
  if (!confirm('Delete this expense?')) return;
  data.expenses = data.expenses.filter(e => e.id !== id);
  await saveToServer('deleteItem', { type: 'expense', id });
  render();
}

// ============================================
// ACTIVITY LOG
// ============================================
function renderActivity() {
  const list = document.getElementById('activity-list');
  const activities = [...data.activity].reverse().slice(0, 50);
  
  list.innerHTML = activities.map(a => `
    <div class="activity-item">
      <span class="activity-user">${a.user || 'Unknown'}</span>
      <span class="activity-action"> ${a.action}: ${a.details}</span>
      <div class="activity-time">${new Date(a.timestamp).toLocaleString()}</div>
    </div>
  `).join('') || '<p style="opacity:0.5;text-align:center;padding:40px;">No activity yet</p>';
}

// ============================================
// REPORT
// ============================================
function generateReport() {
  const now = new Date();
  const totalKRs = data.okrs.reduce((sum, o) => sum + (o.keyresults?.length || 0), 0);
  const completedKRs = data.okrs.reduce((sum, o) => 
    sum + (o.keyresults?.filter(kr => kr.complete || (kr.target > 0 && kr.current >= kr.target)).length || 0), 0);
  const totalExpenses = data.expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  
  let totalWeighted = 0, totalWeight = 0;
  data.okrs.forEach(o => {
    totalWeighted += calculateOKRProgress(o) * (o.weight || 0);
    totalWeight += o.weight || 0;
  });
  const overallProgress = totalWeight > 0 ? Math.round(totalWeighted / totalWeight) : 0;
  
  document.getElementById('report-content').innerHTML = `
    <div class="report-header">
      <h1>AFP CEO Performance Report</h1>
      <p>Generated ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
    <div class="report-body">
      <div class="report-summary">
        <div class="report-stat">
          <div class="value">${overallProgress}%</div>
          <div class="label">Overall Progress</div>
        </div>
        <div class="report-stat">
          <div class="value">${completedKRs}/${totalKRs}</div>
          <div class="label">Key Results</div>
        </div>
        <div class="report-stat">
          <div class="value">${data.events.length}</div>
          <div class="label">Events</div>
        </div>
        <div class="report-stat">
          <div class="value">$${totalExpenses.toLocaleString()}</div>
          <div class="label">Expenses</div>
        </div>
      </div>
      
      ${data.okrs.map(okr => {
        const progress = calculateOKRProgress(okr);
        return `
          <div class="report-okr">
            <div class="report-okr-header">
              <span class="report-okr-category" style="color:${okr.color}">${okr.category} (${okr.weight}%)</span>
              <span class="report-okr-progress" style="color:${okr.color}">${progress}%</span>
            </div>
            <p style="margin-bottom:12px;font-size:14px;color:#666;">${okr.objective}</p>
            ${(okr.keyresults || []).map(kr => `
              <div class="report-kr">
                <span>${kr.text}</span>
                <span style="color:${kr.complete || (kr.target > 0 && kr.current >= kr.target) ? '#27ae60' : '#666'}">${formatKRValue(kr)}</span>
              </div>
            `).join('')}
          </div>
        `;
      }).join('')}
    </div>
    <div class="report-actions">
      <button onclick="window.print()" style="background:#1a1a2e;color:#fff;">🖨️ Print / Save PDF</button>
      <button onclick="closeModal('report-modal')" style="background:#eee;color:#333;">Close</button>
    </div>
  `;
  
  document.getElementById('report-modal').classList.add('active');
}

// ============================================
// TAB NAVIGATION
// ============================================
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// ============================================
// VOICE INPUT
// ============================================
let recognition = null;
let currentVoiceTarget = null;
let currentVoiceBtn = null;

function startVoiceInput(btnOrTargetId, targetId) {
  // Handle both old and new call signatures
  let btn = null;
  let target = targetId;
  
  if (typeof btnOrTargetId === 'string') {
    target = btnOrTargetId;
  } else {
    btn = btnOrTargetId;
  }
  
  // Check if browser supports speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    alert('Voice input is not supported in this browser. Try Chrome or Safari.');
    return;
  }
  
  // If already recording, stop
  if (recognition && currentVoiceTarget === target) {
    recognition.stop();
    return;
  }
  
  currentVoiceTarget = target;
  currentVoiceBtn = btn;
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  const targetEl = document.getElementById(target);
  if (!targetEl) {
    console.error('Voice target not found:', target);
    return;
  }
  
  const originalValue = targetEl.value;
  const originalPlaceholder = targetEl.placeholder;
  
  // Find the mic button if not passed
  if (!btn) {
    if (target === 'ai-chat-input') {
      btn = document.getElementById('ai-voice-btn');
    }
  }
  
  recognition.onstart = () => {
    if (btn) {
      btn.style.background = 'rgba(231, 76, 60, 0.5)';
      btn.innerHTML = '🔴';
    }
    targetEl.placeholder = 'Listening...';
  };
  
  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript = transcript;
      }
    }
    
    if (finalTranscript) {
      targetEl.value = originalValue + (originalValue ? ' ' : '') + finalTranscript;
    } else if (interimTranscript) {
      targetEl.value = originalValue + (originalValue ? ' ' : '') + interimTranscript;
    }
  };
  
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    if (event.error === 'not-allowed') {
      alert('Microphone access denied. Please allow microphone access in your browser settings.');
    }
    stopVoiceInput(btn, targetEl, originalPlaceholder);
  };
  
  recognition.onend = () => {
    stopVoiceInput(btn, targetEl, originalPlaceholder);
  };
  
  recognition.start();
}

function stopVoiceInput(btn, targetEl, originalPlaceholder) {
  if (btn) {
    btn.style.background = 'rgba(79,172,254,0.2)';
    btn.innerHTML = '🎤';
  }
  if (targetEl && originalPlaceholder) {
    targetEl.placeholder = originalPlaceholder;
  }
  recognition = null;
  currentVoiceTarget = null;
  currentVoiceBtn = null;
}

// ============================================
// DRAG AND DROP
// ============================================
let dragCounter = 0;

function setupDragAndDrop() {
  const body = document.body;
  const overlay = document.getElementById('drop-zone-overlay');
  
  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    body.addEventListener(eventName, preventDefaults, false);
  });
  
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  // Show overlay when dragging files
  body.addEventListener('dragenter', (e) => {
    dragCounter++;
    if (e.dataTransfer.types.includes('Files')) {
      overlay.classList.add('active');
    }
  });
  
  body.addEventListener('dragleave', (e) => {
    dragCounter--;
    if (dragCounter === 0) {
      overlay.classList.remove('active');
    }
  });
  
  body.addEventListener('drop', (e) => {
    dragCounter = 0;
    overlay.classList.remove('active');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleDroppedFiles(files);
    }
  });
}

async function handleDroppedFiles(files) {
  // Check if KR modal is open
  const krModal = document.getElementById('kr-modal');
  if (krModal && krModal.classList.contains('active') && currentOKRId && currentKRIndex !== null) {
    await handleDroppedFilesForKR(files);
    return;
  }
  
  // Check if folder modal is open
  const folderModal = document.getElementById('folder-detail-modal');
  if (folderModal && folderModal.classList.contains('active') && currentFolderId) {
    await handleDroppedFilesForFolder(files);
    return;
  }
  
  // Check if AI panel is open
  const aiPanel = document.getElementById('ai-panel');
  if (aiPanel && aiPanel.classList.contains('active')) {
    await handleDroppedFilesForAI(files);
    return;
  }
  
  // No specific context - ask user what to do
  const choice = prompt(
    `You dropped ${files.length} file(s). Where would you like to add them?\n\n` +
    `1 - Create a new folder with these files\n` +
    `2 - Cancel\n\n` +
    `Enter 1 or 2:`
  );
  
  if (choice === '1') {
    createFolderWithFiles(files);
  }
}

async function handleDroppedFilesForKR(files) {
  const okr = data.okrs.find(o => o.id === currentOKRId);
  if (!okr || currentKRIndex === null) return;
  
  const kr = okr.keyresults[currentKRIndex];
  if (!kr.attachments) kr.attachments = [];
  
  for (let file of files) {
    await processFileForAttachment(file, kr, currentKRIndex);
  }
  
  saveLocal();
  render();
}

async function handleDroppedFilesForFolder(files) {
  const folder = data.folders.find(f => f.id === currentFolderId);
  if (!folder) return;
  if (!folder.items) folder.items = [];
  
  for (let file of files) {
    const item = await processFileForFolder(file);
    if (item) {
      folder.items.push(item);
    }
  }
  
  saveLocal();
  renderFolderDetail(currentFolderId);
  alert(`Added ${files.length} file(s) to "${folder.name}"`);
}

async function handleDroppedFilesForAI(files) {
  // Add files to AI context for discussion
  let fileContents = [];
  
  for (let file of files) {
    if (file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const text = await extractPDFText(arrayBuffer);
      if (text) {
        fileContents.push(`[PDF: ${file.name}]\n${text.substring(0, 10000)}`);
      }
    } else if (file.type.startsWith('text/') || file.name.endsWith('.txt')) {
      const text = await file.text();
      fileContents.push(`[File: ${file.name}]\n${text.substring(0, 10000)}`);
    } else if (file.type.startsWith('image/')) {
      fileContents.push(`[Image: ${file.name}] (Image uploaded - describe what you'd like to know about it)`);
    }
  }
  
  if (fileContents.length > 0) {
    const input = document.getElementById('ai-chat-input');
    input.value = `I've uploaded these files:\n\n${fileContents.join('\n\n')}\n\nPlease analyze them.`;
    input.focus();
    alert('Files added to AI chat. Press Enter to send.');
  }
}

async function processFileForAttachment(file, kr, krIndex) {
  if (file.size > 5 * 1024 * 1024) {
    alert(`File "${file.name}" is too large. Max 5MB per file.`);
    return;
  }
  
  if (file.type === 'application/pdf') {
    const arrayBuffer = await file.arrayBuffer();
    const extractedText = await extractPDFText(arrayBuffer);
    
    if (extractedText) {
      kr.attachments.push({
        name: file.name,
        type: 'application/pdf',
        size: file.size,
        extractedText: extractedText.substring(0, 50000),
        uploadedBy: currentUser,
        uploadedAt: new Date().toISOString()
      });
    }
  } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
    const text = await file.text();
    kr.attachments.push({
      name: file.name,
      type: 'text/plain',
      size: file.size,
      extractedText: text.substring(0, 50000),
      uploadedBy: currentUser,
      uploadedAt: new Date().toISOString()
    });
  } else {
    const reader = new FileReader();
    reader.onload = (e) => {
      kr.attachments.push({
        name: file.name,
        type: file.type,
        size: file.size,
        data: e.target.result,
        uploadedBy: currentUser,
        uploadedAt: new Date().toISOString()
      });
      const attEl = document.getElementById(`kr-att-${krIndex}`);
      if (attEl) attEl.innerHTML = renderKRAttachments(kr.attachments, krIndex);
    };
    reader.readAsDataURL(file);
  }
  
  const attEl = document.getElementById(`kr-att-${krIndex}`);
  if (attEl) attEl.innerHTML = renderKRAttachments(kr.attachments, krIndex);
}

async function processFileForFolder(file) {
  if (file.size > 5 * 1024 * 1024) {
    alert(`File "${file.name}" is too large. Max 5MB per file.`);
    return null;
  }
  
  let content = '';
  let fileData = null;
  
  if (file.type === 'application/pdf') {
    const arrayBuffer = await file.arrayBuffer();
    content = await extractPDFText(arrayBuffer) || '';
    content = content.substring(0, 50000);
  } else if (file.type.startsWith('text/') || file.name.endsWith('.txt')) {
    content = await file.text();
    content = content.substring(0, 50000);
  } else if (file.type.startsWith('image/')) {
    fileData = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }
  
  return {
    id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    name: file.name,
    type: file.type.startsWith('image/') ? 'image' : file.type === 'application/pdf' ? 'pdf' : 'text',
    content: content,
    data: fileData,
    addedAt: new Date().toISOString()
  };
}

async function createFolderWithFiles(files) {
  const folderName = prompt('Enter a name for the new folder:', `Files ${new Date().toLocaleDateString()}`);
  if (!folderName) return;
  
  const folder = {
    id: 'folder_' + Date.now(),
    name: folderName,
    description: `Created from ${files.length} dropped file(s)`,
    items: [],
    createdAt: new Date().toISOString()
  };
  
  for (let file of files) {
    const item = await processFileForFolder(file);
    if (item) folder.items.push(item);
  }
  
  data.folders.push(folder);
  saveLocal();
  renderFolders();
  alert(`Created folder "${folderName}" with ${folder.items.length} file(s)`);
}

// ============================================
// INITIALIZATION
// ============================================
async function init() {
  try {
    document.getElementById('current-user').textContent = currentUser;
    
    // Setup drag and drop
    setupDragAndDrop();
    
    // ALWAYS load local first and render immediately
    loadLocal();
    render();
    document.getElementById('loading').classList.add('hidden');
    
    if (!API_URL) {
      document.getElementById('setup-banner').style.display = 'block';
      updateSyncStatus('offline');
    } else {
      // Sync in BACKGROUND - don't block UI
      updateSyncStatus('syncing');
      setTimeout(() => backgroundSync(), 500);
    }
  } catch (e) {
    console.error('Init error:', e);
    document.getElementById('loading').innerHTML = '<p style="color:#e74c3c;">Error loading. <a href="#" onclick="localStorage.clear();location.reload();" style="color:#4facfe;">Click here to reset</a></p>';
  }
}

async function backgroundSync() {
  try {
    const response = await fetch(API_URL + '?action=getData', { 
      signal: AbortSignal.timeout(15000) 
    });
    const result = await response.json();
    
    if (result.error) throw new Error(result.error);
    
    // Smart merge - add missing items from server, don't overwrite local
    smartMergeFromServer(result);
    saveLocal();
    updateSyncStatus('online');
    console.log('Background sync complete');
  } catch (error) {
    console.log('Background sync skipped:', error.message);
    updateSyncStatus('offline');
  }
}

function smartMergeFromServer(serverData) {
  // Add any OKRs from server that don't exist locally
  const serverOKRs = serverData.okrs || [];
  const localOKRIds = new Set(data.okrs.map(o => o.id));
  
  serverOKRs.forEach(serverOKR => {
    if (!localOKRIds.has(serverOKR.id)) {
      data.okrs.push({
        ...serverOKR,
        keyresults: (serverOKR.keyresults || []).map(kr => ({
          ...kr,
          items: kr.items || [],
          notes: kr.notes || '',
          attachments: kr.attachments || []
        }))
      });
    }
  });
  
  // Add missing events, notes, folders from server
  ['events', 'notes', 'folders', 'expenses'].forEach(key => {
    const serverItems = serverData[key] || [];
    const localIds = new Set((data[key] || []).map(item => item.id));
    
    serverItems.forEach(item => {
      if (!localIds.has(item.id)) {
        data[key] = data[key] || [];
        data[key].push(item);
      }
    });
  });
}

// NOTES FUNCTIONS
function renderNotes() {
  const list = document.getElementById('notes-list');
  if (!list) return;
  const filter = document.getElementById('notes-filter')?.value || '';
  
  let notes = data.notes || [];
  if (filter) notes = notes.filter(n => n.tag === filter);
  notes.sort((a, b) => new Date(b.date + 'T12:00:00') - new Date(a.date + 'T12:00:00'));
  
  if (notes.length === 0) {
    list.innerHTML = '<p style="opacity:0.5;text-align:center;padding:40px;">No notes yet. Click "+ New Note" to create one.</p>';
    return;
  }
  
  const tagColors = { board: '#e74c3c', staff: '#3498db', external: '#9b59b6', chapter: '#27ae60', personal: '#f39c12' };
  
  list.innerHTML = notes.map(n => `
    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; margin-bottom: 12px; cursor: pointer;" onclick="editNote('${n.id}')">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
        <div>
          <h4 style="font-size: 15px; margin-bottom: 4px;">${n.title}</h4>
          <span style="font-size: 12px; opacity: 0.6;">${n.date}</span>
          <span style="margin-left: 8px; padding: 2px 8px; border-radius: 10px; font-size: 11px; background: ${tagColors[n.tag] || '#666'}30; color: ${tagColors[n.tag] || '#666'};">${n.tag}</span>
          ${n.links && n.links.length ? `<span style="margin-left: 8px; font-size: 11px; opacity: 0.6;">🔗 ${n.links.length}</span>` : ''}
        </div>
        <button onclick="event.stopPropagation(); deleteNote('${n.id}')" style="background: none; border: none; color: #e74c3c; cursor: pointer; font-size: 16px;">×</button>
      </div>
      <p style="font-size: 13px; opacity: 0.8; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${n.content}</p>
    </div>
  `).join('');
}

function showAddNoteModal() {
  currentNoteId = null;
  currentNoteLinks = [];
  document.getElementById('note-modal-title').textContent = 'New Note';
  document.getElementById('note-title').value = '';
  document.getElementById('note-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('note-tag').value = 'board';
  document.getElementById('note-content').value = '';
  document.getElementById('note-link').value = '';
  document.getElementById('note-links-list').innerHTML = '';
  document.getElementById('note-modal').classList.add('active');
}

function editNote(id) {
  const note = data.notes.find(n => n.id === id);
  if (!note) return;
  currentNoteId = id;
  currentNoteLinks = note.links || [];
  document.getElementById('note-modal-title').textContent = 'Edit Note';
  document.getElementById('note-title').value = note.title;
  document.getElementById('note-date').value = note.date;
  document.getElementById('note-tag').value = note.tag;
  document.getElementById('note-content').value = note.content;
  document.getElementById('note-link').value = '';
  renderNoteLinks();
  document.getElementById('note-modal').classList.add('active');
}

function addNoteLink() {
  const url = document.getElementById('note-link').value.trim();
  if (!url) return;
  currentNoteLinks.push({ url, name: url.includes('youtube') ? 'YouTube' : url.includes('drive.google') ? 'Google Drive' : 'Link' });
  document.getElementById('note-link').value = '';
  renderNoteLinks();
}

function renderNoteLinks() {
  const list = document.getElementById('note-links-list');
  list.innerHTML = currentNoteLinks.map((l, i) => `
    <div style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: rgba(255,255,255,0.05); border-radius: 6px; margin-bottom: 4px; font-size: 12px;">
      <span>🔗</span>
      <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${l.name}: ${l.url.substring(0, 40)}...</span>
      <button onclick="currentNoteLinks.splice(${i}, 1); renderNoteLinks();" style="background: none; border: none; color: #e74c3c; cursor: pointer;">×</button>
    </div>
  `).join('');
}

async function saveNote() {
  const title = document.getElementById('note-title').value.trim();
  const date = document.getElementById('note-date').value;
  const tag = document.getElementById('note-tag').value;
  const content = document.getElementById('note-content').value.trim();
  
  if (!title || !content) { alert('Please enter title and content'); return; }
  
  const note = { id: currentNoteId || 'note_' + Date.now(), title, date, tag, content, links: currentNoteLinks };
  
  if (currentNoteId) {
    const idx = data.notes.findIndex(n => n.id === currentNoteId);
    if (idx >= 0) data.notes[idx] = note;
  } else {
    data.notes.push(note);
  }
  
  saveLocal();
  await saveToServer('saveNote', { note });
  closeModal('note-modal');
  renderNotes();
}

async function deleteNote(id) {
  if (!confirm('Delete this note?')) return;
  data.notes = data.notes.filter(n => n.id !== id);
  saveLocal();
  await saveToServer('deleteItem', { type: 'note', id });
  renderNotes();
}

// FOLDER FUNCTIONS
function renderFolders() {
  const list = document.getElementById('folders-list');
  if (!list) return;
  
  if (!data.folders || data.folders.length === 0) {
    list.innerHTML = '<p style="opacity:0.5;text-align:center;padding:40px;grid-column:1/-1;">No folders yet. Click "+ New Folder" to create one.</p>';
    return;
  }
  
  list.innerHTML = data.folders.map(f => `
    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; cursor: pointer; border-left: 4px solid #4facfe;" onclick="openFolder('${f.id}')">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
        <h4 style="font-size: 16px;">📁 ${f.name}</h4>
        <button onclick="event.stopPropagation(); deleteFolder('${f.id}')" style="background: none; border: none; color: #e74c3c; cursor: pointer; font-size: 16px;">×</button>
      </div>
      ${f.description ? `<p style="font-size: 13px; opacity: 0.7; margin-bottom: 8px;">${f.description}</p>` : ''}
      <div style="font-size: 12px; opacity: 0.5;">${(f.items || []).length} items</div>
    </div>
  `).join('');
}

function showAddFolderModal() {
  document.getElementById('folder-name').value = '';
  document.getElementById('folder-desc').value = '';
  document.getElementById('folder-modal').classList.add('active');
}

async function saveFolder() {
  const name = document.getElementById('folder-name').value.trim();
  const description = document.getElementById('folder-desc').value.trim();
  if (!name) { alert('Please enter a folder name'); return; }
  
  const folder = { id: 'folder_' + Date.now(), name, description, items: [] };
  data.folders.push(folder);
  saveLocal();
  await saveToServer('saveFolder', { folder });
  closeModal('folder-modal');
  renderFolders();
}

async function deleteFolder(id) {
  if (!confirm('Delete this folder and all its contents?')) return;
  data.folders = data.folders.filter(f => f.id !== id);
  saveLocal();
  await saveToServer('deleteItem', { type: 'folder', id });
  renderFolders();
}

function openFolder(id) {
  const folder = data.folders.find(f => f.id === id);
  if (!folder) return;
  currentFolderId = id;
  document.getElementById('folder-view-title').textContent = '📁 ' + folder.name;
  renderFolderItems();
  document.getElementById('folder-view-modal').classList.add('active');
}

function renderFolderItems() {
  const folder = data.folders.find(f => f.id === currentFolderId);
  if (!folder) return;
  const list = document.getElementById('folder-items-list');
  
  if (!folder.items || folder.items.length === 0) {
    list.innerHTML = '<p style="opacity:0.5;text-align:center;padding:20px;">No items yet. Add links, transcripts, PDFs, or notes above.</p>';
    return;
  }
  
  const icons = { link: '🔗', transcript: '🎙️', note: '📝', pdf: '📄', text: '📄' };
  
  list.innerHTML = folder.items.map((item, i) => `
    <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 12px; margin-bottom: 8px;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
        <div style="font-size: 14px; font-weight: 500;">${icons[item.type] || '📄'} ${item.name} ${item.type === 'pdf' ? '<span style="color:#27ae60;font-size:11px;">✓ AI readable</span>' : ''}</div>
        <div style="display: flex; gap: 8px;">
          <button onclick="viewFolderItemFull(${i})" style="background: rgba(79,172,254,0.2); border: none; color: #4facfe; cursor: pointer; padding: 4px 10px; border-radius: 4px; font-size: 11px;">View Full</button>
          <button onclick="deleteFolderItem(${i})" style="background: none; border: none; color: #e74c3c; cursor: pointer; font-size: 16px;">×</button>
        </div>
      </div>
      ${item.url ? `<a href="${item.url}" target="_blank" style="font-size: 12px; color: #4facfe; display: block; margin-bottom: 8px;">🔗 ${item.url.substring(0, 50)}...</a>` : ''}
      <div style="font-size: 13px; opacity: 0.8; white-space: pre-wrap; max-height: 150px; overflow-y: auto; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 6px;">${item.content ? item.content.substring(0, 500) + (item.content.length > 500 ? '...' : '') : '<em>No content</em>'}</div>
    </div>
  `).join('');
}

function viewFolderItemFull(index) {
  const folder = data.folders.find(f => f.id === currentFolderId);
  if (!folder || !folder.items || !folder.items[index]) return;
  
  const item = folder.items[index];
  const win = window.open('', '_blank', 'width=800,height=600');
  win.document.write(`
    <html>
    <head>
      <title>${item.name}</title>
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; padding: 30px; line-height: 1.6; max-width: 800px; margin: 0 auto; background: #1a1a2e; color: #e8e8e8; }
        h1 { font-size: 24px; margin-bottom: 10px; color: #4facfe; }
        .meta { font-size: 14px; color: #888; margin-bottom: 20px; }
        .content { white-space: pre-wrap; font-size: 14px; background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; }
        a { color: #4facfe; }
      </style>
    </head>
    <body>
      <h1>${item.name}</h1>
      <div class="meta">Type: ${item.type.toUpperCase()} | Added: ${new Date(item.addedAt).toLocaleString()}</div>
      ${item.url ? `<p><a href="${item.url}" target="_blank">🔗 ${item.url}</a></p>` : ''}
      <div class="content">${item.content || 'No content'}</div>
    </body>
    </html>
  `);
}

function triggerFolderFileUpload() {
  document.getElementById('folder-file-input').click();
}

async function handleFolderFileUpload(event) {
  const folder = data.folders.find(f => f.id === currentFolderId);
  if (!folder) return;
  
  const statusEl = document.getElementById('folder-upload-status');
  const pdfBtn = document.getElementById('folder-pdf-btn');
  const files = event.target.files;
  
  for (let file of files) {
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert(`File "${file.name}" is too large. Max 10MB.`);
      continue;
    }
    
    // Handle PDFs
    if (file.type === 'application/pdf') {
      statusEl.style.display = 'block';
      statusEl.innerHTML = '⏳ Extracting text from PDF... Please wait.';
      pdfBtn.disabled = true;
      pdfBtn.innerHTML = '⏳ Processing...';
      
      try {
        const arrayBuffer = await file.arrayBuffer();
        const extractedText = await extractPDFText(arrayBuffer);
        
        if (extractedText) {
          folder.items = folder.items || [];
          folder.items.push({
            type: 'pdf',
            name: file.name,
            content: extractedText.substring(0, 100000), // Limit to ~100k chars
            addedAt: new Date().toISOString()
          });
          
          saveLocal();
          await saveToServer('saveFolder', { folder });
          renderFolderItems();
          renderFolders(); // Update folder count
          
          statusEl.style.background = 'rgba(39,174,96,0.2)';
          statusEl.style.borderColor = '#27ae60';
          statusEl.innerHTML = `✅ "${file.name}" saved! AI can now read this document.`;
          setTimeout(() => { 
            statusEl.style.display = 'none'; 
            statusEl.style.background = 'rgba(79,172,254,0.2)';
            statusEl.style.borderColor = '#4facfe';
          }, 4000);
        } else {
          statusEl.style.background = 'rgba(231,76,60,0.2)';
          statusEl.style.borderColor = '#e74c3c';
          statusEl.innerHTML = '❌ Could not extract text from PDF. Try a different file.';
          setTimeout(() => { 
            statusEl.style.display = 'none';
            statusEl.style.background = 'rgba(79,172,254,0.2)';
            statusEl.style.borderColor = '#4facfe';
          }, 4000);
        }
      } catch (e) {
        statusEl.style.background = 'rgba(231,76,60,0.2)';
        statusEl.style.borderColor = '#e74c3c';
        statusEl.innerHTML = '❌ Error: ' + e.message;
        setTimeout(() => { 
          statusEl.style.display = 'none';
          statusEl.style.background = 'rgba(79,172,254,0.2)';
          statusEl.style.borderColor = '#4facfe';
        }, 4000);
      }
      
      pdfBtn.disabled = false;
      pdfBtn.innerHTML = '📄 Add PDF';
      continue;
    }
    
    // Handle text files
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const text = await file.text();
      folder.items = folder.items || [];
      folder.items.push({
        type: 'text',
        name: file.name,
        content: text.substring(0, 100000),
        addedAt: new Date().toISOString()
      });
      
      saveLocal();
      await saveToServer('saveFolder', { folder });
      renderFolderItems();
      renderFolders(); // Update folder count
      
      statusEl.style.display = 'block';
      statusEl.innerHTML = `✅ "${file.name}" added!`;
      setTimeout(() => { statusEl.style.display = 'none'; }, 3000);
      continue;
    }
    
    alert(`File type not supported: ${file.name}. Please use PDF or TXT files.`);
  }
  
  event.target.value = '';
}

function addFolderItem(type) {
  currentFolderItemType = type;
  const titles = { link: 'Add Link', transcript: 'Add Transcript', note: 'Add Note' };
  document.getElementById('folder-item-title').textContent = titles[type] || 'Add Item';
  document.getElementById('folder-item-name').value = '';
  document.getElementById('folder-item-url').value = '';
  document.getElementById('folder-item-content').value = '';
  document.getElementById('folder-item-url').style.display = type === 'link' ? 'block' : 'none';
  document.getElementById('folder-item-modal').classList.add('active');
}

async function saveFolderItem() {
  const name = document.getElementById('folder-item-name').value.trim();
  const url = document.getElementById('folder-item-url').value.trim();
  const content = document.getElementById('folder-item-content').value.trim();
  
  if (!name) { alert('Please enter a title'); return; }
  
  const folder = data.folders.find(f => f.id === currentFolderId);
  if (!folder) return;
  
  folder.items = folder.items || [];
  folder.items.push({
    type: currentFolderItemType,
    name,
    url: url || null,
    content,
    addedAt: new Date().toISOString()
  });
  
  saveLocal();
  await saveToServer('saveFolder', { folder });
  closeModal('folder-item-modal');
  renderFolderItems();
  renderFolders(); // Update folder count
}

async function deleteFolderItem(index) {
  if (!confirm('Delete this item?')) return;
  const folder = data.folders.find(f => f.id === currentFolderId);
  if (folder && folder.items) {
    folder.items.splice(index, 1);
    saveLocal();
    await saveToServer('saveFolder', { folder });
    renderFolderItems();
    renderFolders(); // Update folder count
  }
}

function askAIAboutFolder() {
  const folder = data.folders.find(f => f.id === currentFolderId);
  if (!folder) return;
  
  closeModal('folder-view-modal');
  document.querySelector('[data-tab="ai-assistant"]').click();
  
  const itemList = (folder.items || []).map(i => {
    let info = `\n--- ${i.name} (${i.type}) ---`;
    if (i.url) info += `\nLink: ${i.url}`;
    if (i.content) info += `\n${i.content}`;
    return info;
  }).join('\n');
  
  const prompt = `Please analyze my "${folder.name}" folder:\n${itemList || '\n(No items yet)'}\n\nProvide: key themes, action items, and recommendations.`;
  
  document.getElementById('ai-chat-input').value = prompt;
  setTimeout(() => sendAIMessage(), 100);
}

// AI ASSISTANT FUNCTIONS
function showAISettings() {
  document.getElementById('anthropic-api-key').value = ANTHROPIC_API_KEY;
  document.getElementById('ai-settings-modal').classList.add('active');
}

// Debug function - run debugKRNotes() in console to see all KR notes
window.debugKRNotes = function() {
  console.log('=== All KR Notes ===');
  data.okrs.forEach((okr, oi) => {
    console.log(`\nOKR ${oi + 1}: ${okr.category}`);
    (okr.keyresults || []).forEach((kr, ki) => {
      if (kr.notes) {
        console.log(`  KR ${ki + 1}: ${kr.text}`);
        console.log(`  Notes length: ${kr.notes.length} chars`);
        console.log(`  Notes preview: ${kr.notes.substring(0, 200)}...`);
      }
    });
  });
};

// Debug function - run debugAIContext() in console to see full AI context
window.debugAIContext = function() {
  const ctx = buildSystemPrompt();
  console.log('=== Full AI Context ===');
  console.log('Total length:', ctx.length, 'characters');
  console.log(ctx);
  return ctx;
};

function saveAISettings() {
  ANTHROPIC_API_KEY = document.getElementById('anthropic-api-key').value.trim();
  localStorage.setItem('anthropic_api_key', ANTHROPIC_API_KEY);
  closeModal('ai-settings-modal');
}

function askAI(question) {
  document.getElementById('ai-chat-input').value = question;
  sendAIMessage();
}

function buildSystemPrompt() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  let totalWeighted = 0, totalWeight = 0;
  data.okrs.forEach(okr => {
    const progress = calculateOKRProgress(okr);
    totalWeighted += progress * (okr.weight || 0);
    totalWeight += okr.weight || 0;
  });
  const overallProgress = totalWeight > 0 ? Math.round(totalWeighted / totalWeight) : 0;
  
  let okrDetails = data.okrs.map(okr => {
    const progress = calculateOKRProgress(okr);
    const krs = (okr.keyresults || []).map(kr => {
      const krProgress = kr.target > 0 ? Math.round((kr.current / kr.target) * 100) : 0;
      let krLine = `  - ${kr.text}: ${kr.current}/${kr.target} ${kr.unit} (${krProgress}%)${kr.complete ? ' ✓' : ''}`;
      // Include description if any
      if (kr.description) {
        krLine += `\n    Description: ${kr.description}`;
      }
      // Include items (sub-items like partnerships, meetings, etc.)
      if (kr.items && kr.items.length > 0) {
        krLine += `\n    Items (${kr.items.length}):`;
        kr.items.forEach(item => {
          krLine += `\n      • ${item.name} [${item.status || 'In Progress'}]`;
          if (item.notes) {
            krLine += `: ${item.notes.substring(0, 8000)}${item.notes.length > 8000 ? '...' : ''}`;
          }
        });
      }
      // Include attachment names and extracted text
      if (kr.attachments && kr.attachments.length > 0) {
        krLine += `\n    Attachments: ${kr.attachments.map(a => a.name).join(', ')}`;
        // Include extracted text from PDFs/text files
        kr.attachments.forEach(att => {
          if (att.extractedText) {
            krLine += `\n    [Content from ${att.name}]: ${att.extractedText.substring(0, 8000)}${att.extractedText.length > 8000 ? '...' : ''}`;
          }
        });
      }
      // Include notes if any
      if (kr.notes) {
        // Log long notes for debugging
        if (kr.notes.length > 500) {
          console.log(`KR "${kr.text}" has ${kr.notes.length} chars of notes`);
        }
        krLine += `\n    Notes: ${kr.notes}`;
      }
      return krLine;
    }).join('\n');
    let section = `\n## ${okr.category} (${okr.weight}%) - ${progress}%\n${okr.objective}\n${krs}`;
    if (okr.notes) section += `\nObjective Notes: ${okr.notes}`;
    return section;
  }).join('\n');

  // Include notes from Notes tab
  let notesContext = '';
  if (data.notes && data.notes.length > 0) {
    notesContext = '\n\n## Notes (' + data.notes.length + ' total)\n' + data.notes.map(n => 
      `- ${n.title} (${n.date}) [${n.tag}]: ${n.content.substring(0, 300)}${n.content.length > 300 ? '...' : ''}`
    ).join('\n');
  }

  // Include ALL folders and their contents
  let foldersContext = '';
  if (data.folders && data.folders.length > 0) {
    foldersContext = '\n\n## Folders & Documents (' + data.folders.length + ' folders)\n';
    data.folders.forEach(folder => {
      foldersContext += `\n### 📁 ${folder.name}`;
      if (folder.description) foldersContext += ` (${folder.description})`;
      foldersContext += '\n';
      if (folder.items && folder.items.length > 0) {
        folder.items.forEach(item => {
          foldersContext += `  - ${item.type === 'pdf' ? '📄' : '📝'} ${item.name}\n`;
          if (item.content) {
            foldersContext += `    Content: ${item.content.substring(0, 8000)}${item.content.length > 8000 ? '...' : ''}\n`;
          }
        });
      }
    });
  }

  // Include calendar events (ALL events)
  let calendarContext = '';
  if (data.events && data.events.length > 0) {
    const sortedEvents = [...data.events].sort((a, b) => new Date(a.date + 'T12:00:00') - new Date(b.date + 'T12:00:00'));
    calendarContext = '\n\n## Calendar Events (' + sortedEvents.length + ' total)\n';
    sortedEvents.forEach(e => {
      const eventDate = new Date(e.date + 'T12:00:00');
      const dateStr = eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      let eventLine = `- ${dateStr}: ${e.title}`;
      if (e.time) eventLine += ` (${e.time})`;
      if (e.location) eventLine += ` @ ${e.location.substring(0, 50)}`;
      if (e.invitees && e.invitees.length > 0) {
        eventLine += ` [${e.invitees.length} attendees: ${e.invitees.slice(0, 5).join(', ')}${e.invitees.length > 5 ? '...' : ''}]`;
      }
      if (e.organizer) eventLine += ` (Organizer: ${e.organizer.split('<')[0].trim()})`;
      if (e.conflicts) eventLine += ` ⚠️ ${e.conflicts}`;
      calendarContext += eventLine + '\n';
    });
  }

  // Include expenses summary
  let expensesContext = '';
  if (data.expenses && data.expenses.length > 0) {
    const total = data.expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    expensesContext = '\n\n## Expenses (Total: $' + total.toLocaleString() + ')\n';
    data.expenses.slice(0, 15).forEach(e => {
      expensesContext += `- ${e.date}: ${e.description} - $${e.amount} (${e.category})\n`;
    });
  }

  return `You are an AI Performance Coach for Art Taylor, CEO of AFP Global. Today is ${today}.
You have FULL ACCESS to: OKRs, folders, documents, calendar events, notes, and expenses.

Overall Progress: ${overallProgress}%
${okrDetails}${foldersContext}${calendarContext}${notesContext}${expensesContext}

Be concise. Use specific numbers. Identify risks. Give practical recommendations.
When asked about schedule/calendar/meetings, search the Calendar Events.
When asked about documents/folders/files, search the Folders & Documents.
When asked about specific people, search all sections for their name.`;
}

async function cleanupNotes(textareaId) {
  const textarea = document.getElementById(textareaId);
  if (!textarea) return;
  
  const text = textarea.value.trim();
  if (!text) {
    alert('No text to clean up. Enter or dictate some notes first.');
    return;
  }
  
  if (!ANTHROPIC_API_KEY) {
    alert('Please set your Anthropic API key in AI Settings first.');
    showAISettings();
    return;
  }
  
  // Show loading state
  const originalText = textarea.value;
  textarea.value = '✨ Cleaning up your notes...';
  textarea.disabled = true;
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `Clean up and format these rough notes or voice dictation. Make them clear, readable, and well-organized. Fix any grammar, punctuation, and formatting issues. Keep all the original information but present it professionally. If there are action items, list them clearly. Do NOT add any preamble or explanation - just return the cleaned up notes directly.

Raw notes:
${text}`
        }]
      })
    });
    
    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error.message);
    }
    
    const cleanedText = result.content[0].text;
    textarea.value = cleanedText;
    textarea.disabled = false;
    
  } catch (error) {
    console.error('Cleanup error:', error);
    textarea.value = originalText;
    textarea.disabled = false;
    alert('Error cleaning up notes: ' + error.message);
  }
}

// Item folder AI functions
function showItemAIPrompt() {
  document.getElementById('item-ai-prompt-section').style.display = 'block';
  document.getElementById('item-ai-instruction').focus();
}

function hideItemAIPrompt() {
  document.getElementById('item-ai-prompt-section').style.display = 'none';
}

function setItemAIInstruction(instruction) {
  document.getElementById('item-ai-instruction').value = instruction;
}

async function runItemAI() {
  const instruction = document.getElementById('item-ai-instruction').value.trim();
  if (!instruction) {
    alert('Please enter an instruction for the AI.');
    return;
  }
  
  if (!ANTHROPIC_API_KEY) {
    alert('Please set your Anthropic API key in AI Settings first.');
    showAISettings();
    return;
  }
  
  const statusEl = document.getElementById('item-ai-status');
  const notesTextarea = document.getElementById('kr-item-notes');
  const itemName = document.getElementById('kr-item-name').value || 'this item';
  
  // Gather context: current notes + PDF content
  let context = '';
  const currentNotes = notesTextarea.value.trim();
  
  if (currentNotes) {
    context += `\n\nCurrent Notes:\n${currentNotes}`;
  }
  
  // Include PDF extracted text from pendingItemFiles
  let pdfCount = 0;
  if (pendingItemFiles && pendingItemFiles.length > 0) {
    for (const file of pendingItemFiles) {
      if (file.extractedText) {
        pdfCount++;
        context += `\n\n--- Document: ${file.name} ---\n${file.extractedText.substring(0, 8000)}${file.extractedText.length > 8000 ? '\n[...truncated]' : ''}`;
      }
    }
  }
  
  if (!context.trim()) {
    alert('No content to work with. Add some notes or upload a PDF first.');
    return;
  }
  
  // Show status
  statusEl.style.display = 'block';
  statusEl.style.background = 'rgba(155,89,182,0.2)';
  statusEl.style.color = '#9b59b6';
  statusEl.innerHTML = `🤖 AI is working... (reading ${pdfCount} document${pdfCount !== 1 ? 's' : ''})`;
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [{
          role: 'user',
          content: `You are helping organize information for "${itemName}".

User instruction: ${instruction}

Available content:${context}

Respond directly with the requested output. Do not add preamble like "Here is..." - just provide the content. Format it cleanly and professionally.`
        }]
      })
    });
    
    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error.message);
    }
    
    const aiOutput = result.content[0].text;
    
    // Append or replace notes
    if (currentNotes) {
      notesTextarea.value = currentNotes + '\n\n--- AI Generated ---\n' + aiOutput;
    } else {
      notesTextarea.value = aiOutput;
    }
    
    statusEl.style.background = 'rgba(39,174,96,0.2)';
    statusEl.style.color = '#27ae60';
    statusEl.innerHTML = '✅ Done! Notes updated.';
    
    hideItemAIPrompt();
    
    setTimeout(() => {
      statusEl.style.display = 'none';
    }, 3000);
    
  } catch (error) {
    console.error('AI error:', error);
    statusEl.style.background = 'rgba(231,76,60,0.2)';
    statusEl.style.color = '#e74c3c';
    statusEl.innerHTML = '❌ Error: ' + error.message;
  }
}

async function sendAIMessage() {
  const input = document.getElementById('ai-chat-input');
  const message = input.value.trim();
  if (!message) return;
  
  if (!ANTHROPIC_API_KEY) {
    showAISettings();
    return;
  }
  
  addChatMessage('user', message);
  input.value = '';
  document.getElementById('ai-send-btn').disabled = true;
  
  const typing = document.createElement('div');
  typing.id = 'ai-typing';
  typing.innerHTML = '<div style="display:flex;gap:12px;"><div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;">🤖</div><div style="background:rgba(255,255,255,0.1);padding:12px 16px;border-radius:12px;">Thinking...</div></div>';
  document.getElementById('ai-chat-messages').appendChild(typing);
  
  try {
    // Build message content with any relevant images
    let messageContent = [];
    
    // Check if user is asking about attachments/files/documents
    const isAskingAboutFiles = /attach|file|document|image|photo|pdf|screenshot|picture/i.test(message);
    
    // Check if user is asking about calendar/schedule
    const isAskingAboutCalendar = /calendar|schedule|meeting|event|when|tomorrow|today|this week|next week|monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|march|april|may|june|july|august|september|october|november|december|what.*(do|have).*on|what.*upcoming|who.*meeting/i.test(message);
    
    // If asking about calendar, add detailed schedule context
    let calendarSearchContext = '';
    if (isAskingAboutCalendar && data.events && data.events.length > 0) {
      // Search for specific person or date mentioned
      const personMatch = message.match(/with\s+(\w+(?:\s+\w+)?)/i);
      const searchTerm = personMatch ? personMatch[1].toLowerCase() : null;
      
      let relevantEvents = data.events;
      
      // Filter by person if mentioned
      if (searchTerm) {
        relevantEvents = data.events.filter(e => {
          const searchIn = [
            e.title,
            e.organizer,
            ...(e.invitees || [])
          ].join(' ').toLowerCase();
          return searchIn.includes(searchTerm);
        });
      }
      
      // Sort by date
      relevantEvents = relevantEvents.sort((a, b) => new Date(a.date + 'T12:00:00') - new Date(b.date + 'T12:00:00'));
      
      if (relevantEvents.length > 0) {
        calendarSearchContext = `\n\n## Matching Calendar Events (${relevantEvents.length} found):\n`;
        relevantEvents.slice(0, 20).forEach(e => {
          const eventDate = new Date(e.date + 'T12:00:00');
          const dateStr = eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
          calendarSearchContext += `\n### ${e.title}\n`;
          calendarSearchContext += `- Date: ${dateStr}\n`;
          if (e.time) calendarSearchContext += `- Time: ${e.time}\n`;
          if (e.location) calendarSearchContext += `- Location: ${e.location}\n`;
          if (e.organizer) calendarSearchContext += `- Organizer: ${e.organizer}\n`;
          if (e.invitees && e.invitees.length > 0) {
            calendarSearchContext += `- Attendees: ${e.invitees.join(', ')}\n`;
          }
          if (e.notes) calendarSearchContext += `- Notes: ${e.notes}\n`;
          if (e.conflicts) calendarSearchContext += `- ⚠️ Conflicts: ${e.conflicts}\n`;
        });
      }
    }
    
    // Collect images from KR attachments if relevant
    if (isAskingAboutFiles) {
      for (const okr of data.okrs) {
        for (const kr of (okr.keyresults || [])) {
          for (const att of (kr.attachments || [])) {
            if (att.type && att.type.startsWith('image/') && att.data) {
              // Add image to message
              const base64Data = att.data.split(',')[1]; // Remove data:image/xxx;base64, prefix
              messageContent.push({
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: att.type,
                  data: base64Data
                }
              });
              messageContent.push({
                type: 'text',
                text: `[Above image is "${att.name}" attached to KR: ${kr.text}]`
              });
            }
          }
        }
      }
    }
    
    // Add the user's text message with calendar context if relevant
    const textMessage = calendarSearchContext ? message + calendarSearchContext : message;
    messageContent.push({ type: 'text', text: textMessage });
    
    // If no images, just use simple string format
    const userMessage = messageContent.length === 1 ? textMessage : messageContent;
    
    chatHistory.push({ role: 'user', content: userMessage });
    
    // Check if user is asking for web search
    const needsWebSearch = /search|look up|find|what is|who is|latest|recent|news|current|today|website|online|google/i.test(message);
    
    if (needsWebSearch) {
      document.getElementById('ai-typing').querySelector('div:last-child').textContent = '🔍 Searching the web...';
    }
    
    const systemPrompt = buildSystemPrompt();
    console.log('📊 AI Context Length:', systemPrompt.length, 'characters');
    console.log('📋 AI Context Preview (first 500 chars):', systemPrompt.substring(0, 500));
    console.log('📋 AI Context Preview (last 500 chars):', systemPrompt.substring(systemPrompt.length - 500));
    
    // Log if KR notes containing "transcript" are found
    if (systemPrompt.toLowerCase().includes('transcript')) {
      console.log('✅ Found "transcript" in AI context');
    } else {
      console.log('❌ "transcript" NOT found in AI context');
    }
    
    const requestBody = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: systemPrompt,
      messages: chatHistory
    };
    
    // Add web search tool if the question might need external info
    if (needsWebSearch) {
      requestBody.tools = [{
        type: 'web_search_20250305',
        name: 'web_search'
      }];
    }
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) throw new Error((await response.json()).error?.message || 'API error');
    
    const result = await response.json();
    
    // Handle response - may have multiple content blocks with web search
    let reply = '';
    for (const block of result.content) {
      if (block.type === 'text') {
        reply += block.text;
      }
    }
    
    if (!reply) reply = 'I searched but couldn\'t find a clear answer. Try rephrasing your question.';
    
    chatHistory.push({ role: 'assistant', content: reply });
    if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
    
    document.getElementById('ai-typing')?.remove();
    addChatMessage('assistant', reply);
  } catch (e) {
    document.getElementById('ai-typing')?.remove();
    addChatMessage('assistant', 'Error: ' + e.message);
  }
  
  document.getElementById('ai-send-btn').disabled = false;
}

let lastAIResponse = '';

function addChatMessage(role, content) {
  const container = document.getElementById('ai-chat-messages');
  const div = document.createElement('div');
  div.style.cssText = 'display:flex;gap:12px;margin-bottom:16px;' + (role === 'user' ? 'flex-direction:row-reverse;' : '');
  
  const avatar = role === 'assistant' ? '🤖' : '👤';
  const bg = role === 'assistant' ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'linear-gradient(135deg,#4facfe,#00f2fe)';
  const msgBg = role === 'assistant' ? 'rgba(255,255,255,0.1)' : 'rgba(79,172,254,0.2)';
  
  // Store last AI response
  if (role === 'assistant') {
    lastAIResponse = content;
  }
  
  // Add save and export buttons for AI responses
  const exportBtns = role === 'assistant' ? `
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
      <button onclick="showSaveToFolderModal()" style="padding:4px 10px;background:rgba(155,89,182,0.2);border:none;border-radius:12px;color:#9b59b6;cursor:pointer;font-size:11px;">📁 Save</button>
      <button onclick="exportAIResponseToPDF()" style="padding:4px 10px;background:rgba(231,76,60,0.2);border:none;border-radius:12px;color:#e74c3c;cursor:pointer;font-size:11px;">📄 PDF</button>
      <button onclick="exportAIResponseToCSV()" style="padding:4px 10px;background:rgba(46,204,113,0.2);border:none;border-radius:12px;color:#2ecc71;cursor:pointer;font-size:11px;">📊 CSV</button>
      <button onclick="copyAIResponse()" style="padding:4px 10px;background:rgba(52,152,219,0.2);border:none;border-radius:12px;color:#3498db;cursor:pointer;font-size:11px;">📋 Copy</button>
    </div>` : '';
  
  div.innerHTML = `<div style="width:36px;height:36px;border-radius:50%;background:${bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">${avatar}</div><div style="max-width:80%;"><div style="padding:12px 16px;border-radius:12px;background:${msgBg};font-size:14px;line-height:1.5;white-space:pre-wrap;">${content}</div>${exportBtns}</div>`;
  
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// Copy AI response to clipboard
function copyAIResponse() {
  if (!lastAIResponse) {
    alert('No AI response to copy.');
    return;
  }
  navigator.clipboard.writeText(lastAIResponse).then(() => {
    alert('Copied to clipboard!');
  }).catch(err => {
    console.error('Copy failed:', err);
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = lastAIResponse;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    alert('Copied to clipboard!');
  });
}

// Export AI response to PDF
function exportAIResponseToPDF() {
  if (!lastAIResponse) {
    alert('No AI response to export.');
    return;
  }
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>AFP Tracker Report - ${dateStr}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
        h1 { color: #333; border-bottom: 2px solid #4facfe; padding-bottom: 10px; }
        .meta { color: #666; font-size: 12px; margin-bottom: 20px; }
        .content { white-space: pre-wrap; background: #f5f5f5; padding: 20px; border-radius: 8px; }
        @media print { body { margin: 20px; } }
      </style>
    </head>
    <body>
      <h1>📊 AFP Performance Report</h1>
      <div class="meta">Generated: ${dateStr} at ${timeStr}</div>
      <div class="content">${lastAIResponse.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </body>
    </html>
  `;
  
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  win.onload = () => {
    win.print();
  };
}

// Export AI response to CSV (attempts to parse tables/data)
function exportAIResponseToCSV() {
  if (!lastAIResponse) {
    alert('No AI response to export.');
    return;
  }
  
  let csvContent = '';
  
  // Try to extract tabular data from the response
  const lines = lastAIResponse.split('\n');
  
  // Check for bullet points or list items
  const listItems = lines.filter(l => l.match(/^[\-\•\*]\s|^\d+\./));
  
  if (listItems.length > 0) {
    csvContent = 'Item,Details\n';
    listItems.forEach((item, i) => {
      const cleaned = item.replace(/^[\-\•\*]\s*|\d+\.\s*/, '').trim();
      csvContent += `"${i + 1}","${cleaned.replace(/"/g, '""')}"\n`;
    });
  } else {
    // Just export as plain text with line numbers
    csvContent = 'Line,Content\n';
    lines.forEach((line, i) => {
      if (line.trim()) {
        csvContent += `"${i + 1}","${line.trim().replace(/"/g, '""')}"\n`;
      }
    });
  }
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AFP_Report_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Export expenses to CSV
function exportExpensesToCSV() {
  if (!data.expenses || data.expenses.length === 0) {
    alert('No expenses to export.');
    return;
  }
  
  let csv = 'Date,Description,Amount,Category,Trip\n';
  data.expenses.forEach(e => {
    csv += `"${e.date}","${(e.description || '').replace(/"/g, '""')}","${e.amount}","${e.category || ''}","${(e.trip || '').replace(/"/g, '""')}"\n`;
  });
  
  const total = data.expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  csv += `\n"","TOTAL","${total.toFixed(2)}","",""\n`;
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AFP_Expenses_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Export financial report to PDF
function exportFinancialReportPDF() {
  const total = (data.expenses || []).reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const byCategory = {};
  (data.expenses || []).forEach(e => {
    byCategory[e.category || 'Other'] = (byCategory[e.category || 'Other'] || 0) + (parseFloat(e.amount) || 0);
  });
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  let categoryRows = '';
  Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, amt]) => {
    categoryRows += `<tr><td>${cat}</td><td style="text-align:right;">$${amt.toFixed(2)}</td></tr>`;
  });
  
  let expenseRows = '';
  (data.expenses || []).sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(e => {
    expenseRows += `<tr><td>${e.date}</td><td>${e.description}</td><td>${e.category}</td><td style="text-align:right;">$${parseFloat(e.amount).toFixed(2)}</td></tr>`;
  });
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>AFP Financial Report - ${dateStr}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 40px auto; padding: 20px; }
        h1 { color: #333; border-bottom: 2px solid #4facfe; padding-bottom: 10px; }
        h2 { color: #555; margin-top: 30px; }
        .summary { background: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .summary .total { font-size: 32px; font-weight: bold; color: #4facfe; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f5f5f5; font-weight: 600; }
        .meta { color: #666; font-size: 12px; }
        @media print { body { margin: 20px; } }
      </style>
    </head>
    <body>
      <h1>💰 AFP Financial Report</h1>
      <div class="meta">Generated: ${dateStr}</div>
      
      <div class="summary">
        <div>Total Expenses</div>
        <div class="total">$${total.toFixed(2)}</div>
        <div style="margin-top:10px;">${(data.expenses || []).length} transactions</div>
      </div>
      
      <h2>By Category</h2>
      <table>
        <tr><th>Category</th><th style="text-align:right;">Amount</th></tr>
        ${categoryRows}
        <tr style="font-weight:bold;border-top:2px solid #333;"><td>TOTAL</td><td style="text-align:right;">$${total.toFixed(2)}</td></tr>
      </table>
      
      <h2>All Transactions</h2>
      <table>
        <tr><th>Date</th><th>Description</th><th>Category</th><th style="text-align:right;">Amount</th></tr>
        ${expenseRows}
      </table>
    </body>
    </html>
  `;
  
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  win.onload = () => {
    win.print();
  };
}

function showSaveToFolderModal() {
  if (!lastAIResponse) {
    alert('No AI response to save.');
    return;
  }
  
  // Build folder options
  const folders = data.folders || [];
  if (folders.length === 0) {
    if (confirm('No folders yet. Create one now?')) {
      showAddFolderModal();
    }
    return;
  }
  
  const folderOptions = folders.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
  
  const modal = document.createElement('div');
  modal.id = 'save-folder-modal';
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content" style="max-width:400px;">
      <div class="modal-header">
        <h2>📁 Save to Folder</h2>
        <button class="close-modal" onclick="closeSaveFolderModal()">×</button>
      </div>
      <div class="modal-body">
        <label style="display:block;font-size:13px;margin-bottom:6px;">Select folder:</label>
        <select id="save-folder-select" style="width:100%;padding:12px;border:1px solid rgba(255,255,255,0.2);border-radius:8px;background:rgba(255,255,255,0.05);color:#e8e8e8;margin-bottom:16px;">
          ${folderOptions}
        </select>
        <label style="display:block;font-size:13px;margin-bottom:6px;">Note title:</label>
        <input type="text" id="save-folder-title" value="AI Response - ${new Date().toLocaleDateString()}" style="width:100%;padding:12px;border:1px solid rgba(255,255,255,0.2);border-radius:8px;background:rgba(255,255,255,0.05);color:#e8e8e8;margin-bottom:16px;">
        <div style="background:rgba(0,0,0,0.2);padding:12px;border-radius:8px;max-height:150px;overflow-y:auto;font-size:12px;opacity:0.8;white-space:pre-wrap;margin-bottom:16px;">${lastAIResponse.substring(0, 500)}${lastAIResponse.length > 500 ? '...' : ''}</div>
        <button onclick="saveResponseToFolder()" class="btn-primary" style="width:100%;">Save to Folder</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeSaveFolderModal() {
  document.getElementById('save-folder-modal')?.remove();
}

async function saveResponseToFolder() {
  const folderId = document.getElementById('save-folder-select').value;
  const title = document.getElementById('save-folder-title').value.trim() || 'AI Response';
  
  const folder = data.folders.find(f => f.id === folderId);
  if (!folder) {
    alert('Folder not found.');
    return;
  }
  
  folder.items = folder.items || [];
  folder.items.push({
    type: 'note',
    name: title,
    content: lastAIResponse,
    addedAt: new Date().toISOString()
  });
  
  saveLocal();
  await saveToServer('saveFolder', { folder });
  renderFolders();
  
  closeSaveFolderModal();
  alert(`Saved to "${folder.name}"!`);
}

init();
</script>

<!-- Floating AI Button and Panel -->
<style>
.floating-ai-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.floating-ai-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 30px rgba(102, 126, 234, 0.6);
}
.floating-ai-btn.has-unread::after {
  content: '';
  position: absolute;
  top: 8px;
  right: 8px;
  width: 12px;
  height: 12px;
  background: #e74c3c;
  border-radius: 50%;
  border: 2px solid #1a1a2e;
}

.floating-ai-panel {
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 400px;
  max-width: calc(100vw - 48px);
  height: 500px;
  max-height: calc(100vh - 150px);
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  box-shadow: 0 10px 50px rgba(0,0,0,0.5);
  z-index: 9999;
  display: none;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
}
.floating-ai-panel.active {
  display: flex;
}
.floating-ai-header {
  padding: 16px;
  background: rgba(0,0,0,0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.floating-ai-header h3 {
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.floating-ai-close {
  background: none;
  border: none;
  color: #e8e8e8;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.7;
}
.floating-ai-close:hover { opacity: 1; }
.floating-ai-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}
.floating-ai-input-area {
  padding: 12px;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  gap: 8px;
}
.floating-ai-input {
  flex: 1;
  padding: 12px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 8px;
  background: rgba(255,255,255,0.05);
  color: #e8e8e8;
  font-size: 14px;
  resize: none;
}
.floating-ai-send {
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
.floating-quick-btns {
  padding: 8px 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.floating-quick-btn {
  padding: 6px 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  font-size: 11px;
  cursor: pointer;
  color: #e8e8e8;
}
.floating-quick-btn:hover {
  background: rgba(255,255,255,0.1);
}

@media (max-width: 500px) {
  .floating-ai-panel {
    right: 12px;
    bottom: 90px;
    width: calc(100vw - 24px);
    height: calc(100vh - 120px);
  }
  .floating-ai-btn {
    right: 16px;
    bottom: 16px;
    width: 56px;
    height: 56px;
  }
}
</style>

<button class="floating-ai-btn" onclick="toggleFloatingAI()" title="AI Assistant">🤖</button>

<div class="floating-ai-panel" id="floating-ai-panel">
  <div class="floating-ai-header">
    <h3>🤖 AI Assistant</h3>
    <button class="floating-ai-close" onclick="toggleFloatingAI()">×</button>
  </div>
  <div class="floating-quick-btns">
    <button class="floating-quick-btn" onclick="floatingAskAI('How am I tracking overall?')">📊 Progress</button>
    <button class="floating-quick-btn" onclick="floatingAskAI('What should I focus on?')">🎯 Focus</button>
    <button class="floating-quick-btn" onclick="floatingAskAI('What meetings do I have this week?')">📅 Schedule</button>
    <button class="floating-quick-btn" onclick="floatingAskAI('Summarize my folders and documents')">📁 Folders</button>
    <button class="floating-quick-btn" onclick="floatingAskAI('What are my key risks?')">⚠️ Risks</button>
  </div>
  <div class="floating-ai-messages" id="floating-ai-messages">
    <div style="display: flex; gap: 12px; margin-bottom: 16px;">
      <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0;">🤖</div>
      <div style="background: rgba(255,255,255,0.1); padding: 10px 14px; border-radius: 12px; font-size: 13px; line-height: 1.5;">
        <p>Hi! I have access to all your OKRs, folders, documents, calendar, and notes. How can I help?</p>
      </div>
    </div>
  </div>
  <div class="floating-ai-input-area">
    <textarea class="floating-ai-input" id="floating-ai-input" placeholder="Ask anything..." rows="1" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendFloatingAIMessage();}"></textarea>
    <button class="floating-ai-send" onclick="sendFloatingAIMessage()">→</button>
  </div>
</div>

<script>
let floatingChatHistory = [];

function toggleFloatingAI() {
  const panel = document.getElementById('floating-ai-panel');
  panel.classList.toggle('active');
  if (panel.classList.contains('active')) {
    document.getElementById('floating-ai-input').focus();
  }
}

function floatingAskAI(question) {
  document.getElementById('floating-ai-input').value = question;
  sendFloatingAIMessage();
}

function addFloatingChatMessage(role, content) {
  const container = document.getElementById('floating-ai-messages');
  const div = document.createElement('div');
  div.style.cssText = 'display: flex; gap: 12px; margin-bottom: 16px;';
  
  if (role === 'user') {
    div.innerHTML = `
      <div style="margin-left: auto; background: linear-gradient(135deg, #4facfe, #00f2fe); padding: 10px 14px; border-radius: 12px; font-size: 13px; max-width: 85%; color: #1a1a2e;">${content}</div>
    `;
  } else {
    div.innerHTML = `
      <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0;">🤖</div>
      <div style="background: rgba(255,255,255,0.1); padding: 10px 14px; border-radius: 12px; font-size: 13px; line-height: 1.5; max-width: 85%;">${content}</div>
    `;
  }
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

async function sendFloatingAIMessage() {
  const input = document.getElementById('floating-ai-input');
  const message = input.value.trim();
  if (!message) return;
  
  if (!ANTHROPIC_API_KEY) {
    alert('Please set your API key: Go to AI Assistant tab → ⚙️ API Key');
    return;
  }
  
  addFloatingChatMessage('user', message);
  input.value = '';
  
  // Add typing indicator
  const typing = document.createElement('div');
  typing.id = 'floating-typing';
  typing.style.cssText = 'display: flex; gap: 12px; margin-bottom: 16px;';
  typing.innerHTML = `
    <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0;">🤖</div>
    <div style="background: rgba(255,255,255,0.1); padding: 10px 14px; border-radius: 12px; font-size: 13px;">Thinking...</div>
  `;
  document.getElementById('floating-ai-messages').appendChild(typing);
  
  try {
    floatingChatHistory.push({ role: 'user', content: message });
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: buildFullContextPrompt(),
        messages: floatingChatHistory
      })
    });
    
    const result = await response.json();
    document.getElementById('floating-typing')?.remove();
    
    if (result.error) {
      addFloatingChatMessage('assistant', '❌ Error: ' + result.error.message);
      return;
    }
    
    const aiResponse = result.content[0].text;
    floatingChatHistory.push({ role: 'assistant', content: aiResponse });
    
    // Format response with markdown-like styling
    const formattedResponse = aiResponse
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    
    addFloatingChatMessage('assistant', formattedResponse);
    
  } catch (error) {
    document.getElementById('floating-typing')?.remove();
    addFloatingChatMessage('assistant', '❌ Error: ' + error.message);
  }
}

// Build comprehensive context with ALL tracker data
function buildFullContextPrompt() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  // Calculate overall progress
  let totalWeighted = 0, totalWeight = 0;
  data.okrs.forEach(okr => {
    const progress = calculateOKRProgress(okr);
    totalWeighted += progress * (okr.weight || 0);
    totalWeight += okr.weight || 0;
  });
  const overallProgress = totalWeight > 0 ? Math.round(totalWeighted / totalWeight) : 0;
  
  // OKR Details with ALL data
  let okrDetails = data.okrs.map(okr => {
    const progress = calculateOKRProgress(okr);
    const krs = (okr.keyresults || []).map(kr => {
      const krProgress = kr.target > 0 ? Math.round((kr.current / kr.target) * 100) : 0;
      let krLine = `  - ${kr.text}: ${kr.current}/${kr.target} ${kr.unit} (${krProgress}%)${kr.complete ? ' ✓' : ''}`;
      if (kr.description) krLine += `\n    Description: ${kr.description}`;
      if (kr.items && kr.items.length > 0) {
        krLine += `\n    Items (${kr.items.length}):`;
        kr.items.forEach(item => {
          krLine += `\n      • ${item.name} [${item.status || 'In Progress'}]`;
          if (item.notes) krLine += `: ${item.notes.substring(0, 8000)}${item.notes.length > 8000 ? '...' : ''}`;
        });
      }
      if (kr.attachments && kr.attachments.length > 0) {
        krLine += `\n    Attachments: ${kr.attachments.map(a => a.name).join(', ')}`;
        kr.attachments.forEach(att => {
          if (att.extractedText) {
            krLine += `\n    [${att.name}]: ${att.extractedText.substring(0, 8000)}${att.extractedText.length > 8000 ? '...' : ''}`;
          }
        });
      }
      if (kr.notes) krLine += `\n    Notes: ${kr.notes}`;
      return krLine;
    }).join('\n');
    let section = `\n## ${okr.category} (${okr.weight}%) - ${progress}%\n${okr.objective}\n${krs}`;
    if (okr.notes) section += `\nObjective Notes: ${okr.notes}`;
    return section;
  }).join('\n');

  // ALL Folders with contents
  let foldersContext = '';
  if (data.folders && data.folders.length > 0) {
    foldersContext = '\n\n## FOLDERS & DOCUMENTS\n';
    data.folders.forEach(folder => {
      foldersContext += `\n### 📁 ${folder.name}`;
      if (folder.description) foldersContext += ` (${folder.description})`;
      foldersContext += '\n';
      if (folder.items && folder.items.length > 0) {
        folder.items.forEach(item => {
          foldersContext += `  - ${item.type === 'pdf' ? '📄' : '📝'} ${item.name}\n`;
          if (item.content) {
            foldersContext += `    Content: ${item.content.substring(0, 8000)}${item.content.length > 8000 ? '...' : ''}\n`;
          }
        });
      } else {
        foldersContext += '  (empty)\n';
      }
    });
  }

  // ALL Calendar Events
  let calendarContext = '';
  if (data.events && data.events.length > 0) {
    const sortedEvents = [...data.events].sort((a, b) => new Date(a.date + 'T12:00:00') - new Date(b.date + 'T12:00:00'));
    calendarContext = '\n\n## CALENDAR EVENTS (' + sortedEvents.length + ' total)\n';
    sortedEvents.forEach(e => {
      const eventDate = new Date(e.date + 'T12:00:00');
      const dateStr = eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      calendarContext += `\n### ${dateStr}: ${e.title}\n`;
      if (e.time) calendarContext += `- Time: ${e.time}\n`;
      if (e.location) calendarContext += `- Location: ${e.location}\n`;
      if (e.organizer) calendarContext += `- Organizer: ${e.organizer}\n`;
      if (e.invitees && e.invitees.length > 0) {
        calendarContext += `- Attendees (${e.invitees.length}): ${e.invitees.slice(0, 10).join(', ')}${e.invitees.length > 10 ? '...' : ''}\n`;
      }
      if (e.notes) calendarContext += `- Notes: ${e.notes}\n`;
      if (e.conflicts) calendarContext += `- ⚠️ Conflicts: ${e.conflicts}\n`;
    });
  }

  // ALL Notes
  let notesContext = '';
  if (data.notes && data.notes.length > 0) {
    notesContext = '\n\n## NOTES (' + data.notes.length + ' total)\n';
    data.notes.forEach(n => {
      notesContext += `\n### ${n.title} (${n.date}) [${n.tag}]\n${n.content.substring(0, 5000)}${n.content.length > 5000 ? '...' : ''}\n`;
    });
  }

  // ALL Expenses
  let expensesContext = '';
  if (data.expenses && data.expenses.length > 0) {
    const total = data.expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    expensesContext = '\n\n## EXPENSES (Total: $' + total.toLocaleString() + ')\n';
    data.expenses.slice(0, 20).forEach(e => {
      expensesContext += `- ${e.date}: ${e.description} - $${e.amount} (${e.category})\n`;
    });
  }

  return `You are an AI assistant for Art Taylor, CEO of AFP Global. Today is ${today}.
You have FULL ACCESS to all tracker data including OKRs, folders, documents, calendar, notes, and expenses.

## OVERALL PROGRESS: ${overallProgress}%

${okrDetails}
${foldersContext}
${calendarContext}
${notesContext}
${expensesContext}

Be concise, specific, and helpful. Reference specific data when answering. If asked about meetings, schedules, documents, folders, or any tracker content, search through the data above to provide accurate answers.`;
}
</script>
</body>
</html>
