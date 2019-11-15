import React, { Component } from 'react';
import HeaderBertasbih from './components/HeaderBertasbih';
import HomeBertasbih from './components/HomeBertasbih';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';
import { keepLogin, cookieChecked } from './actions';
// import axios from 'axios';

const cookies = new Cookies();

class App extends Component {
  state = { content: 'Ini Content' }

  componentDidMount() {
    const username = cookies.get('Ferguso');
    if(username !== undefined) {
        this.props.keepLogin(username);
    }else{
      this.props.cookieChecked();
    }
  }

  onBtnOKClick = () => {
    this.setState({ content: 'Ini Comberan' })
  }

  render() {
    if(this.props.cookie){
      return (
        <div>
          <HeaderBertasbih navBrand={"Kacrut"} />
          <div>
            <Route exact path="/" component={HomeBertasbih} />
          </div>
        </div>
      ); 
    }

    return (
      <div>
          <center><h1>Loading...</h1></center>
      </div>
    );
    
  }
}

const mapStateToProps = (state) => {
  return { cookie: state.auth.cookie }
}

export default withRouter(connect(mapStateToProps, { keepLogin, cookieChecked })(App));