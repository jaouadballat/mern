import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deletePost } from '../../actions/postsAction';


class Post extends Component {

    onDelete = (postId) => {
        this.props.deletePost(postId);
    }

  render() {
      const { post } = this.props
    return (
        <div className="row">
            <div className="col-md-2">
                <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={post.user.avatar}
                        alt="" />
                </a>
                <br />
                <p className="text-center">{post.user.name}</p>
            </div>
            <div className="col-md-10">
                <p className="lead">{post.text}</p>
                <button type="button" className="btn btn-light mr-1">
                    <i className="text-info fa fa-thumbs-up"></i>
                    <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button type="button" className="btn btn-light mr-1">
                    <i className="text-secondary fa fa-thumbs-down"></i>
                </button>
                <Link to="post.html" className="btn btn-info mr-1">
                    Comments
              </Link>
                <button type="button" className="btn btn-danger mr-1" onClick={() => this.onDelete(post._id)}>
                    <i className="fa fa-times" />
                </button>
            </div>
        </div>
    )
  }
}

export default connect(null, { deletePost })(Post);