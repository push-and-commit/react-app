import { describe, test, expect } from 'vitest'
import {countAliveNeighbors, getNextState, isOutOfBound} from '../conway.ts'

describe('getNextState', ()=>
    [
        {
            isAlive: true,
            nbAliveNeighbours: 3,
            nextState: true
        },
        {
            isAlive: true,
            nbAliveNeighbours: 2,
            nextState: true
        },
        {
            isAlive: true,
            nbAliveNeighbours: 1,
            nextState: false
        },
        {
            isAlive: true,
            nbAliveNeighbours: 4,
            nextState: false
        },
        {
            isAlive: false,
            nbAliveNeighbours: 3,
            nextState: true
        },
        {
            isAlive: false,
            nbAliveNeighbours: 1,
            nextState: false
        },
        {
            isAlive: false,
            nbAliveNeighbours: 4,
            nextState: false
        },
    ].forEach((e) =>
        test(`cell alive : ${e.isAlive} | nb neighbours : ${e.nbAliveNeighbours} | Expected : ${e.nextState}`, () => {
            expect(getNextState(e.isAlive, e.nbAliveNeighbours)).toBe(e.nextState)
        })
    )
)

describe('isOutOfBound', ()=>
    [
        {
            length:5,
            coordinates:{
                x:1,
                y:1,
            },
            outOfBound:false
        },
        {
            length:5,
            coordinates:{
                x:-1,
                y:1,
            },
            outOfBound:true
        },
        {
            length:5,
            coordinates:{
                x:1,
                y:-1,
            },
            outOfBound:true
        },
        {
            length:5,
            coordinates:{
                x:6,
                y:1,
            },
            outOfBound:true
        },
        {
            length:5,
            coordinates:{
                x:1,
                y:6,
            },
            outOfBound:true
        },
    ].forEach((e) =>
        test(`x : ${e.coordinates.x} | y : ${e.coordinates.y} | length : ${e.length} | Expected : ${e.outOfBound}`, () => {
            expect(isOutOfBound({length : e.length}, e.coordinates)).toBe(e.outOfBound)
        })
    )
)

describe('countAliveNeighbors', () =>
    [
        {
            grid:[
                [false,true,false],
                [false,false,false],
                [false,true,false]
            ],
            coord:{
                x:1,
                y:1
            },
            nbNeighbours:2
        },
        {
            grid:[
                [false,false,false],
                [false,false,false],
                [false,true,false]
            ],
            coord:{
                x:1,
                y:1
            },
            nbNeighbours:1
        },
        {
            grid:[
                [false,false,false],
                [false,false,false],
                [false,false,false]
            ],
            coord:{
                x:1,
                y:1
            },
            nbNeighbours:0
        },
        {
            grid:[
                [false,true,false],
                [false,false,false],
                [false,false,false]
            ],
            coord:{
                x:-1,
                y:1
            },
            nbNeighbours:0
        },
    ].forEach((e) =>
        test(`grid : ${e.grid} ; cell : ${e.coord.x},${e.coord.y} | Expected : ${e.nbNeighbours}`, () => {
            expect(countAliveNeighbors(e.grid, e.coord)).toBe(e.nbNeighbours)
        })
    )
)