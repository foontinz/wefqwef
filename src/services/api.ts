import { Source, SourceDetail, NewSourceForm } from '../App';

const API_BASE_URL = 'http://localhost:8000';

/**
 * Fetches all sources with their health and file information
 */
export const fetchAllSources = async (): Promise<Source[]> => {
  const response = await fetch(`${API_BASE_URL}/sources`);
  if (!response.ok) throw new Error('Failed to fetch sources');
  const data = await response.json();
  
  // Map sources and get health status
  const sourcesWithDetails = await Promise.all(
    data.map(async (sourceName: string) => {
      const source: Source = { name: sourceName };
      
      // Get health status
      try {
        const healthResponse = await fetch(`${API_BASE_URL}/sources/${sourceName}/health`);
        if (healthResponse.ok) {
          const healthData = await healthResponse.json();
          source.isHealthy = healthData.healthy === true;
        }
      } catch (err) {
        source.isHealthy = false;
      }
      
      // Get files
      try {
        const filesResponse = await fetch(`${API_BASE_URL}/sources/${sourceName}/files`);
        if (filesResponse.ok) {
          const filesData: SourceDetail = await filesResponse.json();
          source.fileCount = filesData.available_files.length;
        }
      } catch (err) {
        source.fileCount = 0;
      }
      
      return source;
    })
  );
  
  return sourcesWithDetails;
};

/**
 * Checks health status of all sources
 */
export const checkSourcesHealth = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) throw new Error('Failed to check health');
};

/**
 * Downloads files for a specific source
 */
export const downloadSourceFiles = async (sourceName: string): Promise<{ status: string }> => {
  const response = await fetch(`${API_BASE_URL}/sources/${sourceName}/download`, {
    method: 'POST',
  });
  
  if (!response.ok) throw new Error('Failed to download files');
  return await response.json();
};

/**
 * Adds a new source
 */
export const addSource = async (sourceData: NewSourceForm): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/sources`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sourceData),
  });
  
  if (!response.ok) throw new Error('Failed to add source');
}; 