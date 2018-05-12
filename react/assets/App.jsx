import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setWorking } from '../store/actions'



class App extends Component {
    render() {
        return (
            <div>
                <h2>Hello - {(this.props.working) ? 'working' : 'not working'}</h2>
                <button onClick={() => this.props.setWorking()}>Working</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    working: state.working
})

const mapDispatchToProps = (dispatch) => ({
    setWorking() {
        dispatch(setWorking())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
