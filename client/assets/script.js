let web3, user, bankInst, mygoals;
const bankAddr = "0xaeff158076CA5FCA63F79657190797eae0Ec587E";

$(document).ready(async () => {
  if(window.ethereum){
    web3 = new Web3(Web3.givenProvider);
  }else{
    alert("メタマスクをインストールしてください");
  }
});

$(".btn.login").click(async () => {
  try{
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    user = accounts[0];
    $(".btn.login").html(user.slice(0,3)+"…"+user.slice(-3));
    bankInst = new web3.eth.Contract(abi.bank, bankAddr, {from: user});
    mygoals = await bankInst.methods.getMyGoals().call();
    listMyGoals();
  } catch (error){
    alert(error.message);
  }
})

$(".btn.setBtn").click(async () => {
  var titleval = $('#titleTxt').val();
  var amountval = $('#amountTxt').val();
  var amount = web3.utils.toWei(String(amountval), 'ether');
  if(titleval == "" || amountval == "" || !user){
    alert("目標内容や価格が空白か、ウォレットが接続されていません");
    return;
  }
  set(titleval, amount);
  //location.reload();
})

function listMyGoals(){
  $('.mygoals').html(mygoals);
  console.log(mygoals);
  /*
  var div = document.getElementById('posts');
  for (var i = 0; i < posts.length; i++) {
    let dateTime = new Date(posts[i][1] + 1000);
    var parts = 
    '<div class="card">'
          +'<div class="card-body">'
          +'<h6 class="card-subtitle mb-2 text-muted small">'
            + (i+1) +' 名無しさん '+dateTime+'</h6>'
            +'<p class="card-text">'+posts[i][0]+'</p></div></div>';
   div.insertAdjacentHTML('beforeend', parts);
  }
  */
}

async function set(title, amount){
  try{
    var setTx = await bankInst.methods
    .set(title, amount)
    .send({value:amount , from:user});
    console.log(setTx);
  } catch (error){
    throw (error);
  }
}

async function clear(id){
  
}