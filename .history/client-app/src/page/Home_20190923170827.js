import React, { Component } from "react";
import { Carousel, Jumbotron } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class CandidatePage extends Component {
  render() {
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
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div className="content">
          <div className="card-content">
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img
                    className="imgavt"
                    src="https://images.unsplash.com/photo-1546538994-4f15d0aa966f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                    alt="Avatar"
                    style={{ width: 200, height: 300 }}
                  />
                </div>
                <div class="flip-card-back">
                  <h1>John Doe</h1>
                  <p>Architect & Engineer</p>
                  <p>We love that guy</p>
                </div>
              </div>
            </div>

            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img
                    className="imgavt"
                    src="https://images.unsplash.com/photo-1546538994-4f15d0aa966f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                    alt="Avatar"
                    style={{ width: 200, height: 300 }}
                  />
                </div>
                <div class="flip-card-back">
                  <h1>John Doe</h1>
                  <p>Architect & Engineer</p>
                  <p>We love that guy</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-tab">
            <div class="card1">
              <img
                src="http://www.pngmart.com/files/5/Pyramids-PNG-HD.png"
                alt=""
              />
              <h3>Pyramids</h3>
              <p className="card-font">
                The Egyptian pyramids are ancient pyramid-shaped masonry
                structures located in Egypt. As of November 2008, sources cite
                either 118 or 138 as the number of identified Egyptian pyramids.
              </p>
            </div>

            <div class="card2">
              <img
                src="https://wallazee.global.ssl.fastly.net/images/dynamic/items/383-1024.png"
                alt="Eiffel Tower"
              />
              <h3>Statue of Liberty</h3>
              <p className="card-font">
                The Statue of Liberty is a colossal neoclassical sculpture on
                Liberty Island in New York Harbor in New York City, in the
                United States.
              </p>
            </div>

            <div class="card3">
              <img
                src="http://pluspng.com/img-png/download-taj-mahal-png-images-transparent-gallery-advertisement-1185.png"
                alt=""
              />
              <h3>Taj Mahal</h3>
              <p className="card-font">
                The Taj Mahal is an ivory-white marble mausoleum on the south
                bank of the Yamuna river in the Indian city of Agra. It was
                commissioned in 1632 by the Mughal emperor.
              </p>
            </div>
            
          </div>

          <div className="test-div">
            <p>
              The Egyptian pyramids are ancient pyramid-shaped masonry
              structures located in Egypt. As of November 2008, sources cite
              either 118 or 138 as the number of identified Egyptian pyramids.
            </p>
            <br />
            <p>
              The Egyptian pyramids are ancient pyramid-shaped masonry
              structures located in Egypt. As of November 2008, sources cite
              either 118 or 138 as the number of identified Egyptian pyramids.
            </p>
            <br />
          </div>
        </div>
        
      </div>
    );
  }
}
