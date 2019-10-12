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
  }
  componentDidMount(){
    this.getStudios()
    }

    getStudios = async() => {
        const resp = await fetch(`${URLB}infos/`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.info === null){
                this.setState({isInfoInfo: false})}
            else{this.setState({ info: data.info, studio: data.studio,
                isLoaded: true,
            });
        }
        }
    }

  render() {
    return (
      <div>
        {this.state.info && this.state.info.map( e=>{ 
                return (
                <div className="FullContent">
                    <div className="info-bg" style={{backgroundImage: `url(${e.image_studio})`, backgroundPosition:'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                        <div className='home-content'>
                            <h1 className="home-title">{e.studio}</h1>
                            <div clasName="des-containner">
                                <h5 className="home-description">{e.description}
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="container2">
                        <div className="ctn2-content">
                            <h5 className="ctn2-title">INTRODUCTION</h5>
                            <div className="ctn2-body">
                            <h7>{e.intro}</h7>
                            </div>
                        </div>
                        <div className="ctn2-content2">
                            <div className="ctn2-secsion">
                            <h5 className="ctn2-title">COURSE PROGRAM</h5>
                            <div className="ctn2-body2">
                            <h7>{e.courseprog}</h7>
                            </div>
                            </div>
                            <div className="ctn2-secsion">
                            <h5 className="ctn2-title">KNOWLEDGE</h5>
                            <div className="ctn2-body2">
                            <h7>{e.knowledge}</h7>
                            </div>
                            </div>
                        </div>
                        <div className="ctn2-content2">
                            <div className="ctn2-secsion">
                            <h5 className="ctn2-title">STUDY ENVIRONMENT</h5>
                            <div className="ctn2-body2">
                            <h7>{e.stenv}</h7>
                            </div>
                            </div>
                            <div className="ctn2-secsion">
                            <h5 className="ctn2-title">VOCATION</h5>
                            <div className="ctn2-body2">
                            <h7>{e.vocation}</h7>
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
                </div>
                
                )})}
             

        
       
        


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
