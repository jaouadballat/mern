import React from 'react';
import _ from 'lodash';
import moment from 'moment';

export default ({profile}) => {

    if(_.isEmpty(profile.education))
        return <div></div>


  return (
      <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">
              {
                  profile.education.map((edu, index) => (
                      <li className="list-group-item" key={index}>
                          <h4>{edu.school}</h4>
                          <p>{moment(edu.from).format("MMM Do YY")} - {edu.to === null ? 'Current' : moment(edu.to).format("MMM Do YY")}</p>
                          <p><strong>Degree: </strong>{edu.degree}</p>
                          <p><strong>Field Of Study: </strong>{edu.field}</p>
                         { edu.description ? <p>
                              <strong>Description:</strong> {edu.description}</p> : null }
                      </li>
                  ))
              }
          </ul>
      </div>

  )
}
