var abi = {
	bank: [
		{
		  "inputs": [
			{
			  "internalType": "uint256",
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "name": "goals",
		  "outputs": [
			{
			  "internalType": "string",
			  "name": "title",
			  "type": "string"
			},
			{
			  "internalType": "uint256",
			  "name": "amount",
			  "type": "uint256"
			},
			{
			  "internalType": "bool",
			  "name": "complete",
			  "type": "bool"
			},
			{
			  "internalType": "uint256",
			  "name": "id",
			  "type": "uint256"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function",
		  "constant": true
		},
		{
		  "inputs": [
			{
			  "internalType": "string",
			  "name": "_title",
			  "type": "string"
			},
			{
			  "internalType": "uint256",
			  "name": "_amount",
			  "type": "uint256"
			}
		  ],
		  "name": "set",
		  "outputs": [],
		  "stateMutability": "payable",
		  "type": "function",
		  "payable": true
		},
		{
		  "inputs": [
			{
			  "internalType": "uint256",
			  "name": "_id",
			  "type": "uint256"
			}
		  ],
		  "name": "clear",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "getMyGoals",
		  "outputs": [
			{
			  "components": [
				{
				  "internalType": "string",
				  "name": "title",
				  "type": "string"
				},
				{
				  "internalType": "uint256",
				  "name": "amount",
				  "type": "uint256"
				},
				{
				  "internalType": "bool",
				  "name": "complete",
				  "type": "bool"
				},
				{
				  "internalType": "uint256",
				  "name": "id",
				  "type": "uint256"
				}
			  ],
			  "internalType": "struct GoalBank.Goal[]",
			  "name": "",
			  "type": "tuple[]"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function",
		  "constant": true
		}
	  ]
}