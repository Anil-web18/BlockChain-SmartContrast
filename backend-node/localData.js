const fs = require('fs');
const path = require('path');

const getLocalData = (filename) => {
  try {
    const filePath = path.join(__dirname, filename);
    const data = fs.readFileSync(filePath, 'utf-8');
    return data;
  } catch (error) {
    throw new Error(`File read error: ${error.message}`);
  }
};

module.exports = { getLocalData };