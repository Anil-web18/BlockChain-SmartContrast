import React, { useState } from 'react';
import { 
  PaperAirplaneIcon, 
  CurrencyDollarIcon,
  TruckIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { blockchainWallet, oilGasCoin, oilGasBlockchain } from '../../utils/blockchain';
import toast from 'react-hot-toast';

const BlockchainTransaction = ({ user }) => {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    productId: '',
    location: '',
    description: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [txHash, setTxHash] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const performTransaction = async () => {
    if (!formData.recipient || !formData.amount) {
      toast.error('Please fill recipient and amount');
      return;
    }

    setIsProcessing(true);
    try {
      // Get user wallet
      const wallet = JSON.parse(localStorage.getItem(`wallet_${user.id}`));
      if (!wallet) {
        toast.error('Wallet not found');
        return;
      }

      // Create blockchain transaction
      const transactionData = {
        productId: formData.productId || `OG_${Date.now()}`,
        batchNumber: `BATCH_${Math.random().toString(36).substr(2, 9)}`,
        origin: 'Oil Field Alpha',
        destination: formData.location || 'Refinery Beta',
        quantity: parseFloat(formData.amount),
        quality: 'Premium Grade',
        temperature: 25 + Math.random() * 10,
        pressure: 100 + Math.random() * 50,
        certifications: ['ISO 9001', 'API Certified'],
        value: formData.amount
      };

      const transaction = blockchainWallet.createSupplyChainTransaction(transactionData);
      
      // Sign transaction
      const signResult = await blockchainWallet.signTransaction(transaction, wallet.privateKey);
      if (!signResult.success) {
        toast.error('Transaction signing failed');
        return;
      }

      // Perform OGC transfer
      const transferResult = oilGasCoin.transfer(
        wallet.address,
        formData.recipient,
        formData.amount,
        wallet.privateKey
      );

      if (!transferResult.success) {
        toast.error(transferResult.error);
        return;
      }

      // Add to blockchain
      const newBlock = oilGasBlockchain.addBlock([{
        ...transaction,
        hash: transferResult.transaction.hash,
        signature: signResult.signedTransaction,
        from: wallet.address,
        to: formData.recipient,
        timestamp: new Date().toISOString()
      }]);

      setTxHash(transferResult.transaction.hash);
      toast.success('Blockchain transaction completed!');
      
      // Reset form
      setFormData({
        recipient: '',
        amount: '',
        productId: '',
        location: '',
        description: ''
      });

    } catch (error) {
      toast.error('Transaction failed: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="stat-card" style={{ minHeight: '300px' }}>
      <h3 className="flex items-center gap-2 mb-4">
        <PaperAirplaneIcon className="w-5 h-5" />
        Blockchain Transaction
      </h3>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Recipient Address</label>
          <input
            type="text"
            name="recipient"
            value={formData.recipient}
            onChange={handleInputChange}
            placeholder="0x742d35Cc6634C0532925a3b8D4..."
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Amount (OGC)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="100"
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Product ID</label>
            <input
              type="text"
              name="productId"
              value={formData.productId}
              onChange={handleInputChange}
              placeholder="OG_001"
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Houston, TX"
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Oil shipment transaction..."
            className="w-full px-3 py-2 border rounded-lg text-sm h-16 resize-none"
          />
        </div>

        <button
          onClick={performTransaction}
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            <>
              <PaperAirplaneIcon className="w-4 h-4" />
              Send Transaction
            </>
          )}
        </button>

        {txHash && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircleIcon className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Transaction Successful</span>
            </div>
            <div className="text-xs text-green-700">
              <div className="font-medium">Transaction Hash:</div>
              <div className="font-mono break-all">{txHash}</div>
            </div>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500 space-y-1">
          <div className="flex items-center gap-1">
            <TruckIcon className="w-3 h-3" />
            <span>Oil & Gas Supply Chain Transaction</span>
          </div>
          <div className="flex items-center gap-1">
            <CurrencyDollarIcon className="w-3 h-3" />
            <span>Powered by OGC (Oil Gas Coin)</span>
          </div>
          <div className="flex items-center gap-1">
            <BuildingOfficeIcon className="w-3 h-3" />
            <span>Blockchain verified & immutable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainTransaction;