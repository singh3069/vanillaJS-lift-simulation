const floor_input = document.getElementById("floor_input");
const lift_input = document.getElementById("lift_input");
const generate_lift_button = document.getElementById("generate_lift_bttn");
const generate_floor_button = document.getElementById("generate_floor_bttn");
const buttons = document.getElementsByClassName("bttn");
const lift = document.getElementsByClassName("lift");
const floorInput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const liftInput = [1];
const currentFloor = "";
// const transitionStyles = {
//   transform: `translateY(-${currentFloor * 174}px)`,
//   transitionDuration: `${(currentFloor - prevFloorCount) * 2}s`,
// };

const floorSection = document.createElement("floor_section");
floorSection.className = "floor_section";

const floor = document.createElement("div");
floor.className = "floors";

// const lift = document.createElement("div");
// lift.className = "lift";

const lift_left_door = document.createElement("div");
lift_left_door.className = "lift_left_door";

const lift_right_door = document.createElement("div");
lift_right_door.className = "lift_right_door";

const upButton = document.createElement("button");
upButton.className = "bttn";

const downButton = document.createElement("button");
downButton.className = "bttn";

// lift.appendChild(lift_left_door, lift_right_door);

generate_floor_button.addEventListener("click", () => {
  if (floor_input.value === "") {
    alert("Please enter a  number");
  } else {
    const numberOfFloors = floor_input.value;
    const floorArr = Array.from(
      { length: numberOfFloors },
      (_, index) => index + 1
    );
    for (let i = 0; i < floorArr.length; i++) {
      floor.appendChild(lift, upButton, downButton);
    }
    floorSection.appendChild(floor);
    console.log(floorArr);
    console.log(`generate floor button clicked with ${floor_input.value}`);
  }
});

generate_lift_button.addEventListener("click", () => {
  console.log("generate lift button clicked");
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    const currentButton = e.target.id;
    lift.style.transform = `translateY(-${currentButton * 174}px)`;
    // lift.style.transitionDuration = `${(currentButton - currentFloor) * 2}s`;
    console.log("button clicked");
  });
}
