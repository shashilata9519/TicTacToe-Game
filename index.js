console.log("tic tac toe game")
let selectBox=document.querySelector('.select-box'),
 selectXBtn=selectBox.querySelector('.playerX'),
 selectOBtn=selectBox.querySelector('.playerO'),
 playBoard=document.querySelector('.play-board'),
 allBox=document.querySelectorAll('section span'),
 players=document.querySelector('.players'),
 resultBox=document.querySelector('.result-box'),
 wonText=resultBox.querySelector('.won-text'),
 replayBtn=resultBox.querySelector('Button');

 

 window.onload=()=>{ 
    
    for(let i=0;i<allBox.length;i++) //add onclick attribute on the available sections
    {
        allBox[i].setAttribute('onclick','clickedBox(this)')
    }
    

     selectXBtn.onclick=()=>{
         selectBox.classList.add('hide'); //hide the select box on clicking playerX button 
         playBoard.classList.add('show'); // show the playboard section on clicking player button
     }
     selectOBtn.onclick=()=>{
        selectBox.classList.add('hide'); //hide the select box on clicking playerO button
        playBoard.classList.add('show'); // show the playboard section
        players.setAttribute('class','players active player');

     }


 }
 let playerXIcon='fa-solid fa-xmark';
 let playerOIcon='fa-solid fa-o';
 let playerSign='X';
 let runBot=true;

 function clickedBox(element){
    //  console.log(element)
    if(players.classList.contains('player')){
        element.innerHTML=`<i class='${playerOIcon}'></i>` //adding circle icons while clicking 
        players.classList.add('active');
          playerSign='O';                   //if player will be O we will change the sign
          element.setAttribute('id',playerSign)    

    }
    else{
        element.innerHTML=`<i class='${playerXIcon}'></i>` // adding cross icons while clicking
        players.classList.add('active');
        element.setAttribute('id',playerSign)    
    }
    selectWinner();// calling the winner function
    playBoard.style.pointerEvents='none'; //once the user select the winner the we can't select anyother box
    element.style.pointerEvents='none';
    let randomDelayTime=((Math.random()*1000) + 200).toFixed(); //generating random delay time so bot will delay randomly
    setTimeout(()=>{
        bot(runBot);
    },randomDelayTime);

 }

 function bot(runBot)
 {
    if(runBot)
    {
     
     //first change the playerSign so if user has X value in id then bot will have O
     playerSign='O';
     let array=[];              //store unselected box index
     for(let i=0;i<allBox.length;i++){
         if(allBox[i].childElementCount==0)     //span has no any child element
         {
            array.push(i); //inserting unselected and unclicked 
         }
     }
     let randomBox=array[Math.floor(Math.random() * array.length)]
    //  console.log(randomBox)
     if(array.length > 0)
     {
        if(players.classList.contains('player')){
            allBox[randomBox].innerHTML=`<i class='${playerXIcon}'></i>` //adding Cross icons while clicking 
            players.classList.remove('active');
            //if user is O then box id value will be X
            playerSign='X';
            allBox[randomBox].setAttribute('id',playerSign)

        }
        else{
            allBox[randomBox].innerHTML=`<i class='${playerOIcon}'></i>` // adding circle icons while clicking
            players.classList.remove('active');
            allBox[randomBox].setAttribute('id',playerSign)
        }
        selectWinner();// calling the winner function

     }
        allBox[randomBox].style.pointerEvents='none'; //once user select one box then we can't select  that box again
        playBoard.style.pointerEvents='auto';
        playerSign='X';
 
       }   
}

 //winner selection

 function getClass(idname)
 {
     return document.querySelector('.box' + idname).id; //returning id name

 }
 function checkClass(val1,val2,val3,sign){

     if(getClass(val1)==sign && getClass(val2)==sign && getClass(val3)==sign)
     {
         return true;
     }
 }
 function selectWinner()//if the combination match then select the winner
 {
     
     if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(7,8,9,playerSign)||checkClass(1,4,7,playerSign)|| 
     checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign)||checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign))
     {
        // console.log(playerSign + " " + "is the winner")     
        //once the match won by someone the stop the bot
        runBot=false;
        bot(runBot);
        //delay to show the result box
        setTimeout(()=>{
            playBoard.classList.remove('show');
            resultBox.classList.add('show');

        },700)
        wonText.innerHTML=`Player <p> 🏆 ${playerSign}</p> won the game! `
     }
     else{
         //if match has drawn

         if(getClass(1)!="" && getClass(2)!="" && getClass(3)!="" && getClass(4)!="" &&
         getClass(5)!="" && getClass(6)!="" && getClass(7)!="" && getClass(8)!="" &&
         getClass(9)!="" )
         {
            runBot=false;
            bot(runBot);
            //delay to show the result box
            setTimeout(()=>{
                playBoard.classList.remove('show');
                resultBox.classList.add('show');
    
            },700)
            wonText.textContent=`Match has been drawn 😕 Play again😄! `
         

         }
     }
 }
 replayBtn.onclick=()=>{
     window.location.reload(); //reload the current page
 }

