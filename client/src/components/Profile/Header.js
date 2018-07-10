import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

export default ({profile}) => {
   
    if(_.isEmpty(profile))
        return <div></div>

  return (
      <div className="row">
          <div className="col-md-12">
              <div className="card card-body bg-info text-white mb-3">
                  <div className="row">
                      <div className="col-4 col-md-3 m-auto">
                          <img className="rounded-circle" src={profile.user.avatar} alt="" />
                      </div>
                  </div>
                  <div className="text-center">
                      <h1 className="display-4 text-center">{profile.user.name}</h1>
                      <p className="lead text-center">{profile.status} at {profile.company}</p>
                      <p>{profile.location}</p>
                      <div className="d-flex justify-content-center">
                          { profile.website ? 
                            <Link className="text-white p-2" to="#">
                                <i className="fa fa-globe fa-2x"></i>
                            </Link> : 
                            <div></div>
                          }
                          { profile.socials.tweeter ? 
                            <Link className="text-white p-2" to="#">
                                <i className="fa fa-twitter fa-2x"></i>
                            </Link> :
                            <div></div>
                          }

                          {profile.socials.facebook ?
                              <Link className="text-white p-2" to="#">
                                  <i className="fa fa-facebook fa-2x"></i>
                              </Link> :
                              <div></div>
                          }
                          
                          {profile.socials.instagram ?
                              <Link className="text-white p-2" to="#">
                                  <i className="fa fa-instagram fa-2x"></i>
                              </Link> :
                              <div></div>
                          }
                          
                          {profile.socials.linkedin ?
                              <Link className="text-white p-2" to="#">
                                  <i className="fa fa-linkedin fa-2x"></i>
                              </Link> :
                              <div></div>
                          }
                          {profile.socials.youtube ?
                              <Link className="text-white p-2" to="#">
                                  <i className="fa fa-youtube fa-2x"></i>
                              </Link> :
                              <div></div>
                          }
                      </div>
                  </div>
              </div>
          </div>
      </div>

  )
}
