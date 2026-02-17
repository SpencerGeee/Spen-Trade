// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Escrow {
    enum Status { PENDING, FUNDED, COMPLETED, REFUNDED, DISPUTED }

    struct Trade {
        address buyer;
        address seller;
        uint256 amount;
        Status status;
        bool exists;
    }

    mapping(string => Trade) public trades; // tradeId => Trade
    address public arbiter;

    event FundsLocked(string tradeId, address buyer, address seller, uint256 amount);
    event FundsReleased(string tradeId);
    event FundsRefunded(string tradeId);
    event DisputeOpened(string tradeId);

    constructor() {
        arbiter = msg.sender; // Deployer is default arbiter
    }

    // Seller locks crypto for Buyer (P2P: Crypto checks into escrow)
    // Actually, in P2P Crypto-Fiat:
    // Seller sends Crypto to Escrow.
    // Buyer pays Fiat to Seller.
    // Seller releases Crypto to Buyer.
    function createEscrow(string memory tradeId, address _buyer) external payable {
        require(!trades[tradeId].exists, "Trade already exists");
        require(msg.value > 0, "Amount must be > 0");

        trades[tradeId] = Trade({
            buyer: _buyer,
            seller: msg.sender, // Seller funds the escrow
            amount: msg.value,
            status: Status.FUNDED,
            exists: true
        });

        emit FundsLocked(tradeId, _buyer, msg.sender, msg.value);
    }

    // Seller releases funds to Buyer (after confirming Fiat payment)
    function releaseFunds(string memory tradeId) external {
        Trade storage trade = trades[tradeId];
        require(trade.exists, "Trade not found");
        require(msg.sender == trade.seller || msg.sender == arbiter, "Only seller or arbiter can release");
        require(trade.status == Status.FUNDED || trade.status == Status.DISPUTED, "Invalid status");

        trade.status = Status.COMPLETED;
        payable(trade.buyer).transfer(trade.amount);

        emit FundsReleased(tradeId);
    }

    // Seller cancels/refunds (if Buyer doesn't pay) - Requires Arbiter if disputed?
    // Or if checking out voluntarily.
    // Usually Seller can refund anytime if they want to cancel trade?
    // Or if Buyer cancels?
    // Logic: Seller can refund Buyer? No, funds go back to Seller if cancelled?
    // Wait: Seller PUT funds in. Refund means funds go BACK to Seller.
    // Buyer is PAYS fiat.
    // So "Refund" in this context usually means "Return Crypto to Seller".
    // "Release" means "Give Crypto to Buyer".
    function refundToSeller(string memory tradeId) external {
        Trade storage trade = trades[tradeId];
        require(trade.exists, "Trade not found");
        // Only Arbiter can force refund to seller in dispute?
        // Or Seller can withdraw if 'Buyer' agrees?
        // Simplified: Arbiter only for now to prevent scam (Seller locking then withdrawing immediately).
        require(msg.sender == arbiter, "Only arbiter can refund to seller"); 
        require(trade.status == Status.FUNDED || trade.status == Status.DISPUTED, "Invalid status");

        trade.status = Status.REFUNDED;
        payable(trade.seller).transfer(trade.amount);

        emit FundsRefunded(tradeId);
    }
    
    // Dispute
    function openDispute(string memory tradeId) external {
        Trade storage trade = trades[tradeId];
        require(trade.exists, "Trade not found");
        require(msg.sender == trade.buyer || msg.sender == trade.seller, "Only participants can dispute");
        require(trade.status == Status.FUNDED, "Invalid status");

        trade.status = Status.DISPUTED;
        emit DisputeOpened(tradeId);
    }
}
