let previous_swap = {};
// to check if the drop is valid or not 
let isValid;
// drag function called when dragstarts
function drag(e) {
// storing the dragged element id, used in dropping that element
    e.dataTransfer.setData("text", e.target.id);
    e.target.className += ' hold'
    setTimeout(()=> {e.target.className = 'invisible'},0); // using setTimeout so that it becomes invisibile after we grab it 
    isValid = false;
}
// drop function called when element drops;
function drop(e) {
// prevent the default action of the event 
    e.preventDefault();
// storing newelement 
    const newCell = e.target;  
    const newClone = e.target.cloneNode(true);
// retrieving old element using id ;
    const oldId = e.dataTransfer.getData("text");
    const oldCell = document.getElementById(oldId);
// drop is successfull making element visible again
    oldCell.className = 'box'

// storing prev elements id
    previous_swap.old_id = oldId;
    previous_swap.new_id = e.target.id;


    // making clone of old element
    const oldClone = oldCell.cloneNode(true);
// replacing old with new
    oldCell.parentNode.replaceChild(newClone, oldCell);
// replacing new with old
    newCell.parentNode.replaceChild(oldClone,newCell);
    isValid = true;// successfull drop
  }
  function dragend(e) {
    if(isValid === false){// if not successfull drop then make the element visible 
       e.target.className = "box";
    }
  }
function allowDrop(e) {
  e.preventDefault();
}
// function for undoing last operation
function undo(){
// retrieving prev elements using id ;
    const old_Id = previous_swap.old_id;
    const oldCell = document.getElementById(old_Id);
    const new_Id = previous_swap.new_id;
    const newCell = document.getElementById(new_Id);
    const newClone = newCell.cloneNode(true);
    const oldClone = oldCell.cloneNode(true);
// switching their position again on undo
    oldCell.parentNode.replaceChild(newClone, oldCell);
    newCell.parentNode.replaceChild(oldClone,newCell);
}
