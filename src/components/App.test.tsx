import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import App from './App';

it('App is rendered', () => {
    const appElement = TestUtils.renderIntoDocument<any>(
        <App/>
    );

    const appNode = ReactDOM.findDOMNode(appElement as any);

    expect(appNode.textContent).toEqual('Transformation Dictionaries');
});
