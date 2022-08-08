const floor_input = document.getElementById("floor_input");
const lift_input = document.getElementById("lift_input");
const generate_lift_button = document.getElementById("generate_lift_btn");
const generate_floor_button = document.getElementById("generate_floor_btn");
const buttons = document.getElementsByClassName("btn");
const lift = document.getElementsByClassName("lift");
const lift_left_door = document.getElementsByClassName("liftLeftDoor");
const lift_right_door = document.getElementsByClassName("liftRightDoor");
const floorInput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const liftInput = [1];
const currentFloor = "";
var prevFloorCount = 0;
var nextFloorCount = 0;
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

// generate_floor_button.addEventListener("click", () => {
//   if (floor_input.value === "") {
//     alert("Please enter a  number");
//   } else {
//     const numberOffloor = floor_input.value;
//     const floorArr = Array.from(
//       { length: numberOffloor },
//       (_, index) => index + 1
//     );
//     for (let i = 0; i < floorArr.length; i++) {
//       floor.appendChild(upButton, downButton);
//     }
//     building.appendChild(floor);
//     console.log(floorArr);
//     console.log(`generate floor button clicked with ${floor_input.value}`);
//   }
// });

// generate_lift_button.addEventListener("click", () => {
//   console.log("generate lift button clicked");
// });

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

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    const parentID = parseInt(e.target.parentElement.id);
    nextFloorCount = parentID;
    const distanceToCoverByLift = parentID * 180;
    setTimeout(() => {
      prevFloorCount = nextFloorCount;
    }, 50);
    const liftSpeed = Math.abs(nextFloorCount - prevFloorCount);
    lift[0].style.transform = `translateY(-${distanceToCoverByLift}px)`;
    lift[0].style.transitionDuration = `${liftSpeed * 2}s`;
    setTimeout(() => {
      doorsTransition();
    }, liftSpeed * 2 * 1000);
  });
}
