import React, { useState } from 'react';
import { NewSourceForm, TransportType } from '../App';

interface AddSourceFormProps {
  onSubmit: (formData: NewSourceForm) => void;
}

const AddSourceForm: React.FC<AddSourceFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<NewSourceForm>({
    name: '',
    transport: 'HTTPTransport',
    config: {}
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'name' || name === 'transport') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        // Reset config when transport type changes
        ...(name === 'transport' ? { config: {} } : {})
      }));
    } else {
      // For config fields
      setFormData(prev => ({
        ...prev,
        config: {
          ...prev.config,
          [name]: name === 'port' ? parseInt(value, 10) : value
        }
      }));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  // Render fields based on transport type
  const renderConfigFields = () => {
    if (formData.transport === 'HTTPTransport') {
      return (
        <div className="form-group">
          <label>Webhook URL:</label>
          <input 
            type="text" 
            name="webhook_url" 
            value={formData.config.webhook_url as string || ''} 
            onChange={handleInputChange} 
            required 
          />
        </div>
      );
    }
    
    if (formData.transport === 'SFTPTransport') {
      return (
        <>
          <div className="form-group">
            <label>Host:</label>
            <input 
              type="text" 
              name="host" 
              value={formData.config.host as string || ''} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Port:</label>
            <input 
              type="number" 
              name="port" 
              value={formData.config.port as number || ''} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Target Directory:</label>
            <input 
              type="text" 
              name="target_directory" 
              value={formData.config.target_directory as string || ''} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>File Pattern:</label>
            <input 
              type="text" 
              name="file_pattern" 
              value={formData.config.file_pattern as string || ''} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Username:</label>
            <input 
              type="text" 
              name="username" 
              value={formData.config.username as string || ''} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              value={formData.config.password as string || ''} 
              onChange={handleInputChange} 
              required 
            />
          </div>
        </>
      );
    }
    
    return null;
  };

  return (
    <div className="add-source-form">
      <h2>Add New Source</h2>
      <div className="form-group">
        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleInputChange} 
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Transport Type:</label>
        <select 
          name="transport" 
          value={formData.transport} 
          onChange={handleInputChange}
        >
          <option value="HTTPTransport">HTTP Transport</option>
          <option value="SFTPTransport">SFTP Transport</option>
        </select>
      </div>
      
      {/* Dynamic config fields based on transport type */}
      {renderConfigFields()}
      
      <button onClick={handleSubmit} className="submit-btn">Add Source</button>
    </div>
  );
};

export default AddSourceForm; 