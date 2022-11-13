import React, { FC } from 'react';
const { Client } = require('@notionhq/client');
const {
    CreatePageParameters,
    PartialPageObjectResponse,
    GetPagePropertyResponse,
  }  = require("@notionhq/client/build")



// return <div>{getDatabaseDisplay()}</div>

const RecyclerKPI = () => {
  const getDatabaseDisplay = () => {
    props.results.forEach((employee) => {
      console.log(employee);
      jsx.push(
        <div className="card">
          <p>{employee.properties.Title.title[0].plain_text}</p>
          <p2>{employee.properties.Figure.number}</p2>
        </div>
      );
    });
    return (jsx);
  };
  
  return (<div>{getDatabaseDisplay()}</div>);
};

export default RecyclerKPI;