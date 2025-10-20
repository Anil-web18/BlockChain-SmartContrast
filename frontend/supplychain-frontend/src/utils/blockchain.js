import { ethers } from 'ethers';

// Blockchain utility functions for oil & gas supply chain
export class BlockchainWallet {
  constructor() {
    this.provider = null;
    this.wallet = null;
    this.contract = null;
  }

  // Generate new wallet with public/private key pair
  generateWallet() {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      mnemonic: wallet.mnemonic?.phrase || null
    };
  }

  // Import wallet from private key
  importWallet(privateKey) {
    try {
      const wallet = new ethers.Wallet(privateKey);
      return {
        address: wallet.address,
        privateKey: wallet.privateKey,
        publicKey: wallet.publicKey,
        isValid: true
      };
    } catch (error) {
      return { isValid: false, error: error.message };
    }
  }

  // Sign transaction with private key
  async signTransaction(transaction, privateKey) {
    try {
      const wallet = new ethers.Wallet(privateKey);
      const signedTx = await wallet.signTransaction(transaction);
      return { success: true, signedTransaction: signedTx };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Verify signature with public key
  verifySignature(message, signature, address) {
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      return recoveredAddress.toLowerCase() === address.toLowerCase();
    } catch (error) {
      return false;
    }
  }

  // Generate oil & gas supply chain transaction
  createSupplyChainTransaction(data) {
    const transaction = {
      id: `tx_${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'SUPPLY_CHAIN',
      data: {
        productId: data.productId,
        batchNumber: data.batchNumber,
        origin: data.origin,
        destination: data.destination,
        quantity: data.quantity,
        quality: data.quality,
        temperature: data.temperature,
        pressure: data.pressure,
        certifications: data.certifications || []
      },
      gasPrice: ethers.parseUnits('20', 'gwei'),
      gasLimit: 21000,
      value: ethers.parseEther(data.value || '0')
    };
    return transaction;
  }

  // Calculate transaction hash
  calculateHash(transaction) {
    const dataString = JSON.stringify(transaction);
    return ethers.keccak256(ethers.toUtf8Bytes(dataString));
  }
}

// Oil & Gas specific blockchain operations
export class OilGasBlockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.miningReward = 100; // OGC (Oil Gas Coin)
  }

  // Create genesis block
  createGenesisBlock() {
    return {
      index: 0,
      timestamp: new Date().toISOString(),
      transactions: [],
      previousHash: '0',
      hash: this.calculateHash(0, new Date().toISOString(), [], '0', 0),
      nonce: 0
    };
  }

  // Add new block to chain
  addBlock(transactions) {
    const previousBlock = this.getLatestBlock();
    const newBlock = {
      index: previousBlock.index + 1,
      timestamp: new Date().toISOString(),
      transactions: transactions,
      previousHash: previousBlock.hash,
      nonce: 0
    };
    
    newBlock.hash = this.mineBlock(newBlock, 2); // Difficulty level 2
    this.chain.push(newBlock);
    return newBlock;
  }

  // Mine block with proof of work
  mineBlock(block, difficulty) {
    const target = Array(difficulty + 1).join('0');
    
    while (block.hash.substring(0, difficulty) !== target) {
      block.nonce++;
      block.hash = this.calculateHash(
        block.index,
        block.timestamp,
        block.transactions,
        block.previousHash,
        block.nonce
      );
    }
    
    return block.hash;
  }

  // Calculate block hash
  calculateHash(index, timestamp, transactions, previousHash, nonce) {
    const dataString = index + timestamp + JSON.stringify(transactions) + previousHash + nonce;
    return ethers.keccak256(ethers.toUtf8Bytes(dataString));
  }

  // Get latest block
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Validate chain integrity
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== this.calculateHash(
        currentBlock.index,
        currentBlock.timestamp,
        currentBlock.transactions,
        currentBlock.previousHash,
        currentBlock.nonce
      )) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

// Cryptocurrency operations for oil & gas supply chain
export class OilGasCoin {
  constructor() {
    this.name = 'OilGasCoin';
    this.symbol = 'OGC';
    this.decimals = 18;
    this.totalSupply = ethers.parseEther('1000000'); // 1M OGC
    this.balances = new Map();
  }

  // Get balance for address
  getBalance(address) {
    return this.balances.get(address) || ethers.parseEther('0');
  }

  // Transfer tokens
  transfer(from, to, amount, privateKey) {
    try {
      const fromBalance = this.getBalance(from);
      const transferAmount = ethers.parseEther(amount.toString());

      if (fromBalance < transferAmount) {
        return { success: false, error: 'Insufficient balance' };
      }

      // Update balances
      this.balances.set(from, fromBalance - transferAmount);
      const toBalance = this.getBalance(to);
      this.balances.set(to, toBalance + transferAmount);

      return {
        success: true,
        transaction: {
          from,
          to,
          amount: transferAmount,
          timestamp: new Date().toISOString(),
          hash: ethers.keccak256(ethers.toUtf8Bytes(`${from}${to}${amount}${Date.now()}`))
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Mint new tokens (for supply chain rewards)
  mint(to, amount) {
    const mintAmount = ethers.parseEther(amount.toString());
    const currentBalance = this.getBalance(to);
    this.balances.set(to, currentBalance + mintAmount);
    
    return {
      success: true,
      transaction: {
        type: 'MINT',
        to,
        amount: mintAmount,
        timestamp: new Date().toISOString()
      }
    };
  }

  // Format balance for display
  formatBalance(balance) {
    return ethers.formatEther(balance);
  }
}

// Export instances
export const blockchainWallet = new BlockchainWallet();
export const oilGasBlockchain = new OilGasBlockchain();
export const oilGasCoin = new OilGasCoin();

// Initialize genesis block
oilGasBlockchain.chain = [oilGasBlockchain.createGenesisBlock()];