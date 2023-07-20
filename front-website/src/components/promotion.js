// import React from 'react';
import React, { useEffect } from 'react';
// import 'react-owl-carousel';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import $ from 'jquery';
// import 'owl.carousel/dist/owl.carousel.min.js';
// import 'owl.carousel/dist/assets/owl.carousel.min.css';
// import 'owl.carousel/dist/assets/owl.theme.default.min.css';
// import 'react-owl-carousel/src/owl.carousel.css';
// import './custom.css'; // Your custom CSS file

const Promotion = () => {  
    // useEffect(() => {
    //     // Code to run when the component is mounted
    //     // Get the necessary elements using React refs
    //     const arrowLeft = document.querySelector(".arrow-left");
    //     const arrowRight = document.querySelector(".arrow-right");
    //     const tabList = document.querySelector("#taj_home_sports_list");
    //     const navItems = document.querySelectorAll(".nav-item");
    //     const itemWidth = navItems[0].offsetWidth;
    //     const containerWidth = tabList.parentElement.offsetWidth;
    //     const visibleItems = Math.floor(containerWidth / itemWidth);
    //     let currentPosition = 0;
    //     const maxScrollPosition = Math.max(0, navItems.length - visibleItems);
    
    //     // Function to handle slide left
    //     function slideLeft() {
    //       if (currentPosition > 0) {
    //         currentPosition--;
    //         slideToCurrent();
    //       }
    //     }
    
    //     // Function to handle slide right
    //     function slideRight() {
    //       if (currentPosition < maxScrollPosition) {
    //         currentPosition++;
    //         slideToCurrent();
    //       } else {
    //         currentPosition = 0; // Loop back to the first item
    //         slideToCurrent();
    //       }
    //     }
    
    //     // Function to slide to the current position
    //     function slideToCurrent() {
    //       const scrollAmount = currentPosition * itemWidth;
    //       tabList.style.transform = `translateX(-${scrollAmount}px)`;
    //     }
    
    //     // Add event listeners to arrow tabs
    //     arrowLeft.addEventListener("click", slideLeft);
    //     arrowRight.addEventListener("click", slideRight);
    
    //     // Clean up: Remove event listeners when the component is unmounted
    //     return () => {
    //       arrowLeft.removeEventListener("click", slideLeft);
    //       arrowRight.removeEventListener("click", slideRight);
    //     };
    //   }, []);
  return (
    <></>
    // <>
    // <OwlCarousel
    //     className="owl-carousel owl-theme"
    //     loop
    //     margin={10}
    //     nav={false}
    //     dots={false}
    //     autoplay
    //     autoplayTimeout={10000}
    //     autoplayHoverPause
    //     responsive={{
    //       0: {
    //         items: 1,
    //       },
    //       600: {
    //         items: 1,
    //       },
    //     }}
    //   >
    //    <img src="images/promotion-banner1.png"/>
    //   </OwlCarousel>
    //   </>
 

  );
};

export default Promotion;