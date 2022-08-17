const floor_input = document.getElementById("floor_input");
const lift_input = document.getElementById("lift_input");
const generate_lift = document.getElementById("generate_lift_btn");
const generate_floor = document.getElementById("generate_floor_btn");
const buttons = document.getElementsByClassName("btn");
// const lift = document.getElementsByClassName("lift");
// const lift_left_door = document.getElementsByClassName("liftLeftDoor");
// const lift_right_door = document.getElementsByClassName("liftRightDoor");
const building = document.getElementsByClassName("building");
var prevFloorCount = 0;
var nextFloorCount = 0;
let isMoving = false;
// const queue = [];

const generateFloor = () => {
  const totalNumberOfFloors = parseInt(floor_input.value);
  for (let i = 0; i < totalNumberOfFloors; i++) {
    const floor = document.createElement("div");
    floor.classList.add("floor");
    floor.id = i;
    building[0].appendChild(floor);
  }
};

generate_floor.addEventListener("click", generateFloor);

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

const callLift = (e) => {
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
    callLift(e);
  });
}
