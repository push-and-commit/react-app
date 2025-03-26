type Grid = Array<Array<boolean>>;

export const getNextState = (isAlive: boolean, numberOfAliveNeighbors: number) =>
    !isAlive ? numberOfAliveNeighbors === 3 : numberOfAliveNeighbors === 2 || numberOfAliveNeighbors === 3;

export const isOutOfBound = ({ length }: { length: number }, { x, y }: { x: number; y: number }) =>
    x < 0 || y < 0 || x >= length || y >= length;

export const countAliveNeighbors = (grid: Grid, { x, y }: { x: number; y: number }) =>
    [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
        [x + 1, y],
        [x + 1, y - 1],
        [x, y - 1],
    ].filter(([i, j]) => !isOutOfBound(grid, { x: i, y: j }) && grid[i][j]).length;

export const nextStep = (grid: Grid) => {
    const newGrid = structuredClone(grid);
    grid.forEach((line, x) => {
        line.forEach((cell, y) => {
            newGrid[x][y] = getNextState(cell, countAliveNeighbors(grid, { x, y }));
        });
    });
    return newGrid;
};