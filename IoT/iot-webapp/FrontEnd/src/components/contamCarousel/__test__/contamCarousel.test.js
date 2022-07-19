// import React from "react";
// import ReactDom from 'react-dom';
// import { render, screen, cleanup } from '@testing-library/react';
// import ContamCarousel from '../ContamCarousel';

// this render is different from the ReactDom render
// import renderer from 'react-test-renderer'
// import '@testing-library/jest-dom/extend-expect'

// render the button with prop

// it ("renders button correctly", ()=>{
//     const {getByTestId} = render (<ContamCarousel title="Header" />)
//     expect(getByTestId('header')).toHaveTextContent("Contamination images")
// })





//React lets us create and display components to the user
//We need to import it so that we can look at the components to test them
import React from 'react';

//testing library gives us methods to test components
//we use render to look at React components
//we use cleanup to clear out memory after tests
import {
    render,
    cleanup,
    fireEvent,
    getAllByRole,
} from '@testing-library/react';

//extend-expect gives us methods that let us say what we think a component will look like when we test it
import '@testing-library/jest-dom/extend-expect';

import { Dropdown } from 'semantic-ui-react';

afterEach(cleanup);

