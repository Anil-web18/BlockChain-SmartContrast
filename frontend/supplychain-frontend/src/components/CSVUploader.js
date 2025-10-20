import React, { useState } from 'react';

const CSVUploader = ({ onDataLoad }) => {
  const [csvData, setCsvData] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target.result;
        setCsvData(csv);
        parseCSV(csv);
      };
      reader.readAsText(file);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const data = lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] || '';
        });
        return obj;
      });

    onDataLoad(data);
  };

  const downloadTemplate = () => {
    const template = `trackingId,product,quantity,value,status,origin,destination,carrier,createdAt,temperature,humidity
SC001,Electronics,100,2.5,Delivered,Shanghai,New York,DHL,2024-01-15,22,45
SC002,Medical Supplies,500,5.0,In Transit,Mumbai,London,FedEx,2024-01-20,-20,30`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'supply_chain_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      <h3>📁 CSV Data Import</h3>
      <p>Upload CSV file or download template</p>
      
      <div style={{ marginBottom: '16px' }}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="input-field"
        />
        {fileName && (
          <p style={{ color: '#22c55e', fontSize: '14px' }}>
            ✅ Loaded: {fileName}
          </p>
        )}
      </div>

      <button onClick={downloadTemplate} className="btn-secondary">
        📥 Download Template
      </button>

      {csvData && (
        <div style={{ marginTop: '16px' }}>
          <h4>Preview:</h4>
          <textarea
            value={csvData.substring(0, 200) + '...'}
            readOnly
            style={{
              width: '100%',
              height: '100px',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CSVUploader;