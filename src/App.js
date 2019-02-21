import React, { Component } from 'react';
import Repository from './components/Repository';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

const axios = require('axios');

//import 'bootstrap/dist/js/bootstrap.min.js'; import FontAwesomeIcon from '@fortawesome/react-fontawesome'; import fontawesome from 'react-fontawesome';


class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
         // currentRepoDate: new Date(currentSystemDate.setDate(currentSystemDate.getDate() - 30)),
         currentRepoDate: new Date(),
         resulatRepositories: [],
         URL_API:"https://api.github.com/search/repositories",
         FULL_URL_API:"",
         debug:"",
         separateurDebug:"___________",
         repositoriesString:"val init"
    };
    this.currentRepoDate=this.minus30Days()
    this.state.FULL_URL_API=this.generateFULL_URL_API();
  }

  minus30Days(){
      var newDate = this.state.currentRepoDate.setDate(this.state.currentRepoDate.getDate() - 30);
      return new Date(newDate);
  }
  generateFormatDate(date){
     let formatDate="1970-01-01";
     const yearRepo = date.getFullYear().toString();
     const monthRepo = ((date.getUTCMonth() + 1).toString().length > 1) ? (date.getUTCMonth() + 1) : "0" + (date.getUTCMonth() + 1);
     const dayRepo = ((date.getDate()).toString().length > 1) ? (date.getDate()) : "0" + (date.getDate());
      formatDate = yearRepo + "-" + monthRepo + "-" + dayRepo;
      return formatDate;
  }
   
   generateFULL_URL_API(){
    const formatDateCreatedRepo = this.generateFormatDate(this.state.currentRepoDate);
    const URL_API = "https://api.github.com/search/repositories";
    const q = "created";
    const compairator = ">";
    const modeSearch = "sort";
    const colonneToSort = "starts";
    const typeSort = "desc";
    return  URL_API+"?q="+q+":"+compairator+formatDateCreatedRepo+"&"+modeSearch+"="+colonneToSort+"&order="+typeSort+""; 
   }

   putApp(data) {
    const dateLastMonth = this.minus30Days();
    /** const yearRepo = dateLastMonth.getFullYear().toString();
    const monthRepo = ((dateLastMonth.getUTCMonth() + 1).toString().length > 1) ? (dateLastMonth.getUTCMonth() + 1) : "0" + (dateLastMonth.getUTCMonth() + 1);
    const dayRepo = ((dateLastMonth.getDate()).toString().length > 1) ? (dateLastMonth.getDate()) : "0" + (dateLastMonth.getDate()); 
     */
    //const formatDateCreatedRepo = this.generateFormatDate(dateLastMonth);
    //const URL_API = "https://api.github.com/search/repositories";
    //const q = "created";
    //const compairator = ">";
    //const modeSearch = "sort";
    //const colonneToSort = "starts";
    //const typeSort = "desc";
    //const FULL_URL_API=URL_API+"?q="+q+":"+compairator+formatDateCreatedRepo+"&"+modeSearch+"="+colonneToSort+"&order="+typeSort+""; 
    //this.state.URLAPI=URL_API;
    //this.state.FULL_URL_API=FULL_URL_API;
    //this.setState(state => ({  URLAPI: URLAPI })); 
    //this.setState(state => ({  fullURLAPI:fullUrlAPI  })); 
    this.state.debug+="Full Url API: "+this.state.FULL_URL_API+this.state.separateurDebug;
    this.state.debug+="Url API: "+this.state.FULL_URL_API+this.state.separateurDebug;
    //const fullUrlAPI = "http://localhost:3000/offline_data.txt"; 
 
    var resulatRepositories = (data===null)?this.fetchDataJson(this.state.FULL_URL_API)['items']:data;

    for (var i = 0; i <  resulatRepositories.length; i++) {
      var  itemTabRepo = resulatRepositories[i];
      var dateRepo = new Date(itemTabRepo['created_at']);
      // var intervale = (((Math.abs(new Date() - dateRepo)/1000)/60)/60)/24; // in interaval days
      var intervale = (((Math.abs(dateRepo - new Date()) / 1000))); //interaval in seconde
      var newNbrStar = itemTabRepo['stargazers_count'];
      var newNombreIssues = itemTabRepo['open_issues_count'];  
      intervaleTxt = ' One houre ago';
      if (newNbrStar.toString().length >= 4) {
        newNbrStar = newNbrStar / 1000;
        itemTabRepo['new_stargazers_count'] = newNbrStar + "K";
      }
      else if (newNbrStar.toString().length >= 4 && newNbrStar.toString().length < 7 ) {
        newNbrStar = newNbrStar / 1000000;
        itemTabRepo['new_stargazers_count'] = newNbrStar + "K";
      }
      else{
        itemTabRepo['new_stargazers_count'] = newNbrStar + "";
      }


      if (newNombreIssues.toString().length >= 4) {
        newNombreIssues = newNombreIssues / 1000;
        itemTabRepo['new_open_issues_count'] = newNombreIssues + "K";
      }
      else if (newNombreIssues.toString().length >= 4 && newNombreIssues.toString().length < 7 ) {
        newNombreIssues = newNombreIssues / 1000000;
        itemTabRepo['new_open_issues_count'] = newNombreIssues + "K";
      }
      else{
        itemTabRepo['new_open_issues_count'] = newNombreIssues + "";
      }

      
      var intervaleTxt = " unknown ";
      if (intervale < 60) {
        intervaleTxt = ' Since Few ';
      }
      else if (intervale === 60) {
        intervaleTxt = ' One Minute ago ';
      }
      else if (intervale > 60 && (intervale / 60) < 1) {
        intervaleTxt = Math.floor(intervale / 60) + ' Minute ago';
      }
      else if (intervale === 60 * 60) {
        intervaleTxt = ' One houre ago ';
      }

      else if (intervale > 60 * 60 && ((intervale / 60) / 60) / 24 < 1) {
        intervaleTxt = Math.floor((intervale / 60) / 60) + ' Houre ago ';
      }

      else if (intervale === 60 * 60 * 24) {
        intervaleTxt = ' day ago ';
      }

      else if (intervale > 60 * 60 * 24 && (((intervale / 60) / 60) / 24) / 30 < 1) {
        intervaleTxt = Math.floor(((intervale / 60) / 60) / 24) + ' days ago';
      }

      else if (intervale === 60 * 60 * 24 * 30) {
        intervaleTxt = ' a month ago ';
      }

      else if (intervale > 60 * 60 * 24 * 30 && ((((intervale / 60) / 60) / 24) / 30) / 12 < 1) {
        intervaleTxt = Math.floor((((intervale / 60) / 60) / 24) / 30) + ' month ago';
      }

      else if (intervale === 60 * 60 * 24 * 30 * 12) {
        intervaleTxt = ' one year ago ';
      }

      else {
        intervaleTxt = Math.floor(((((intervale / 60) / 60) / 24) / 30) / 12) + ' year ago';
      }
      itemTabRepo['interval'] = intervaleTxt;

    }
    //console.log( this.state.resulatRepositories);
      return resulatRepositories;
  }

  componentDidUpdate() {

  }

    componentDidMount() {} 
  
   UNSAFE_componentWillMount () {
     // componentWillMount is deprecated it will continue to work until version 17
      const obj = this;
      var oldStateConexion=navigator.onLine;
      var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
       connection.addEventListener('change',   function updateConnectionStatus(e) {
           console.log("network change, network state is : "+navigator.onLine);
           oldStateConexion=navigator.onLine;
           obj.renderComponentoverTypeNetwork(); 
            if(navigator.onLine===false){
                                          
            }
       });

       
       if(this.renderComponentoverTypeNetwork()){
            this.UpdateStateComponent();
       }  
   }

   checkInternetConnexion() {
       this.state.debug+="internet connexion is: "+navigator.onLine+this.state.separateurDebug;
       return navigator.onLine;
     }
     
   checkGitHupOnligne() {
       let errorServerStatus={
         error4xx:"It is sound that server don't give permission to this resource or it is not found",
         error5xx:"Internal server error",
         informalError:"Informal error"
       }
       let resulatRequest={
           isOK:null,
           message:null,
           httpCodeErreur:null
       }

      try{
         const headResponse= $.ajax({ type: "HEAD", url:  this.state.FULL_URL_API+"/", async: false, });
         if(headResponse.readyState.toString()==="4"  && headResponse.status.toString()==="200"){
            resulatRequest.isOK=true;
            resulatRequest.message="all is right";
            resulatRequest.httpCodeErreur=headResponse.status;         
          }
  
          else if(headResponse.readyState.toString()==="4" && headResponse.status.toString()!=="200"){
            /** commonly the HTTP status codes are organized according to categories (https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
                so, i get the first character to check the error type
            **/
                const firstStatusCodeCar=headResponse.status.toString().split('')[0].toString(); 
                resulatRequest.httpCodeErreur=headResponse.status;
                if(firstStatusCodeCar==="4"){
                    resulatRequest.isOK=false;
                    resulatRequest.message=errorServerStatus.error4xx;
                }
                else if(firstStatusCodeCar==="5"){
                     resulatRequest.isOK=false;
                     resulatRequest.message=errorServerStatus.error5xx;
                }
          }
          this.state.debug+="server app is ok: "+ resulatRequest.isOK+this.state.separateurDebug;
        }
        catch(expection) {  }  
        finally{  }    
      return resulatRequest;
    }

   renderComponentoverTypeNetwork(){
       const detailAccessServer=this.checkGitHupOnligne();
       console.log(detailAccessServer);
       console.log("Internet work: "+this.checkInternetConnexion());

       var everyThinkIsOk=true;
        if(this.checkInternetConnexion()===true && detailAccessServer.isOK===true){
            
            $("body").removeClass("off-netWork");
            $("body").removeClass("git-hup-of");
        }
        else {
             this.handleClick=null;
             everyThinkIsOk=false;
            if(this.checkInternetConnexion()===false){ 
                    $("body").addClass("off-netWork");
                    $(".warning-off-line").html("Please check your network !!!");
            }
            else if(detailAccessServer.isOK===false){ 
                $("body").addClass("git-hup-off");
                $(".warning-off-line").html(detailAccessServer.message);
            }
            else {
              $("body").addClass("off-netWork");
              $(".warning-off-line").html("An error occurs");
            }
            
        }
        // console.log("state debug: "); console.log(this.state.debug.split(this.separateurDebug));
       return everyThinkIsOk;
    }
 
   fetchDataJson(fullUrlAPI) {
      /**  axios.get(fullUrlAPI).then(function (response) {   
            })
            .catch(function (error) {
              // handle error console.log(error);
            }) .then(function () {
              // always executed
            }); 
             */ 
            /** axios.get(fullUrlAPI)
            .then(res => { 
                this.setState({repositoriesString: res.data });
                 //  this.setState({ persons });
                 this.setState(state => ({
                    resulatRepositories: state.resulatRepositories.concat(this.putApp()),
                    currentRepoDate: new Date(this.state.currentRepoDate.setDate(this.state.currentRepoDate.getDate() - 30))
                  })); 
             }) **/
          const dataRepos= JSON.parse($.ajax({ type: "GET", url: fullUrlAPI, async: false, }).responseText);
           //  const dataRepos = JSON.parse(axios.get(fullUrlAPI));
        return dataRepos;   
  }
 
   UpdateStateComponent(){
       console.log("New API GitHup: "+this.state.FULL_URL_API);
       $(".btn-load-more").html("loading");
        axios.get("https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc")
        .then(res => {
             console.log(res);
             //this.state.resulatRepositories.concat(res.data.items);
             //document.write(res.data.items);
             const repositories = res.data;
             // this.setState(state =>{resulatRepositories: state.resulatRepositories.concat(repositories) });
         this.setState(state => ({
            //    currentRepoDate: new Date(this.state.currentRepoDate.setDate(this.state.currentRepoDate.getDate() - 30)),
                resulatRepositories: state.resulatRepositories.concat(this.putApp(null))
        }));
     })
     $(".btn-load-more").html("load more");
  }

    UpdateStateComponentByUserInterraction(){
      this.state.FULL_URL_API= this.generateFULL_URL_API();
      console.log("New api git hup: "+this.state.FULL_URL_API);
      $(".btn-load-more").html("loading");
         axios.get(this.state.FULL_URL_API)
         .then(res => {
              console.log(res.data);
              //this.state.resulatRepositories.concat(res.data.items);
              //document.write(res.data.items);
              const repositories = res.data;
              // this.setState(state =>{resulatRepositories: state.resulatRepositories.concat(repositories) });
              this.setState(state => ({
                resulatRepositories: state.resulatRepositories.concat(this.putApp(res.data.items)),
               //  currentRepoDate: new Date(this.state.currentRepoDate.setDate(this.state.currentRepoDate.getDate() - 30))
         
        }));
        //   window.scrollTo(0,document.body.scrollHeight);
        $(".btn-load-more").html("load more");
      })

    /* this.setState(state => ({
      resulatRepositories: state.resulatRepositories.concat(this.putApp()),
      currentRepoDate: new Date(this.state.currentRepoDate.setDate(this.state.currentRepoDate.getDate() - 30))
    })); **/
}

  render() {
    return (
      <div className="app" >
        <div className="container-fluid">
            <div className="warning-off-line-container">
                    <label className="warning-off-line">Please check your network</label>
            </div>
            <Repository respositoryies={this.state.resulatRepositories} />
             <form>
               <div className="btn-load-more-container"><label onClick={this.handleClick} className="btn-load-more" >Load more</label></div>
            </form>
        </div>
        <div className="container-fluid pop-up-container"></div>
      </div>
    );
  }

  handleClick(e) { 
      e.preventDefault();
      var obj= this;
      if(this.renderComponentoverTypeNetwork()){
        this.UpdateStateComponentByUserInterraction();
      }
      
      window.scrollTo(0,document.body.scrollHeight);
  }

}

export default App;


