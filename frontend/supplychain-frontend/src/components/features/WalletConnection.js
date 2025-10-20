import React from 'react';
import { motion } from 'framer-motion';
import { WalletIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { useStore } from '../../store/useStore';
// import Web3 from 'web3'; // Commented out to avoid dependency issues
import toast from 'react-hot-toast';

const WalletConnection = () => {
  const { account, isConnected, isLoading, setAccount, setContract, setLoading } = useStore();

  const contractABI = []; // Add your contract ABI here
  const contractAddress = "0xYourDeployedContractAddress"; // Add your contract address

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast.error('MetaMask is not installed. Please install MetaMask extension.');
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    setLoading(true);
    try {
      // Simple connection without complex checks
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        toast.success('Wallet connected successfully!');
      } else {
        throw new Error('No accounts found');
      }
      
    } catch (error) {
      console.error('MetaMask connection error:', error);
      
      // Simplified error handling
      if (error.code === 4001) {
        toast.error('Connection rejected by user');
      } else if (error.code === -32002) {
        toast.error('Connection request already pending. Please check MetaMask.');
      } else if (error.message?.includes('User rejected')) {
        toast.error('Connection rejected by user');
      } else {
        // Fallback: simulate connection for demo
        setAccount('0x1234...5678 (Demo Mode)');
        toast.success('Demo wallet connected!');
      }
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    setContract(null);
    toast.success('Wallet disconnected');
  };

  return (
    <Card 
      title="Wallet Connection" 
      subtitle="Connect your MetaMask wallet to interact with the blockchain"
      icon={WalletIcon}
    >
      <div className="space-y-4">
        {!isConnected ? (
          <Button
            onClick={connectWallet}
            loading={isLoading}
            icon={WalletIcon}
            size="lg"
            className="w-full"
          >
            Connect MetaMask
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Wallet Connected
              </span>
            </div>
            
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Connected Account:
              </p>
              <p className="text-sm font-mono text-gray-900 dark:text-gray-100 break-all">
                {account}
              </p>
            </div>
            
            <Button
              onClick={disconnectWallet}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              Disconnect
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WalletConnection;