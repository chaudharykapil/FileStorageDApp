// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct User {
        string password1;
        string password2;
        string password3;
    }
  struct Access{
     address user; 
     bool access; //true or false
  }
  mapping(address=>string[]) value;
  mapping(address=>mapping(address=>bool)) ownership;
  mapping(address=>Access[]) accessList;
  mapping(address=>mapping(address=>bool)) previousData;
  mapping(address => User) private users;

  function add(address _user,string memory url) external {
      value[_user].push(url);
  }
  function allow(address user) external {//def
      ownership[msg.sender][user]=true; 
      if(previousData[msg.sender][user]){
         for(uint i=0;i<accessList[msg.sender].length;i++){
             if(accessList[msg.sender][i].user==user){
                  accessList[msg.sender][i].access=true; 
             }
         }
      }else{
          accessList[msg.sender].push(Access(user,true));  
          previousData[msg.sender][user]=true;  
      }
    
  }
  function disallow(address user) public{
      ownership[msg.sender][user]=false;
      for(uint i=0;i<accessList[msg.sender].length;i++){
          if(accessList[msg.sender][i].user==user){ 
              accessList[msg.sender][i].access=false;  
          }
      }
  }

  function display(address _user) external view returns(string[] memory){
      require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
      return value[_user];
  }

  function shareAccess() public view returns(Access[] memory){
      return accessList[msg.sender];
  }
  function deleteUrl(uint index) external {
    require(index < value[msg.sender].length, "Invalid index");
    for (uint i = index; i < value[msg.sender].length - 1; i++) {
      value[msg.sender][i] = value[msg.sender][i+1];
    }
    value[msg.sender].pop();
  }

    //Auth Endpoints

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
  function register( string memory _password1,string memory _password2,string memory _password3) public {
        
        require(bytes(_password1).length > 0, "Password 1 cannot be empty");
        require(bytes(_password2).length > 0, "Password 2 cannot be empty");
        require(bytes(_password3).length > 0, "Password 3 cannot be empty");
        require(bytes(users[msg.sender].password1).length <= 0 , "User already registered");


        // Store the user details
        users[msg.sender] = User(_password1,_password2,_password3);

        //emit UserRegistered(msg.sender, _username);
    }
    function authenticate(string memory _password1,string memory _password2,string memory _password3) public view returns (bool) {
        require(bytes(users[msg.sender].password1).length > 0, "User not registered");

        // Compare the stored password with the provided one
        return keccak256(abi.encodePacked(users[msg.sender].password1)) == keccak256(abi.encodePacked(_password1)) && 
        keccak256(abi.encodePacked(users[msg.sender].password2)) == keccak256(abi.encodePacked(_password2)) && 
        keccak256(abi.encodePacked(users[msg.sender].password3)) == keccak256(abi.encodePacked(_password3));
    }
}