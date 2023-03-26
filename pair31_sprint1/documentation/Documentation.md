## BugState

An object with two properties representing the states that a bug can be in:

    Alive: 0
    Dead: 1

## Side

An object with two properties representing the sides a bug can rotate to:

    Left: -1
    Right: 1

## Bug

A class representing a bug in a simulated world. Each bug has the following properties:

    #id: A unique identifier for the bug.
    #color: A color for the bug.
    #state: The state of the bug, which is one of the values in BugState.
    #direction: The direction that the bug is facing, which is a number between 0 and 5 inclusive.
    #position: The position of the bug in the world, represented as an instance of the Position class, or null if the bug is not currently in the world.
    #hasFood: A boolean indicating whether the bug is carrying food.
    #world: A reference to the World object in which the bug exists.
    #brain: A reference to the Brain object that controls the bug's behavior.

The Bug class has the following methods:

    constructor(id, color, state, direction, position, hasFood, world, brain): Creates a new instance of the Bug class with the specified properties.
    kill(): Changes the state of the bug to BugState.Dead.
    getId(): Returns the ID of the bug.
    getColor(): Returns the color of the bug.
    getPosition(): Returns the position of the bug.
    setPosition(position): Sets the position of the bug to the specified position.
    getDirection(): Returns the direction that the bug is facing.
    getHasFood(): Returns a boolean indicating whether the bug is carrying food.
    rotateBug(side): Rotates the bug to the left or right based on the side parameter. The side parameter should be one of the values in Side.
    moveBug(): Moves the bug one space in the direction that it is facing, if possible. If the new space is obstructed or occupied, the bug does not move.
    takeFood(): If the bug is not already carrying food, takes one unit of food from the cell that the bug is on and sets #hasFood to true.
    dropFood(): If the bug is carrying food, drops one unit of food on the cell that the bug is on and sets #hasFood to false.
    doOneBrainTask(): TODO. This method is not implemented yet.
    toString(): Returns a string representation of the bug in the format "Bug [id]: position([x], [y]) ([color])".

## Position 

The Position class represents a location in a two-dimensional grid. It has two private properties, #x and #y, which hold the x and y coordinates respectively. The constructor takes two arguments, x and y, and sets the corresponding properties. The class also has methods for getting the x and y coordinates (getX() and getY()), and for creating a new position that is offset in a particular direction (moveToNewPosition()). The toString() method returns a string representation of the position in the format "x y".

## World class

The World class represents a two-dimensional grid of cells, each of which may contain a bug, food, a marker, or be obstructed. The constructor takes a two-dimensional array map that represents the grid. The class has private properties #height and #width that hold the dimensions of the grid. The height() and width() methods return the height and width respectively.

The cellAt(position) method takes a Position object as an argument and returns the cell at that position. If the position is out of bounds, an Error is thrown.

The sensedCell(position, direction) method takes a Position object and a direction (Direction.Right, Direction.RightUp, etc.) and returns the cell that would be sensed by a bug at that position facing in that direction.

The isObstructedAt(position) method takes a Position object and returns a boolean indicating whether the cell at that position is obstructed.

The isOccupiedAt(position) method takes a Position object and returns a boolean indicating whether the cell at that position is occupied by a bug.

The setBugAt(position, bug) method takes a Position object and a Bug object and sets the cell at that position to be occupied by the bug.

The getBugAt(position) method takes a Position object and returns the Bug object occupying the cell at that position.

The removeBugAt(position) method takes a Position object and removes the Bug object occupying the cell at that position.

The setFoodAt(position, value) method takes a Position object and a number representing the amount of food to set at that position.

The getFoodAt(position) method takes a Position object and returns the amount of food at that position.

The isFriendlyBaseAt(position, color) method takes a Position object and a color (Color.Red or Color.Black) and returns a boolean indicating whether the cell at that position is a friendly base of the given color.

The isEnemyBaseAt(position, color) method takes a Position object and a color (Color.Red or Color.Black) and returns a boolean indicating whether the cell at that position is an enemy base of the given color.

The setMarkerAt(position, color, number) method takes a Position object, a color (Color.Red or Color.Black), and a number representing the marker to set.

The clearMarkerAt(position, color, number) method takes a Position object, a color (Color.Red or Color.Black), and a number representing the marker to clear.

The isFriendlyMarkerAt(position, color, number) method takes a Position object, a color (Color.Red or Color.Black), and a number representing the marker to check, and returns a boolean indicating whether the cell at that position has a friendly marker of the given color and number.


## Marker

The Marker class is responsible for storing markers on a WorldCell object. It has a static property N_MARKERS that defines the number of markers available. The #data field is a two-dimensional array that stores the status of each marker for each color.

## Constructor

The constructor initializes #data as an empty array and creates an array of length N_MARKERS for each color, setting all markers to false.

Methods

set(color, type, value): Sets the value of the specified marker of the specified color to value.

get(color, type): Returns the value of the specified marker of the specified color.

toString(): Returns a string representation of the #data field as a JSON object.

## WorldCell

The WorldCell class represents a single cell in the world grid. It has fields to store information about obstructions, bugs, food, markers, and bases.

Constructor

The constructor initializes the #obstructed, #food, #marker, and #base fields based on the parameters passed in. The #bug field is set to null.

Methods

isObstructed(): Returns a boolean indicating whether the cell is obstructed.

isOccupied(): Returns a boolean indicating whether the cell is occupied by a bug.

setBug(bug): Sets the #bug field to the specified Bug object.

getBug(): Returns the Bug object currently occupying the cell.

removeBug(): Sets the #bug field to null.

setFood(value): Sets the #food field to the specified value.

getFood(): Returns the current value of the #food field.

addFood(): Increments the value of the #food field by 1, if it is less than 9.

deleteFood(): Decrements the value of the #food field by 1, if it is greater than 0.

isFriendlyBase(color): Returns a boolean indicating whether the cell is a friendly base of the specified color.

isEnemyBase(color): Returns a boolean indicating whether the cell is an enemy base of the specified color.

toString(): Returns a string representation of the cell as a JSON object. It includes information about whether the cell is obstructed, the bug occupying the cell (if any), the amount of food in the cell, the status of the markers on the cell, and the color of the base (if any).

