const transitionStyles = {
  transform: `translateY(-${currentFloor * 174}px)`,
  transitionDuration: `${(currentFloor - prevFloorCount) * 2}s`,
};
const floors = [
  { downButton: "Down", floor: "F-10", id: 10 },
  { upButton: "UP", downButton: "Down", floor: "F-9", id: 9 },
  { upButton: "UP", downButton: "Down", floor: "F-8", id: 8 },
  { upButton: "UP", downButton: "Down", floor: "F-7", id: 7 },
  { upButton: "UP", downButton: "Down", floor: "F-6", id: 6 },
  { upButton: "UP", downButton: "Down", floor: "F-5", id: 5 },
  { upButton: "UP", downButton: "Down", floor: "F-4", id: 4 },
  { upButton: "UP", downButton: "Down", floor: "F-3", id: 3 },
  { upButton: "UP", downButton: "Down", floor: "F-2", id: 2 },
  { upButton: "UP", downButton: "Down", floor: "F-1", id: 1 },
];
