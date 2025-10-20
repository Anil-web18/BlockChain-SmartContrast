import React, { useState } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

const CryptoPayment = ({ amount, onPaymentComplete }) => {
  const [selectedCrypto, setSelectedCrypto] = useState('ETH');
  const [walletAddress, setWalletAddress] = useState('');

  const handlePayment = async () => {
    // Simulate blockchain payment
    await new Promise(resolve => setTimeout(resolve, 2000));
    onPaymentComplete({
      txHash: '0x' + Math.random().toString(16).substr(2, 64),
      amount,
      currency: selectedCrypto
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Blockchain Payment</h3>
      <div className="space-y-4">
        <select 
          value={selectedCrypto} 
          onChange={(e) => setSelectedCrypto(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="ETH">Ethereum (ETH)</option>
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="USDT">Tether (USDT)</option>
        </select>
        <input
          type="text"
          placeholder="Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white p-3 rounded flex items-center justify-center gap-2"
        >
          <CurrencyDollarIcon className="w-5 h-5" />
          Pay ${amount} in {selectedCrypto}
        </button>
      </div>
    </div>
  );
};

export default CryptoPayment;