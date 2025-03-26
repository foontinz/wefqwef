import React from 'react';
import { Source } from '../App';

interface SourceTableProps {
  sources: Source[];
  onDownloadFiles: (sourceName: string) => void;
}

const SourceTable: React.FC<SourceTableProps> = ({ sources, onDownloadFiles }) => {
  return (
    <div className="sources-container">
      <h2>Data Sources</h2>
      {sources.length === 0 ? (
        <p className="no-sources">No sources available. Add one to get started!</p>
      ) : (
        <table className="sources-table">
          <thead>
            <tr>
              <th>Source Name</th>
              <th>Health Status</th>
              <th>File Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((source) => (
              <tr key={source.name}>
                <td>{source.name}</td>
                <td className={source.isHealthy ? 'healthy' : 'unhealthy'}>
                  {source.isHealthy ? 'Healthy' : 'Unhealthy'}
                </td>
                <td>{source.fileCount ?? 'Unknown'}</td>
                <td>
                  <button 
                    onClick={() => onDownloadFiles(source.name)}
                    className="download-btn"
                  >
                    Download Files
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SourceTable; 