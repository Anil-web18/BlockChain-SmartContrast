// Load and parse the trust chain dataset
export const loadTrustChainData = async () => {
  try {
    const response = await fetch('/trust_chain_dataset.csv');
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('Error loading CSV:', error);
    return [];
  }
};

export const parseCSV = (csvText) => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(v => v.trim());
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });
};