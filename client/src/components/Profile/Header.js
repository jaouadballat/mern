import React from 'react';
import _ from 'lodash';

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
                            <a className="text-white p-2" href="#">
                                <i className="fa fa-globe fa-2x"></i>
                            </a> : 
                            <div></div>
                          }
                          { profile.socials.tweeter ? 
                            <a className="text-white p-2" href="#">
                                <i className="fa fa-twitter fa-2x"></i>
                            </a> :
                            <div></div>
                          }

                          {profile.socials.facebook ?
                              <a className="text-white p-2" href="#">
                                  <i className="fa fa-facebook fa-2x"></i>
                              </a> :
                              <div></div>
                          }
                          
                          {profile.socials.instagram ?
                              <a className="text-white p-2" href="#">
                                  <i className="fa fa-instagram fa-2x"></i>
                              </a> :
                              <div></div>
                          }
                          
                          {profile.socials.linkedin ?
                              <a className="text-white p-2" href="#">
                                  <i className="fa fa-linkedin fa-2x"></i>
                              </a> :
                              <div></div>
                          }
                          {profile.socials.youtube ?
                              <a className="text-white p-2" href="#">
                                  <i className="fa fa-youtube fa-2x"></i>
                              </a> :
                              <div></div>
                          }
                      </div>
                  </div>
              </div>
          </div>
      </div>

  )
}
