let web3, user, bankInst, mygoals;
const bankAddr = "0x48B793dd17Bb85ae8a227Cfb29f11954B976ce8D";


$(document).ready(() => {
  if(window.ethereum){
    web3 = new Web3(Web3.givenProvider);
  }else{
  alert("メタマスクをインストールしてください");
  }
});

$(function() {
  $('#mygoals').sortable();
});

async function trylogin(){
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
}

$(function() {

  $(".btn.login").click(async () => {
    trylogin();
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
  
  $(document).on("click", ".clearBtn", async function(){
    var datatxt = $(this).data('id');
    console.log(datatxt);
    await clear(datatxt);
  });  
})

async function set(title, amount){
  try{
    var setTx = await bankInst.methods
    .set(title, amount)
    .send({value:amount , from:user});
    var eventData = setTx.events.seted.returnValues;
    var amountDisplay = parseFloat(
      web3.utils.fromWei(eventData.amount, "ether")
      );
    var titleDisplay = eventData.title;
    alert(`
      goal set successful!\n 
      title: ${titleDisplay}\n 
      amount: ${amountDisplay.toFixed(7)}
    `);
    mygoals = await bankInst.methods.getMyGoals().call();
    listMyGoals();
    var titletxt = document.getElementById('titleTxt').value="";
    var amounttxt = document.getElementById("amountTxt").value="";
  } catch (error){
    throw (error);
  }
}

async function clear(id){
  try{
    var clearTx = await bankInst.methods
    .clear(id)
    .send({from:user});
    var eventData = clearTx.events.cleared.returnValues;
    var amountDisplay = parseFloat(
      web3.utils.fromWei(eventData.amount, "ether")
      );
    var titleDisplay = eventData.title;
    alert(`
      goal clear successful!\n 
      title: ${titleDisplay}\n 
      amount: ${amountDisplay.toFixed(7)}
    `);
    mygoals = await bankInst.methods.getMyGoals().call();
    listMyGoals();
  } catch (error){
    throw (error);
  }}
  
  function listMyGoals(){
    $('#mygoals').html("");
    var div = document.getElementById('mygoals');
  
    for (var i = 0; i < mygoals.length; i++) {
      var goal = mygoals[i];
      var clearbtn ="disabled";
      if(goal[2] == true){
        clearbtn = "disabled";
      }else{
        clearbtn = "";
      }
      var parts = 
      `<li class="card">
        <div class="card-header"> ${web3.utils.fromWei(goal[1], "ether")} Eth </div>
        <div class="card-body">
            <h5 class="card-title"> ${goal[0]} </h5>
            <div class="text-end"><button type="button" class="btn btn-primary clearBtn" data-id="${goal[3]}" ${clearbtn}> 達成 </button></div>
        </div></li>`;
  
     div.insertAdjacentHTML('beforeend', parts);
    }
  }

  //materials

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });