import React from 'react';
import { 
  ShoppingCartIcon, 
  TrashIcon,
  MinusIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const ShoppingCart = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-12">
          <ShoppingCartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500">Add some oil & gas products to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
        <span className="text-sm text-gray-500">{totalItems} items</span>
      </div>

      <div className="space-y-4 mb-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.supplier}</p>
              <p className="text-sm text-blue-600 font-medium">${item.price} {item.unit}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-red-600 hover:text-red-800 mt-1"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold text-blue-600">${totalAmount.toFixed(2)}</span>
        </div>
        
        <button
          onClick={onCheckout}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;