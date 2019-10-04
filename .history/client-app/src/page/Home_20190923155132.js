import React, { Component } from "react";
import {Carousel, Jumbotron} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CandidatePage extends Component {
    render(){
      return (
        <div>
          <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 slider"
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              alt="First slide"
            />
            <Carousel.Caption>
              <h1>HOME</h1>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 slider"
              src="https://images.unsplash.com/photo-1506701160839-34cfdecaf53c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h1>HOME</h1>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 slider"
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h1>HOME</h1>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        
        <div className="content">
        <div className="card-content">
          <div class="flip-card left-start">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img className="imgavt" src="https://images.unsplash.com/photo-1546538994-4f15d0aa966f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt="Avatar" style={{width: 200, height: 300}}/>
                  </div>
                <div class="flip-card-back">
                  <h1>John Doe</h1> 
                  <p>Architect & Engineer</p> 
                  <p>We love that guy</p>
                </div>
              </div>
            </div>
  
            <div class="flip-card right-start">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img className="imgavt" src="https://images.unsplash.com/photo-1546538994-4f15d0aa966f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt="Avatar" style={{width: 200, height: 300}}/>
                  </div>
                <div class="flip-card-back">
                  <h1>John Doe</h1> 
                  <p>Architect & Engineer</p> 
                  <p>We love that guy</p>
                </div>
              </div>
            </div>
            

                {/*--------------*/}

                <div class="container">
                    <div class="card">
                      <div class="card__image-container">
                        <img class="card__image" src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2126&q=80" alt=""/>
                      </div>
                        
                        <svg class="card__svg" viewBox="0 0 800 500">

                          <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333"/>
                          <path class="card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent"/>
                        </svg>
                      
                      <div class="card__content">
                        <h1 class="card__title">Lorem ipsum</h1>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta dolor praesentium at quod autem omnis, amet eaque unde perspiciatis adipisci possimus quam facere illo et quisquam quia earum nesciunt porro.</p>
                      </div>
                    </div>
                  </div>

                {/*------------------*/}

            </div>
        </div>
        </div>
        
        
      )
    }
  }