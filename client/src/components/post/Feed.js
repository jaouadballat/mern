import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getPosts } from '../../actions/postsAction';

import Posts from './Posts';
import Form from './Form';

 class Post extends Component {

    

    componentDidMount() {
        this.props.getPosts()
    }

   render() {
       let { posts, loading } = this.props

    if(loading) {

        return <div className="d-flex justify-content-center align-items-center">Waiting...</div>

    // } else if(_.isEmpty(posts)) {

    //     return <div className="d-flex justify-content-center align-items-center">There is no posts yets</div>

    }

     return (
          <div className="feed">
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">

                            <Form />

                            <Posts posts={posts} />

                      </div>
                  </div>
              </div>
          </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        posts: state.postReducer.posts,
        loading: state.postReducer.loading,
    }
}

export default connect(mapStateToProps, { getPosts })(Post);