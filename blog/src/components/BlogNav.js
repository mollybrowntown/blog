import React, {Component} from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from './BlogNav.module.css'
class BlogNav extends Component{
render(){
  return(
    <Navbar collapseOnSelect className={styles.navbar} expand="lg" variant="dark" fixed="top" style={{paddingTop:'5px',paddingLeft:'5px',paddingBottom:'1px'}}>
      <Navbar.Brand href="https://www.coloradomollybrown.com/" style={{color:'white', fontSize:'1.5em'}}>
      <img
      alt=""
      src="/logo.png"
      width="15"
      height="35"
      className="d-inline-block align-top"
    />{' '}
    MOLLY BROWN ULTIMATE</Navbar.Brand>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav activeKey="" className="ml-auto">

      </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
};

export default BlogNav;
