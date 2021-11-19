import React, {useEffect} from "react";
import "./about.css";
import about_0 from "../../Images/about_0.png"
import about_1 from "../../Images/about_1.png"
import about_2 from "../../Images/about_2.png"
import {useBreadcrumbContext} from "../../BreadcrumbContext";


function About() {
    const {setBreadcrumb} = useBreadcrumbContext();
    useEffect(() => {
        setBreadcrumb("ABOUT US", [{text: "SHOP", href: "/shop"}, {text: "ABOUT US"}]);
    }, [])
    return (
        <div className="container-wrapper">
            <div className="about-container">
                <div id="about-grid">
                    <div className="about-grid-item">
                        <h3>About us</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in
                            eleifend mi laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu
                            magna. In convallis diam volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis
                            lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget laoreet quam
                            molestie. In id elementum turpis. Curabitur quis tincidunt mauris.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in
                            eleifend mi laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu
                            magna. In convallis diam volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis
                            lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget laoreet quam
                            molestie. In id elementum turpis. Curabitur quis tincidunt mauris.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in
                            eleifend mi laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu
                            magna. In convallis diam volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis
                            lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget laoreet quam
                            molestie. In id elementum turpis. Curabitur quis tincidunt mauris.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in
                            eleifend mi laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu
                            magna. In convallis diam volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis
                            lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget laoreet quam
                            molestie. In id elementum turpis. Curabitur quis tincidunt mauris.
                        </p>
                    </div>
                    <div className="about-grid-item">
                        <div id="large-image"><img src={about_0} alt=""/></div>
                        <div>
                            <img id="small-image" src={about_1} alt=""/>
                            <img id="small-image" src={about_2} alt=""/>
                            <div/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
