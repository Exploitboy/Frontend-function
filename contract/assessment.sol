pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    string public userName;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event NameSet(string name);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function setName(string memory _name) public {
        require(msg.sender == owner, "You are not the real owner of this account");
        userName = _name;
        emit NameSet(_name);
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;
        // make sure this is the owner
        require(msg.sender == owner, "You are not the real owner of this account");
        // perform transaction
        balance += _amount;
        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);
        // emit the event
        emit Deposit(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the real owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }
        // withdraw the given amount
        balance -= _withdrawAmount;
        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));
        // emit the event
        emit Withdraw(_withdrawAmount);
    }
}
