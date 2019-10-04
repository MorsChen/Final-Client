import React, { Component } from "react";
import { Carousel, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import Moment from 'react-moment';
import 'moment-timezone';

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
export default class Hone extends Component {
  constructor(props) {
    super(props);
    this.state = {...props, isLoaded : false, isUserinfo: true};
    console.log("check props home", this.props.users)
  }

  render() {
    
    // const u = this.state.users
    console.log('check events in users inside homepage', this.state.users)
    
    return (
      <div>
        <Carousel>
        {this.state.users.length  > 0 && this.state.users.map((u)=> {if ( u.events.length > 0 ){
              return <Carousel.Item>
              <img
                className="d-block w-100 slider"
                src={`${u.events[0].image_url}`}
                alt="First slide"
              />
              <Carousel.Caption>
                <h1>{u.events[0].title}</h1>
                <h3 className="text-h3-card">{u.events[0].description}</h3>
                <p>Owner : {u.events[0].username}</p>
                <p>Time Start : <Moment date={u.events[0].datetimestart}/></p>
              </Carousel.Caption>
            </Carousel.Item>
             }
             })}

         
        </Carousel>
      
        <Container className="content">
          <Row className="card-content justify-content-md-center">

          {this.state.users.length  > 0 && this.state.users.map((u)=> {if ( u.events.length > 0 ){
              return <div sm="{4}" class="flip-card col mt-1">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img className="imgcard"
                  src={`${u.events[0].image_url}`}
                  alt="Avatar" style={{width: "12rem", height: "19rem"}}/>
                </div>
                <div class="flip-card-back" >
                  <h1>{u.events[0].username}</h1>
                  <p>Architect & Engineer</p>
                  <p>We love that guy</p>
                </div>
              </div>
            </div>
              
             }
             })}
            
          </Row>
        </Container>
      
      
        {/* <Container>
          <Row className="card-tab justify-content-md-center">
            <div xs lg="2" class="card1 col m-2">
              <img src="http://www.pngmart.com/files/5/Pyramids-PNG-HD.png" alt="" />
              <h3 className="text-h3-card">Pyramids</h3>
              <p className="card-font">
                The Egyptian pyramids are ancient pyramid-shaped masonry structures
                located in Egypt. As of November 2008, sources cite either 118 or 138
                as the number of identified Egyptian pyramids.
              </p>
            </div>
      
            <div xs lg="2" class="card2 col m-2">
              <img
                src="https://wallazee.global.ssl.fastly.net/images/dynamic/items/383-1024.png"
                alt="Eiffel Tower"
              />
              <h3 className="text-h3-card">Statue of Liberty</h3>
              <p className="card-font">
                The Statue of Liberty is a colossal neoclassical sculpture on Liberty
                Island in New York Harbor in New York City, in the United States.
              </p>
            </div>
      
            <div xs lg="2" class="card3 col m-2">
              <img
                src="http://pluspng.com/img-png/download-taj-mahal-png-images-transparent-gallery-advertisement-1185.png"
                alt=""
              />
              <h3 className="text-h3-card">Taj Mahal</h3>
              <p className="card-font">
                The Taj Mahal is an ivory-white marble mausoleum on the south bank of
                the Yamuna river in the Indian city of Agra. It was commissioned in
                1632 by the Mughal emperor.
              </p>
            </div>
          </Row>
        </Container>
      
       */}
        {/* <div className="content">
            {this.state.users.length  > 0 && this.state.users.map((u)=> {if ( u.events.length > 0 ){
              return <p>{u.events[0].username}</p>
             }
             })}
            <p>
              The Egyptian pyramids are ancient pyramid-shaped masonry structures
              located in Egypt. As of November 2008, sources cite either 118 or 138 as
              the number of identified Egyptian pyramids.
            </p>
          <br />
            <p>
              The Egyptian pyramids are ancient pyramid-shaped masonry structures
              located in Egypt. As of November 2008, sources cite either 118 or 138 as
              the number of identified Egyptian pyramids.
            </p>
          <br />
        </div> */}
      </div>
    
        
    );
  }
}
