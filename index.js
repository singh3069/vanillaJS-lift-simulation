const floor_input = document.getElementById("floor_input");
const lift_input = document.getElementById("lift_input");
const generate_lift = document.getElementById("generate_lift_btn");
const generate_floor = document.getElementById("generate_floor_btn");
const building = document.getElementsByClassName("building");
var prevFloorCount = 0;
var nextFloorCount = 0;
let isMoving = false;
// const liftData = [{ status: false, currentFloor: "", liftID: "" }];
var lifts = [];

const generateLifts = (floorId, floor) => {
  const totalNumberOfFloors = parseInt(lift_input.value);
  const liftContainer = document.createElement("div");
  liftContainer.classList.add("lift_Container");
  if (floorId == "0") {
    for (var i = 0; i < totalNumberOfFloors; i++) {
      const lift = document.createElement("div");
      lift.classList.add("lift");
      lift.id = i;
      const liftLeftDoor = document.createElement("div");
      liftLeftDoor.classList.add("liftLeftDoor");
      const liftRightDoor = document.createElement("div");
      liftRightDoor.classList.add("liftRightDoor");
      lift.append(liftLeftDoor, liftRightDoor);
      liftContainer.append(lift);
      // lifts.push(lift);
      floor.appendChild(liftContainer);
      var liftStatus = { busy: false, currentFloor: 0, liftID: i };
      lifts.push(liftStatus);
    }
  }
};
console.log(lifts);

const generateFloors = () => {
  var totalNumberOfFloors = parseInt(floor_input.value);
  for (var i = totalNumberOfFloors; i >= 0; i--) {
    const floor = document.createElement("div");
    floor.classList.add("floor");
    floor.id = i;
    floor.innerHTML =
      floor.id == 0
        ? `<h3 class="floorName">Ground Floor</h3>`
        : `<h3 class="floorName">Floor ${i}</h3>`;
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttonsDiv");
    buttonsDiv.id = i;
    const upButton = document.createElement("button");
    upButton.classList.add("btn");
    upButton.innerText = "UP";
    const downButton = document.createElement("button");
    downButton.classList.add("btn");
    downButton.innerText = "Down";
    floor.id == 0
      ? buttonsDiv.append(upButton)
      : floor.id == totalNumberOfFloors
      ? buttonsDiv.append(downButton)
      : buttonsDiv.append(upButton, downButton);
    floor.appendChild(buttonsDiv);
    building[0].appendChild(floor);
    totalNumberOfFloors = "";
    generate_lift.addEventListener("click", generateLifts(floor.id, floor));
    // generateLift(floor.id, floor);
    console.log(lifts);
  }
};

generate_floor.addEventListener("click", generateFloors);

const lift = document.getElementsByClassName("lift");
const lift_left_door = document.getElementsByClassName("liftLeftDoor");
const lift_right_door = document.getElementsByClassName("liftRightDoor");

const doorsTransition = (i) => {
  const doorOpen = () => {
    lift_left_door[i].style.cssText = `
    width: 0%;
    transition: width 2.5s;
    `;
    lift_right_door[i].style.cssText = `
  width: 0%;
  transition: width 2.5s;
  `;
  };
  const doorClose = () => {
    lift_left_door[i].style.cssText = `
    width: 50%;
    transition: width 2.5s ;
    `;
    lift_right_door[i].style.cssText = `
  width: 50%;
  transition: width 2.5s;
  `;
  };
  doorOpen();
  // so that door  close animation starts  after 2.5 seconds
  setTimeout(doorClose, 2500);
};

const callLift = (e, i) => {
  const parentID = parseInt(e.target.parentElement.id);
  // const liftStatus = liftData.find((el) => el.status == false);
  // liftStatus.status = true;
  // liftStatus.currentFloor = parentID;
  nextFloorCount = parentID;
  const distanceToCoverByLift = parentID * 183;
  setTimeout(() => {
    prevFloorCount = nextFloorCount;
  }, 50);
  const liftSpeed = Math.abs(nextFloorCount - prevFloorCount);
  lift[i].style.transform = `translateY(-${distanceToCoverByLift}px)`;
  lift[i].style.transitionDuration = `${liftSpeed * 2}s`;
  setTimeout(() => {
    doorsTransition(i);
  }, liftSpeed * 2000);
  // setTimeout(() => {
  //   liftStatus.status = false;

  // }, liftSpeed * 4500);
};

const addLiftToQueue = (e) => {
  const totalLiftsArray = lifts.map((id) => parseInt(id.id));
  // const liftStatus = liftData.find((el) => el.status == false);
  // ary.push(liftStatus);
  // console.log(ary);
  // if (liftStatus.status == false) {
  for (var i = 0; i < totalLiftsArray.length; i++) {
    callLift(e, i);
  }
  // }
};

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    addLiftToQueue(e);
  }
});
// for (let i = 0; i < btn.length; i++) {
//   btn[i].addEventListener("click", (e) => {
//     callLift(e);
//   });
// }

console.log(lifts);
