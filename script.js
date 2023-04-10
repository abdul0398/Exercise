let last_swap;
let oldCell;
let swaps = [];


// drag function called when dragstarts
function drag(e) {
  oldCell = e.target;
  e.target.className += " hold";
}

// drop function called when element drops;
function drop(e) {
  // prevent the default action of the event
  e.preventDefault();
  document.getElementById('flash').innerHTML = "";

  // storing newelement
  const newCell = e.target;

  last_swap = [oldCell, newCell];

  // storing the swaps
  swaps.push(last_swap);

  // copying info of old Cell
  const tempContent = oldCell.innerHTML;
  const tempColor = oldCell.style.backgroundColor;

  // exchanging new cell with oldCell
  oldCell.innerHTML = newCell.innerHTML;
  oldCell.style.backgroundColor = newCell.style.backgroundColor;

  // replacing new cell with oldCell
  newCell.innerHTML = tempContent;
  newCell.style.backgroundColor = tempColor;

  // Gettting the coordinate of oldCell and newCell
  let oldCell_coordinate = oldCell.getBoundingClientRect();
  let newCell_coordinate = newCell.getBoundingClientRect();

  //distance btw oldCell and newCell
  let change_in_X = newCell_coordinate.left - oldCell_coordinate.left;
  let change_in_Y = newCell_coordinate.top - oldCell_coordinate.top;

  // animation from new cell to old cell;
  let animation = oldCell.animate(
    [
      { transform: `translate(${change_in_X}px, ${change_in_Y}px)` },
      { transform: "none" },
    ],
    {
      duration: 900,
      easing: "ease-in",
    }
  );

  animation.onfinish = () => {
    oldCell.className = "box";
  };
}

function dragend(e) {
  oldCell.className = "box";
}
function allowDrop(e) {
  e.preventDefault();
}
// function for undoing last operation
function undo() {
  // if their are no swaps to undo
  if(swaps.length === 0){
    document.getElementById('flash').innerHTML = "no moves left to undo ";
    return
  }
  // getting the cells to be undo
  const newCell = swaps[swaps.length - 1][0];
  const oldCell = swaps[swaps.length - 1][1];
  swaps.pop(); // removing the swaps from the array
  // adding the opacity class
  oldCell.className += " hold";
   // storing info of old Cell
  const tempContent = oldCell.innerHTML;
  const tempColor = oldCell.style.backgroundColor;

  //updating oldCell
  oldCell.innerHTML = newCell.innerHTML;
  oldCell.style.backgroundColor = newCell.style.backgroundColor;

  //updating newCell
  newCell.innerHTML = tempContent;
  newCell.style.backgroundColor = tempColor;

  const oldCell_coordinate = oldCell.getBoundingClientRect();
  const newCell_coordinate = newCell.getBoundingClientRect();
  const change_in_X = newCell_coordinate.left - oldCell_coordinate.left;
  const change_in_Y = newCell_coordinate.top - oldCell_coordinate.top;
  const animation = oldCell.animate(
    [
      { transform: `translate(${change_in_X}px, ${change_in_Y}px)` },
      { transform: "none" },
    ],
    {
      duration: 900,
      easing: "ease-in",
    }
  );

  animation.onfinish = () => {
    oldCell.className = "box";
  };
}
