import React, { Component } from "react";
import RepositoryItem from './RepositoryItem'

class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    var ItemsRepositories;
    if(this.props.respositoryies){
      ItemsRepositories= this.props.respositoryies.map((ItemRepository,index)=>{
        index=Math.floor(Math.random()*999999+999999999999999).toString();
           return(
            <RepositoryItem key={index} itemRespos={ItemRepository}/>
           );
      });
    }
    return (
      <div className="all-repositories-container">
          {ItemsRepositories}
      </div>
    );
  }

}

export default Repository;


