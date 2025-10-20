import React, { useState } from 'react';
import { 
  BuildingOfficeIcon, 
  MapPinIcon, 
  MagnifyingGlassIcon,
  GlobeAltIcon 
} from '@heroicons/react/24/outline';
import { oilGasCompanies } from '../../data/oilGasCompanies';

const CompanyDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', 'Integrated Oil & Gas', 'National Oil Company', 'Independent Oil & Gas'];

  const filteredCompanies = oilGasCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || company.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Oil & Gas Companies</h2>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map(company => (
          <div key={company.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{company.name.charAt(0)}</span>
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 mb-2">{company.name}</h3>
              
              <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-2">
                <MapPinIcon className="w-4 h-4" />
                <span>{company.location}</span>
              </div>
              
              <div className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block mb-3">
                {company.type}
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{company.description}</p>
              
              <div className="text-xs text-gray-500">Est. {company.founded}</div>
            </div>
          </div>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <BuildingOfficeIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No companies found matching your criteria.</p>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        Showing {filteredCompanies.length} of {oilGasCompanies.length} companies
      </div>
    </div>
  );
};

export default CompanyDirectory;