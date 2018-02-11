import React, { Component } from 'react'
import ReactDOM from "react-dom";


class App extends Component {
    render() {
        return (
            <h2>Hello World</h2>
        )
    }
}

// render the app into the html document
ReactDOM.render(
    <App />,
    document.getElementById('react-app')
)
