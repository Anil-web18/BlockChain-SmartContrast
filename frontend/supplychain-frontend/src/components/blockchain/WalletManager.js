import React, { useState, useEffect } from 'react';
import { 
  WalletIcon, 
  KeyIcon, 
  CurrencyDollarIcon,
  ClipboardDocumentIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import { blockchainWallet, oilGasCoin } from '../../utils/blockchain';
import toast from 'react-hot-toast';

const WalletManager = ({ user }) => {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState('0');
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  useEffect(() => {
    const savedWallet = localStorage.getItem(`wallet_${user.id}`);
    if (savedWallet) {
      const walletData = JSON.parse(savedWallet);
      setWallet(walletData);
      updateBalance(walletData.address);
    } else {
      generateNewWallet();
    }
  }, [user.id]);

  const generateNewWallet = () => {
    const newWallet = blockchainWallet.generateWallet();
    setWallet(newWallet);
    localStorage.setItem(`wallet_${user.id}`, JSON.stringify(newWallet));
    oilGasCoin.mint(newWallet.address, 1000);
    updateBalance(newWallet.address);
    toast.success('Blockchain wallet created!');
  };

  const updateBalance = (address) => {
    const balance = oilGasCoin.getBalance(address);
    setBalance(oilGasCoin.formatBalance(balance));
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  const truncateKey = (key) => {
    return `${key.substring(0, 8)}...${key.substring(key.length - 6)}`;
  };

  if (!wallet) return <div className="stat-card">Loading wallet...</div>;

  return (
    <div className="stat-card" style={{
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
      color: 'white'
    }}>
      <div className="flex items-center gap-2 mb-4">
        <WalletIcon className="w-6 h-6" />
        <h3 className="text-lg font-bold">Blockchain Wallet</h3>
      </div>

      <div className="bg-white/10 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{balance} OGC</div>
            <div className="text-sm opacity-80">Oil Gas Coin</div>
          </div>
          <CurrencyDollarIcon className="w-8 h-8 opacity-60" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Address</span>
            <button
              onClick={() => copyToClipboard(wallet.address, 'Address')}
              className="p-1 hover:bg-white/20 rounded"
            >
              <ClipboardDocumentIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="font-mono text-sm bg-black/20 p-2 rounded">
            {truncateKey(wallet.address)}
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Private Key</span>
            <div className="flex gap-1">
              <button
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                className="p-1 hover:bg-white/20 rounded"
              >
                {showPrivateKey ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => copyToClipboard(wallet.privateKey, 'Private Key')}
                className="p-1 hover:bg-white/20 rounded"
              >
                <ClipboardDocumentIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="font-mono text-sm bg-black/20 p-2 rounded">
            {showPrivateKey ? truncateKey(wallet.privateKey) : '••••••••••••••••'}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
        <div className="flex items-start gap-2">
          <KeyIcon className="w-4 h-4 mt-0.5" />
          <div className="text-xs opacity-90">
            Never share your private key. It controls your wallet.
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletManager;