const floor_input = document.getElementById("floor_input");
const lift_input = document.getElementById("lift_input");
const generate_lift = document.getElementById("generate_lift_btn");
const generate_floor = document.getElementById("generate_floor_btn");
const buttons = document.getElementsByClassName("btn");
const lift = document.getElementsByClassName("lift");
const lift_left_door = document.getElementsByClassName("liftLeftDoor");
const lift_right_door = document.getElementsByClassName("liftRightDoor");
const building = document.getElementsByClassName("building");
const floorInput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const liftInput = [1];
const currentFloor = "";
var prevFloorCount = 0;
var nextFloorCount = 0;
let isMoving = false;
const queue = [];

// const transitionStyles = {
//   transform: `translateY(-${currentFloor * 174}px)`,
//   transitionDuration: `${(currentFloor - prevFloorCount) * 2}s`,
// };

// const building = document.createElement("floor_section");
// building.className = "floor_section";

// const floor = document.createElement("div");
// floor.className = "floor";

// // const lift = document.createElement("div");
// // lift.className = "lift";

// const lift_left_door = document.createElement("div");
// lift_left_door.className = "lift_left_door";

// const lift_right_door = document.createElement("div");
// lift_right_door.className = "lift_right_door";

// const upButton = document.createElement("button");
// upButton.className = "btn";

// const downButton = document.createElement("button");
// downButton.className = "btn";

// lift.appendChild(lift_left_door, lift_right_door);

generate_floor.addEventListener("click", () => {
  var numOfFloors = floor_input.value;
  var numOfLifts = lift_input.value;
  const floorArr = Array.from({ length: numOfFloors }, (_, index) => index + 1);
  if (floor_input.value === "") {
    alert("Please enter a  number");
  } else {
    const showFloors = floorArr
      .map((floor, i) => {
        return i === 0
          ? `
            <div class="ground_floor floor" id="0">
            <div class="buttonsDiv" id="0">
              <button class="btn" id="1">UP</button>
            </div>
              <div class="lift">
              <div class="liftLeftDoor"></div>
              <div class="liftRightDoor"></div>
            </div>
            <h3 class="floorName">Ground-Floor</h3>
          </div>
          `
          : `
            <div class="floor">
            <div class="buttonsDiv" id=${floor}>
              <button class="btn" >Down</button>
              <button class="btn" >UP</button>
            </div>
            
            <h3 class="floorName">Floor${floor}</h3>
        </div>
          `;
      })
      .reverse();
    building[0].innerHTML = showFloors;

    // for (let i = 0; i < floorArr.length; i++) {}
    // building.appendChild(floor);
    // console.log(floorArr);
    // console.log(`generate floor button clicked with ${floor_input.value}`);
  }
});

// generate_lift_button.addEventListener("click", () => {
//   console.log("generate lift button clicked");
// });

lift[0].addEventListener("transitionend", (e) => {
  // var nextTransitionStartAfter = parseInt(e.elapsedTime);
  // console.log(nextTransitionStartAfter * 1000);
  // console.log(nextTransitionStartAfter * 1000 + 4000);
  isMoving = false;
  // setTimeout(() => {
  if (queue.length) {
    queue.shift()();
  }
  // }, 6000);
});

const doorsTransition = () => {
  const doorOpen = () => {
    lift_left_door[0].style.cssText = `
    width: 0%;
    transition: width 2.5s;
    `;
    lift_right_door[0].style.cssText = `
  width: 0%;
  transition: width 2.5s;
  `;
  };
  const doorClose = () => {
    lift_left_door[0].style.cssText = `
    width: 50%;
    transition: width 2.5s ;
    `;
    lift_right_door[0].style.cssText = `
  width: 50%;
  transition: width 2.5s;
  `;
  };
  doorOpen();
  // so that door  close animation starts  after 2.5 seconds
  setTimeout(doorClose, 2500);
};

const liftMovement = (e) => {
  isMoving = true;
  const parentID = parseInt(e.target.parentElement.id);

  nextFloorCount = parentID;
  const distanceToCoverByLift = parentID * 183;
  setTimeout(() => {
    prevFloorCount = nextFloorCount;
  }, 50);
  const liftSpeed = Math.abs(nextFloorCount - prevFloorCount);
  lift[0].style.transform = `translateY(-${distanceToCoverByLift}px)`;
  lift[0].style.transitionDuration = `${liftSpeed * 2}s`;
  setTimeout(() => {
    doorsTransition();
  }, liftSpeed * 2000);
};

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    addingLiftToQueue(e);
    if (queue.length === 1 && !isMoving) {
      queue.shift()();
    }
  });
}

// Array.from(buttons).forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     addingLiftToQueue(e);
//     var nextTransitionStartAfter = parseInt(e.target.parentElement.id);
//     // console.log(nextTransitionStartAfter);

//     if (queue.length === 1 && !isMoving) {
//       queue.shift()();
//     }
//   });
// });

const addingLiftToQueue = (e) => {
  queue.push(() => liftMovement(e));
};
