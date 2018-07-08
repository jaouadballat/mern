import React from 'react';
import _ from 'lodash';
import moment from 'moment';

export default ({profile}) => {

    if(_.isEmpty(profile.experience))
        return <div></div>

  return (
    <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        <ul className="list-group">
            { 
                profile.experience.map((exp, index) => (
                  <li className="list-group-item" key={index}>
                      <h4>{exp.company}</h4>
                          <p>{moment(exp.from).format("MMM Do YY")} - {exp.to === null ? 'Current' : moment(exp.to).format("MMM Do YY")}</p>
                      <p>
                          <strong>Position:</strong> {profile.status}
                     </p>
                          {exp.description ? <p>
                              <strong>Description:</strong> {exp.description}</p> : null }
                  </li>
            ))
           }
        </ul>
    </div>

  )
}
