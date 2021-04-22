// ***modified*** Created a local storage to save all the list content.
// adding today's date  
const dateElement = document.getElementById("date");
const options= {weekday  : "long" , month: "short" , day: "numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

showtask(); // to display the tasks even after refreshing 
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");
 
addtaskbtn.addEventListener("click", function(){
    addtaskinputval = addtaskinput.value;
    //modal popup if the inputval is empty
    var modalObj = document.getElementById("myModal");
if(addtaskinputval==0){
        modalObj.style.display="block";
        //**modification: click on cross button to close the popup  */
        var spanObj = document.getElementsByClassName("close")[0];
      spanObj.onclick=function(){
        modalObj.style.display="none";
      } 
        }

    //click anywhere on screen to minimize the popup
    window.onclick = function(event){
        if(event.target == modalObj){
          modalObj.style.display="none";
        }
      }
// checking if we already have any value in the local storage
    if(addtaskinputval.trim()!=0){
        let webtask = localStorage.getItem("localtask");
        if(webtask == null){
            taskObj = []; //creating empty array if local storage is empty
        }
        else{
            taskObj = JSON.parse(webtask); //get object from the local storage
        }
         // pushing/adding values in local storage
      
         taskObj.push({'task_name':addtaskinputval, 'completeStatus':false}); 
       
	
        localStorage.setItem("localtask", JSON.stringify(taskObj)); 
        addtaskinput.value = '';
        playAudio(); //**modification: to play audio only when the item is added */  
}

    showtask();
})

//add an item
function showtask(){
    let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskObj = [];
     
    }
    else{

        taskObj = JSON.parse(webtask);
        taskObj.reverse(); //**modification- reversing the object inside the local storage to display the new list on top of previous list */
    }
    //displaying added item on the webpage
    let html = '';
    let addedtasklist = document.getElementById("addedtasklist");
    
    taskObj.forEach((item, index) => {

        if(item.completeStatus==true){
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
        }else{
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }
        // ***modification : 
        html += `<tr style="overflow: hidden; 
        word-break: break-all;
        overflow-wrap: break-word;">
                    <th scope="row" style="display: none">${index+1}</th>
                    ${taskCompleteValue}
                    <td style="width:150px"><button type="button"  class="text-success" id=${index}><i class="fa fa-check-square-o"></i>Complete</button></td>
                    <td><button type="button" onclick="edittask(${index})" class="text-primary"><i class="fa fa-edit"></i></button></td>
                    <td><button type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i></button></td>
                </tr>`;
    });
        addedtasklist.innerHTML=html;
}


// edit an item
function edittask(index){
    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    saveindex.value = index; 
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask); 
    
    addtaskinput.value = taskObj[index]['task_name'];
    
    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";  //when clicked on edit button, show save button instead of add button
}

// save task
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function(){
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask); 
    let saveindex = document.getElementById("saveindex").value;
    
    for (keys in taskObj[saveindex]) {
        if(keys == 'task_name'){
            taskObj[saveindex].task_name = addtaskinput.value;
        }
      }

  //after the save button is clicked, bring back the add button
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";  
    localStorage.setItem("localtask", JSON.stringify(taskObj)); // saving changes to local storage
    addtaskinput.value='';
    showtask(); //displaying changes on the webpage
})
// deleteitem
function deleteitem(index){
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1); //deleting 1 item from the called index
    localStorage.setItem("localtask", JSON.stringify(taskObj)); //deleting from local storage as well
    showtask();
}

// complete task
let addedtasklist = document.getElementById("addedtasklist");
    addedtasklist.addEventListener("click", function(e){
        let webtask = localStorage.getItem("localtask");
        let taskObj = JSON.parse(webtask);
        
        let mytarget = e.target;
        if(mytarget.classList[0] === 'text-success'){
        let mytargetid = mytarget.getAttribute("id");
        
        
        
        mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;

            for (keys in taskObj[mytargetid]) {
                if(keys == 'completeStatus' && taskObj[mytargetid][keys]==true){
                    taskObj[mytargetid].completeStatus = false;
                   // taskObj[mytargetid] = {'task_name':taskValue, 'completeStatus':false};
                }else if(keys == 'completeStatus' && taskObj[mytargetid][keys]==false){
                    taskObj[mytargetid].completeStatus = true;
                    //taskObj[mytargetid] = {'task_name':taskValue, 'completeStatus':true};
                }
              }
       
       // showtask();        
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        showtask();
    }
    }) 


//play audio

function playAudio(){
    var x = document.getElementById("myAudio");
    x.play();

} 

    



// deleteall
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function(){
    let savetaskbtn = document.getElementById("savetaskbtn");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
        taskObj = [];
    }
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
    addtaskinput.value = '';
    searchtextbox.value=''; //**modification: doesnt show searched text when user clicks on delete all */

})


// searchlist
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function(){
    let trlist = document.querySelectorAll("tr"); //get all the lists in the table
  
   
    //tr element turned into array
    Array.from(trlist).forEach(function(item){
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval, 'gi'); //searches globally and case-insensitive
        if(searchedtext.match(re)){
        
           item.style.display="table-row";
           
        }
        else{
            item.style.display="none";
        }
    })
  
   })