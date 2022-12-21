// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transaction {
    uint256 TransactionCount;

    event Transfer(
        address from,
        address receiver,
        uint256 amount,
        string message,
        uint256 timeStamps,
        string keyword
    );
    //struck is just like a javascript object key and value pair
    struct TransferStruck {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timeStamps;
        string keyword;
    }

    TransferStruck[] transactions;

    //function to add a transaction to the blockchain
    function addToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        TransactionCount += 1;
        transactions.push(
            TransferStruck(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    // function to get all the transactions from the blockchain
    function getAllTransactions()
        public
        view
        returns (TransferStruck[] memory)
    {
        return transactions;
    }

    //function to count transactions
    function countTransactions() public view returns (uint256) {
        return TransactionCount;
    }
}
