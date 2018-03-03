import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setWorking } from '../store/actions'



class App extends Component {
    render() {
        return (
            <div>
                <h2>Hello World - {this.props.working}</h2>
                <button onClick={() => this.props.setWorking()}>Work</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    working: state.working
})

const mapDispatchToProps = (dispatch) => ({
    setWorking: () => {
        dispatch(setWorking())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
