import React from "react";
import ReactDom from 'react-dom';
import { MyButton } from "../Button";

// this render is different from the ReactDom render
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup); // without this line, technically the cleanup happens by default now.

it("renders without crashing", ()=>{
    // normaljs
    const div = document.createElement("div")
    // attach component to div
    ReactDom.render(<MyButton />, div)
    ReactDom.unmountComponentAtNode(div)
})

// render the button with prop
it ("renders button correctly", ()=>{
    // when this button gets rendered, it should have the label you passed in
    // access element with id
    const {getByTestId} = render (<MyButton label="click me please" />)
    // pass test id into it, then expect the contents of the button to be click me plz
    expect(getByTestId('button')).toHaveTextContent("click me please")
})

it ("renders button correctly", ()=>{
    // when this button gets rendered, it should have the label you passed in
    const {getByTestId} = render (<MyButton label="save" />)
    expect(getByTestId('button')).toHaveTextContent("save")
})

// snapshot testing
it("matches snapshot 1", ()=>{
    // convert to virtualDOM object
    // creates tree, then look for folder called snapshot
    const tree = renderer.create(<MyButton label="save" />).toJSON()
    // create snapshot and dump the entire json in there, within the  __test__ folder
    expect(tree).toMatchSnapshot();
})

it("matches snapshot 2", ()=>{
    // convert to virtualDOM object
    // creates tree, then look for folder called snapshot
    const tree = renderer.create(<MyButton label="click me please" />).toJSON()
    // create snapshot and dump the entire json in there, within the  __test__ folder
    expect(tree).toMatchSnapshot();
})
// this is useful bceause when you commit your code, it will also track snapshots.
// next time if you changed MyButton, this should fail.
// because a new button snapshot will not match the one in the file
// If you want to keep the new change and update snapshot, press w -> u
// update snapshot
