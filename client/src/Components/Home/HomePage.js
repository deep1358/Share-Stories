/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useContext } from "react";
import { TimelineLite, Power3 } from "gsap";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "./HomePage.css";
import { AuthContext } from "../../Context/AuthContext";

function HomePage() {
	const authContext = useContext(AuthContext);
	let h1 = useRef(null);
	let p = useRef(null);
	let b = useRef(null);
	let txtcont = useRef(null);
	let imgh1 = useRef(null);
	let div1 = useRef(null);
	let div2 = useRef(null);
	let div3 = useRef(null);
	let div4 = useRef(null);
	let div5 = useRef(null);
	let div6 = useRef(null);

	let tl = new TimelineLite();

	useEffect(() => {
		Aos.init();

		if (!authContext.done) {
			// tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
			// tl.to(".slider", { y: "-100%", duration: 1, delay: 0.5 });
			// tl.to(".intro", { y: "-110%", duration: 1 }, "-=1.2");

			tl.to(imgh1, 2.2, { opacity: 0, ease: Power3.easeOut });
			tl.from(div1, 1.2, { y: -1400, ease: Power3.easeOut }, "row1");
			tl.from(div2, 1.2, { y: -1400, ease: Power3.easeOut }, "row1");
			tl.from(div3, 1.2, { x: 1400, ease: Power3.easeOut }, "row2");
			tl.from(div4, 1.2, { x: -1400, ease: Power3.easeOut }, "row2");
			tl.from(div5, 1.2, { y: 1400, ease: Power3.easeOut }, "row3");
			tl.from(div6, 1.2, { y: 1400, ease: Power3.easeOut }, "row3");

			tl.from(txtcont, 1.2, { y: 1050, ease: Power3.easeOut }, 0.5, "start")
				.from(h1, 3.2, { y: 250, ease: Power3.easeOut }, 1.5)
				.from(p, 1.2, { y: 400, ease: Power3.easeOut }, 1.4)
				.from(b, 1.2, { y: 400, ease: Power3.easeOut }, 1.8);
			authContext.setDone(true);
		}
		// } else {
		// 	document.getElementById("intro").style.display = "none";
		// 	document.getElementById("slider").style.display = "none";
		// 	document.getElementById("cat").style.display = "none";
		// }
	}, []);

	return (
		<>
			{/* <div id="intro" className="intro">
				<div className="intro-text">
					<h1 className="hide">
						<span className="text"> Creating Stories </span>
					</h1>
					<h1 className="hide">
						<span className="text"> For Everyday </span>
					</h1>
					<h1 className="hide">
						<span className="text"> People. </span>
					</h1>
				</div>
			</div>

			<div id="slider" className="slider"></div> */}

			<div className="homepage">
				{/* <img
					src="https://image.freepik.com/free-vector/white-background-with-triangle-patterns_1017-18410.jpg"
					alt=""
					className="back"
				/> */}

				<div className="homepage-text" ref={el => (txtcont = el)}>
					<div className="heading">
						<h1 ref={el => (h1 = el)}>Welcome To The Stories World</h1>
					</div>
					<div className="paragraph">
						<p ref={el => (p = el)}>
							Create Your Own Stories And Share With the World
						</p>
					</div>
					<div className="text-button" ref={el => (b = el)}>
						<p>Explore</p>
						<Link to="/stories">
							<img
								className="link-image"
								src="https://img.icons8.com/flat_round/2x/arrow.png"
								alt=""
							/>
						</Link>
					</div>
				</div>
				<div className="images">
					<h1 ref={el => (imgh1 = el)} id="cat">
						Catagories
					</h1>
					<div className="row1">
						<div ref={el => (div1 = el)} className="div1">
							<img
								src="https://freesvg.org/storage/img/thumb/1538023898.png"
								alt=""
							/>
							<p>Motivation</p>
						</div>
						<div ref={el => (div2 = el)} className="div2">
							<img
								src="https://freesvg.org/storage/img/thumb/pointing-boy-1.png"
								alt=""
							/>
							<p>Kid</p>
						</div>
					</div>
					<div className="row2">
						<div ref={el => (div3 = el)} className="div3">
							<img
								src="https://freesvg.org/storage/img/thumb/Education-Tree-Typography.png"
								alt=""
							/>
							<p style={{ position: "relative", bottom: "10px" }}>Life</p>
						</div>
						<div ref={el => (div4 = el)} className="div4">
							<img
								src="https://freesvg.org/storage/img/thumb/institution_icon.png"
								alt=""
							/>
							<p style={{ position: "relative", bottom: "10px" }}>Education</p>
						</div>
					</div>
					<div className="row3">
						<div ref={el => (div5 = el)} className="div5">
							<img
								src="https://freesvg.org/storage/img/thumb/love.png"
								alt=""
							/>
							<p>Love</p>
						</div>
						<div ref={el => (div6 = el)} className="div6">
							<img
								src="https://freesvg.org/storage/img/thumb/johnny_automatic_roman_coliseum.png"
								alt=""
							/>
							<p>History</p>
						</div>
					</div>
				</div>

				<div
					className="custom-shape-divider-bottom-1607231522 wave"
					style={{ zIndex: "101" }}>
					<svg
						data-name="Layer 1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1200 120"
						preserveAspectRatio="none">
						<path
							d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
							opacity=".25"
							className="shape-fill"></path>
						<path
							d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
							opacity=".5"
							className="shape-fill"></path>
						<path
							d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
							className="shape-fill"></path>
					</svg>
				</div>
			</div>
			{/* <div className="home-content">
				<div data-aos="fade-up" className="div">
					Hello
				</div>
				<div data-aos="zoom-in" className="div">
					Hello
				</div>
				<div data-aos="zoom-out" className="div">
					Hello
				</div>
				<div data-aos="fade-left" style={{ zIndex: "10000" }} className="div">
					Hello
				</div>
			</div> */}
		</>
	);
}

export default HomePage;

// let img1 = useRef(null);
// let img2 = useRef(null);
// let img3 = useRef(null);

{
	/* <div className="image1" ref={(el) => (img1 = el)}>
            <img
              src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
              alt=""
            />
          </div>
          <div className="image2" ref={(el) => (img2 = el)}>
            <img
              src="https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8YmxvZ2dlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="image3" ref={(el) => (img3 = el)}>
            <img
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8c3BlZWNofGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div> */
}

// .from(img1, 1.2, { x: 1400, ease: Power3.easeOut }, "start")
// .from(img1, 2, { scale: 1.6, ease: Power3.easeOut }, 1)
// .from(img3, 1.2, { x: 1400, ease: Power3.easeOut }, 5.2)
// .from(img3, 2, { scale: 1.6, ease: Power3.easeOut }, 1.2)
// .from(img2, 1.2, { x: 1400, ease: Power3.easeOut }, 4.2)
// .from(img2, 2, { scale: 1.6, ease: Power3.easeOut }, 2.2);
