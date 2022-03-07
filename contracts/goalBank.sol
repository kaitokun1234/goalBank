// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title goalBank
 * @dev i dont know what I should write here
 */

 contract GoalBank {

    struct Goal {
        string title;
        uint amount;
        bool complete;
        uint id;
    }

    Goal[] public goals;

    mapping(uint => address) private goalToUser;
    mapping(address => uint) private userGoalCount;

     function set(string memory _title, uint _amount) public payable {
         require(msg.value == _amount, "Insufficient fund");
         uint _id = goals.length;
         goals.push(Goal(_title, _amount, false, _id));
         goalToUser[_id] = msg.sender;
         userGoalCount[msg.sender]++;
     }

     function clear(uint _id) public{
         Goal storage _goal = goals[_id];
         uint _amount = _goal.amount;
         require(goalToUser[_id] == msg.sender, "this goal is not yours");
         require(_goal.complete != true, "this goal has already been achieved");
         require(address(this).balance >= _amount, "goalBank does not have enough funds");
         _goal.complete=true;
         (bool success, ) = payable(msg.sender).call{value: _amount}("");
         require(success, "Eth transfer failed");
     }

      function getMyGoals() public view returns(Goal[] memory){
          Goal[] memory myGoals = new Goal[](userGoalCount[msg.sender]);
          uint myGoalsCount = 0;
          for(uint i=0; i < goals.length; i++){
              if(goalToUser[i] ==msg.sender){
                  myGoals[myGoalsCount] = goals[i];
                  myGoalsCount++;
              }
          }
          require(userGoalCount[msg.sender] == myGoalsCount, "getting your goals is failed");
          return myGoals;
      }
 }