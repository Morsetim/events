export interface AbiItemInput {
    indexed: boolean;
    internalType: string;
    name: string;
    type: string;
  }
  
  export interface AbiItemProps {
    anonymous: boolean;
    inputs: AbiItemInput[];
    name: string;
    type: string;
  }

export const data = [
    {
      anonymous: false,
      inputs: 
    [
      {
        indexed: true,
        internalType: 'address',
        name: '_account',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
      name: 'Mint',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
      name: 'Transfer',
      type: 'event'
    }
]
  
  
  