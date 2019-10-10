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
      <div className="FullContent">
        <div className="container1">
          <div className='home-content'>
          <h1 className="home-title">ART NOTE</h1>
          <div clasName="des-containner">
            <h5 className="home-description">Training for individuals or research and development companies specializing in Digital Art, Illustration and Concept Art.
            Provides lessons and quality training from teachers with years of experience in the art of Game and Film.
            </h5>
          </div>
          </div>
        </div>

        <div className="container2">
            <div className="ctn2-content">
              <h5 className="ctn2-title">INTRODUCTION</h5>
              <div className="ctn2-body">
                <h7>Currently, Digital Art, Illustration and Concept Art are one of the dynamic creative groups in Vietnam as well as in the world. Few will think that their daily job is to draw and create fantasy characters and landscapes for Games, Book Illustrations and Movies. But that is the main work of Concept Artists, Ilustration Artists and Digital Artists - those who bring soul into entertainment products.</h7><br/>
                <h7>Art Note was born with the goal of being a class specializing in Concept Art, Illustration and Digital Art training to introduce and orient the industry, improving both quantity and quality for future artists. Or simply, it helps you to firmly pursue your passion for drawing for Games, Illustrations and Movies. We are just a small class, what we bring to you is the knowledge and skills to get ready for the job, we do not award any courses.</h7>
              </div>
            </div>
            <div className="ctn2-content2">
              <div className="ctn2-secsion">
              <h5 className="ctn2-title">COURSE PROGRAM</h5>
              <div className="ctn2-body2">
                <h7>Art Note is one of the first classes in Saigon to teach Digital Art and Concept Art, and each course will only take a maximum of ten friends. Because our goal is to guide carefully, depending on your ability to help develop drawing and design skills for each student.</h7>
              </div>
              </div>
              <div className="ctn2-secsion">
              <h5 className="ctn2-title">KNOWLEDGE</h5>
              <div className="ctn2-body2">
                <h7>The curriculum is compiled based on the knowledge and materials from the famous drawing and design training schools in the world. Help you master the background knowledge, drawing skills, improve eye aesthetics, design thinking as well as teamwork.</h7>
              </div>
              </div>
            </div>
            <div className="ctn2-content2">
              <div className="ctn2-secsion">
              <h5 className="ctn2-title">STUDY ENVIRONMENT</h5>
              <div className="ctn2-body2">
                <h7>The teachers are experienced, happy and open-minded. Classroom atmosphere is always comfortable, friendly and high learning spirit.
                    After school, students can study together on Art Note and participate in extracurricular activities organized by Art Note.</h7>
              </div>
              </div>
              <div className="ctn2-secsion">
              <h5 className="ctn2-title">VOCATION</h5>
              <div className="ctn2-body2">
                <h7>The study program is close to the real job. Students before and after studying are consulted carefully to have career orientation appropriate to their interests. Many of you have found the job you want and apply your knowledge to the job.</h7>
              </div>
              </div>
            </div>
        </div>

        <div className="container3">
        <div className="bgimg">
          <div className="transbox">
            <h3 className="contact">CONTACT</h3>
            <div>

            </div>
            <div className="contact-adds">
              <h5 className='contact-info'>Phone:  0932.671.486</h5>
              <h5 className='contact-info'>Art Note - Workshop, 380 Le Trong Tan</h5>
              <h5 className='contact-info'>Ward 21, Tan Phu District, Ho Chi Minh City</h5>
                
            </div>
          </div>
        </div>
          <div className="bggif">

          </div>
          
        </div>
        <div>

        </div>
        


        {/* <Carousel>
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

         
        </Carousel> */}
      
        {/* <Container className="content">
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
        </Container> */}
      
      
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
