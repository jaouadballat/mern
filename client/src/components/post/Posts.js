import React from 'react';

import Post from './Post';

export default (props) => {
  return (
      <div className="posts">
          <div className="card card-body mb-3">
          {
              props.posts.map(post => (
                  <Post key={post._id} post={post} />
              ))
          }
          </div>
      </div>
  )
}
