import React, { Component } from "react";
import './index.css';
import './animate.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
library.add(faStar);
  
class RepositoryItem extends Component {

  componentDidMount( ) {
  }

  render() {
    const repositoryItems = this.props.itemRespos;
    return (
      <section  key={this.props.index}  className="row animate bounceIn section-repository">
      <div className="col-lg-11">
          <div className="row">
               <div className="col-lg-2 avatar-owner-conatiner">
                     <div className="avatar-owner" data-backround={repositoryItems['owner']['avatar_url']} ></div>
                     <img className="img-avatar" alt={repositoryItems['owner']['login']} src={repositoryItems['owner']['avatar_url']} />
               </div>
               <div className="col-lg-10 info-repository-container">                             
                   <div className="repository-name-container">
                       <h3 className="repository-name">
                         <a href={repositoryItems['html_url']} target="_blanc"> 
                           {repositoryItems['name']}  
                           </a> 
                       </h3>
                    </div>	

                <div className="repository-description-container">
                     <p className="repository-description">
                       {repositoryItems['description']}
                     </p>
                 </div>

                 <div className="repository-statistic-container">
                     <span className="open-issues-count-container social-container-container">
                           <label className="btn-git">Issues </label>
                               <span  className="open-issues-count social-account">
                                         {repositoryItems['new_open_issues_count']}
                               </span>
                      </span>

                      <span className="open-start-count-container social-container-container">
                           <label className="btn-git">
                           <FontAwesomeIcon className="social-icon-star" icon="star" /> Start </label>
                           <span className="open-start-count  social-account">
                               {repositoryItems['new_stargazers_count']}
                           </span>
                      </span>
                      <label className="time-intervale">submitted {repositoryItems['interval']}  by {repositoryItems['owner']['login']}</label>
                 </div>
               </div>
          </div>
      </div>
 <div className="col-lg-1"></div>
</section>
    );
  }
}

export default RepositoryItem;
