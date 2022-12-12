import React, { Component } from "react";
import { CarouselData } from "./CarouselData";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentSlide: 0,
        paused: false,
      };
  }

  render() {
    return (
      <div className="mt-8">
        <div className="max-w-lg h-72 flex overflow-hidden relative">
          {CarouselData.map((slide, index) => {
            return (
              <a href={slide.url} target="_blank" rel="noopener noreferrer">
                <img
                    onMouseEnter={() => {
                     this.setState({paused: true})
                    }}

                    onMouseLeave={() => {
                    this.setState({paused: false})
                     }}
                     src={slide.image}
                     alt="This is a carousel slide"
                     key={index}
                     className={
                     index === this.state.currentSlide
                     ? "block w-full h-auto object-contain"
                     : "hidden"
                     }
                      style={{
                       maxWidth: "100%",
                       maxHeight: "100%"
                       }}
/>
              </a>
            );
          })}

          <div className="absolute w-full flex justify-center bottom-0">
            {CarouselData.map((element, index) => {
              return (
                <div
                  className={
                    index === this.state.currentSlide
                      ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                      : "h-2 w-2 bg-black rounded-full mx-2 mb-2 cursor-pointer"
                  }
                  key={index}
                  onClick={() => {
                    this.setCurrentSlide(index);
        }}
      ></div>
    );
  })}
</div>


          <AiOutlineLeft onClick={this.prevSlide} className='absolute left-0 text-3xl inset-y-1/2 text-blue cursor-pointer' />

          <AiOutlineRight onClick={this.nextSlide} className='absolute right-0 text-3xl inset-y-1/2 text-blue cursor-pointer' />
        </div>
      </div>
    );
  }
  nextSlide = () => {
    let newSlide =
      this.state.currentSlide === CarouselData.length - 1
        ? 0
        : this.state.currentSlide + 1;
    this.setState({ currentSlide: newSlide });
  };
  
  prevSlide = () => {
    let newSlide =
      this.state.currentSlide === 0
        ? CarouselData.length - 1
        : this.state.currentSlide - 1;
    this.setState({ currentSlide: newSlide });
  };

  setCurrentSlide = (index) => {
    this.setState({ currentSlide: index });
  };

  componentDidMount(){
    setInterval(() => {
      if(this.state.paused === false){
        let newSlide = this.state.currentSlide === CarouselData.length - 1 ? 0 : this.state.currentSlide + 1
        this.setState({currentSlide: newSlide})
      }
    }, 3000)
    
  }
}

export default Carousel;