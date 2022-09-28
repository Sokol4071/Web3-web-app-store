pragma solidity >=0.4.22 <0.9.0;

uint256 constant Total_Pinkslips = 5 ;

contract Pinkslips{

 address public owner=msg.sender; 
  
  struct Pinkslip{
     address owner;
     uint256 price;

 }
Pinkslip[Total_Pinkslips] public pinkslips;
 
 constructor(){
     for (uint256 i = 0;i < Total_Pinkslips;i++){
         pinkslips[i].owner=address(0x0);
         pinkslips[i].price=1e17; //0.1 eth
     }
 }
 function buyPinkslip(uint256 _index) external payable {
     require(_index < Total_Pinkslips && _index >= 0);
     require(pinkslips[_index].owner == address(0x0));
     require(msg.value >= pinkslips[_index].price );
     pinkslips[_index].owner = msg.sender;
 }
}