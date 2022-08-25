const floor_input = document.getElementById("floor_input");
const lift_input = document.getElementById("lift_input");
const generate_lift = document.getElementById("generate_lift_btn");
const generate_floor = document.getElementById("generate_floor_btn");
const building = document.getElementsByClassName("building");
var liftsArr = [];
var freeLiftsArr = [];

const generateLifts = (floorId, floor, totalNumberOfLifts) => {
  const liftContainer = document.createElement("div");
  liftContainer.classList.add("lift_Container");
  if (floorId == "0") {
    for (let i = 0; i < totalNumberOfLifts; i++) {
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
    lift_input.value = "";
  }
};

const generateFloors = (totalNumberOfLifts, totalNumberOfFloors) => {
  building[0].innerHTML = "";
  for (let i = totalNumberOfFloors; i >= 0; i--) {
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
    generateLifts(floor.id, floor, totalNumberOfLifts);
  }
  floor_input.value = "";
};

generate_floor.addEventListener("click", () => {
  const totalNumberOfFloors = parseInt(floor_input.value);
  const totalNumberOfLifts = parseInt(lift_input.value);
  const liftsMaxVal = parseInt(lift_input.getAttribute("max"));
  const liftsMinVal = parseInt(lift_input.getAttribute("min"));
  const floorsMaxVal = parseInt(floor_input.getAttribute("max"));
  const floorsMinVal = parseInt(floor_input.getAttribute("min"));

  if (!totalNumberOfFloors && !totalNumberOfLifts) {
    alert("Please enter number to generate  floor and lift.");
  } else if (!totalNumberOfFloors) {
    alert(
      "Floors input field is empty please  enter a number from 1-15 to generate floors."
    );
  } else if (totalNumberOfFloors > floorsMaxVal) {
    alert(
      "For now we are only having 15 floors so please enter number from 1 - 15."
    );
  } else if (totalNumberOfFloors < floorsMinVal) {
    alert(
      "Floors value can not be negative please enter positive number from 1-15."
    );
  } else if (!totalNumberOfLifts) {
    alert(
      "Lift input field is empty please  enter a number from 1-5 to generate lifts."
    );
  } else if (totalNumberOfLifts > liftsMaxVal) {
    alert("For now we have only  5 lifts so please enter number  from 1-5.");
  } else if (totalNumberOfLifts < liftsMinVal) {
    alert(
      "Lifts number can not be negative please enter positive number  from 1-5."
    );
  } else {
    generateFloors(totalNumberOfLifts, totalNumberOfFloors);
  }
});

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
  }, liftSpeed * 2000 + 5000);
};

const liftManager = (event) => {
  const calledFloor = parseInt(event.target.parentElement.id);

  // figuring out which 1st non busy lift is available
  const liftStatus = liftsArr.find((el) => el.busy == false);
  if (liftStatus) {
    callLift(calledFloor, liftStatus.liftID);
  } else {
    freeLiftsArr.push(event);
  }
  // const nearestLifts = liftsArr.map((el) => {
  //   return el.currentFloor;
  // });
  // const nearestLiftID = nearestLifts.reduce((a, b) => {
  //   return Math.abs(b - calledFloor) < Math.abs(a - calledFloor) ? b : a;
  // });
  // console.log({ calledFloor });
  // console.log({ nearestLifts });
  // console.log({ nearestLiftID });
};

window.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn")) {
    liftManager(event);
  }
});
