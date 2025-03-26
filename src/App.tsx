import { useState, useEffect } from 'react'
import './App.css'
import SourceTable from './components/SourceTable'
import AddSourceForm from './components/AddSourceForm'
import { fetchAllSources, checkSourcesHealth, downloadSourceFiles, addSource } from './services/api'

// Types
export interface Source {
  name: string;
  isHealthy?: boolean;
  fileCount?: number;
}

export interface SourceDetail {
  name: string;
  available_files: string[];
}

export type TransportType = 'HTTPTransport' | 'SFTPTransport';

export interface NewSourceForm {
  name: string;
  transport: TransportType;
  config: {
    [key: string]: string | number;
  };
}

function App() {
  // States
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Fetch sources
  const loadSources = async () => {
    setLoading(true);
    setError(null);
    try {
      const sourcesData = await fetchAllSources();
      setSources(sourcesData);
    } catch (err) {
      setError('Failed to fetch sources. Please check if the API is running.');
    } finally {
      setLoading(false);
    }
  };
  
  // Check health
  const handleCheckHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      await checkSourcesHealth();
      await loadSources(); // Refresh the list with updated health data
    } catch (err) {
      setError('Failed to check health. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Download files
  const handleDownloadFiles = async (sourceName: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await downloadSourceFiles(sourceName);
      if (result.status === 'success') {
        alert(`Successfully downloaded files for ${sourceName}`);
        loadSources(); // Refresh to update the file count
      } else {
        throw new Error('Download operation failed');
      }
    } catch (err) {
      setError(`Failed to download files for ${sourceName}`);
    } finally {
      setLoading(false);
    }
  };
  
  // Add new source
  const handleAddSource = async (newSourceData: NewSourceForm) => {
    setLoading(true);
    setError(null);
    
    try {
      await addSource(newSourceData);
      setShowAddForm(false);
      await loadSources();
    } catch (err) {
      setError('Failed to add source. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };
  
  // Load sources on component mount
  useEffect(() => {
    loadSources();
  }, []);
  
  return (
    <div className="app-container">
      <Header />

      <main>
        <div className="actions-bar">
          <button onClick={loadSources}>Refresh Sources</button>
          <button onClick={handleCheckHealth}>Check Health</button>
          <button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : 'Add New Source'}
          </button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading">Loading...</div>}
        
        {/* Add New Source Form */}
        {showAddForm && (
          <AddSourceForm onSubmit={handleAddSource} />
        )}
        
        {/* Sources Table */}
        <SourceTable 
          sources={sources} 
          onDownloadFiles={handleDownloadFiles} 
        />
      </main>

      <Footer />
    </div>
  )
}

// Header Component
const Header = () => (
  <header>
    <h1>Data Source Management</h1>
    <p>Monitor and manage your data sources</p>
  </header>
);

// Footer Component
const Footer = () => (
  <footer>
    <p>Data Source Management Tool • React + TypeScript + Vite</p>
  </footer>
);

export default App
