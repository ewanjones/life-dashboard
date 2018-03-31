import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { setWorking } from '../store/actions'



class App extends Component {
    render() {
        return (
            <div>
                <h2>Hello {this.props.user.displayName}</h2>
                <button onClick={() => {}}>Work</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
