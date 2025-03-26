import { useState } from "react";
import { nextStep } from "@services/conway";

const generateGrid = (size: number) => Array.from({ length: size }, () => Array.from({ length: size }, () => false));

function App() {
    const initialGrid = generateGrid(20);
    initialGrid[6][10] = true;
    initialGrid[7][9] = true;
    initialGrid[7][11] = true;
    initialGrid[8][9] = true;
    initialGrid[8][11] = true;
    initialGrid[9][10] = true;

    initialGrid[6][11] = true;

    const [grid, setGrid] = useState(initialGrid);

    return (
        <>
            <h1>Game of life</h1>
            <table>
                <tbody>
                {grid.map((line, x) => (
                    <tr key={x}>
                        {line.map((cell, y) => (
                            <td key={`${x}-${y}`}>
                                <button
                                    onClick={() => {
                                        setGrid(() => {
                                            const newGrid = structuredClone(grid);
                                            newGrid[x][y] = !grid[x][y];
                                            return newGrid;
                                        });
                                    }}
                                >
                                    {cell ? "⚫️" : "⚪️"}
                                </button>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => setGrid(nextStep(grid))}>Next step</button>
        </>
    );
}

export default App;