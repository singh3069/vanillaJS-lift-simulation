const floor_input = document.getElementById("floor_input");
const lift_input = document.getElementById("lift_input");
const generate_lift = document.getElementById("generate_lift_btn");
const generate_floor = document.getElementById("generate_floor_btn");
const building = document.getElementsByClassName("building");
var liftsArr = [];
var freeLiftsArr = [];

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
      floor.appendChild(liftContainer);
      var liftStatus = { busy: false, currentFloor: 0, liftID: i };
      liftsArr.push(liftStatus);
    }
  }
};

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
  }
};

generate_floor.addEventListener("click", generateFloors);

const lift = document.getElementsByClassName("lift");
const lift_left_door = document.getElementsByClassName("liftLeftDoor");
const lift_right_door = document.getElementsByClassName("liftRightDoor");

const doorsTransition = (liftID) => {
  const doorOpen = () => {
    lift_left_door[liftID].style.cssText = `
    width: 0%;
    transition: width 2.5s;
    `;
    lift_right_door[liftID].style.cssText = `
  width: 0%;
  transition: width 2.5s;
  `;
  };
  const doorClose = () => {
    lift_left_door[liftID].style.cssText = `
    width: 50%;
    transition: width 2.5s ;
    `;
    lift_right_door[liftID].style.cssText = `
  width: 50%;
  transition: width 2.5s;
  `;
  };
  doorOpen();
  // so that door  close animation starts  after 2.5 seconds
  setTimeout(doorClose, 2500);
};

const callLift = (calledFloor, liftID) => {
  let prevFloorCount = liftsArr[liftID].currentFloor;
  liftsArr[liftID].busy = true;
  liftsArr[liftID].currentFloor = calledFloor;
  let nextFloorCount = calledFloor;
  const distanceToCoverByLift = calledFloor * 183;
  const liftSpeed = Math.abs(nextFloorCount - prevFloorCount);

  lift[liftID].style.transform = `translateY(-${distanceToCoverByLift}px)`;
  lift[liftID].style.transitionDuration = `${liftSpeed * 2}s`;
  setTimeout(() => {
    doorsTransition(liftID);
  }, liftSpeed * 2000);

  setTimeout(() => {
    liftsArr[liftID].busy = false;
    if (freeLiftsArr.length > 0) {
      liftManager(freeLiftsArr[0]);
      freeLiftsArr.shift();
    }
  }, liftSpeed * 4500);
};

const liftManager = (e) => {
  const calledFloor = parseInt(e.target.parentElement.id);

  // figuring out which 1st non busy lift is available
  const liftStatus = liftsArr.find((el) => el.busy == false);
  if (liftStatus) {
    callLift(calledFloor, liftStatus.liftID);
  } else {
    freeLiftsArr.push(e);
  }
};

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    liftManager(e);
  }
});
