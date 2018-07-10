import React, { Component } from 'react'
import { connect } from 'react-redux';

import TextAreaField from '../utils/TextAreaField';
import { addPost } from '../../actions/postsAction';

class Form extends Component {
    state = {
        text: ''
    }

    onChange = (e) => {
        this.setState({text: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault()
        
        this.props.addPost(this.state);
        this.setState({text: ''});
    }


  render() {

      const error = this.props.errors ? this.props.errors.text : '';

    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Say Somthing...
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>

                    <TextAreaField
                        name="text"
                        value={this.state.text}
                        placeholder="Create a post"
                        onChange={this.onChange}
                        error={error}
                    />

                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        errors: state.errorsReducer.errors
    }
}


export default connect(mapStateToProps, { addPost })(Form);

