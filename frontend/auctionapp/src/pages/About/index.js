import React from "react";
import "./about.css";


function About() {

    return (
        <div className="container-wrapper">
            <div className="about-container">
                <div id="about-grid">
                    <div className="about-grid-item">
                        <h3>About us</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque diam nisi, imperdiet
                            quis
                            eros a, laoreet hendrerit lacus. Aliquam et neque nec enim sagittis sodales. Sed facilisis
                            et
                            odio ut feugiat. In efficitur velit orci, ut tincidunt quam pharetra eget. Aliquam non ipsum
                            in
                            nisl suscipit viverra. Integer euismod tincidunt pulvinar. Nullam tortor tellus,
                            sollicitudin ut
                            vehicula venenatis, iaculis a ante. Vestibulum rhoncus nulla eu consectetur viverra.
                            Phasellus
                            accumsan malesuada arcu. Nulla venenatis porta eros, nec vehicula turpis consequat id.
                            Vivamus
                            in lorem sed libero porta sagittis in eget nulla. Nullam id nibh sed justo viverra egestas a
                            quis ex.
                        </p>
                        <p>
                            Nulla facilisi. Praesent ac blandit nunc. Etiam in malesuada nunc. Ut pellentesque sem id
                            purus
                            maximus tristique. Curabitur cursus gravida odio. Phasellus commodo laoreet velit ut
                            iaculis.
                            Fusce leo enim, posuere sed nunc eget, pellentesque porta dolor.
                        </p>
                        <p>
                            Suspendisse in accumsan ligula. Vestibulum ante ipsum primis in faucibus orci luctus et
                            ultrices
                            posuere cubilia curae; Nam eget nulla est. Aliquam aliquet auctor tellus, sed eleifend
                            mauris
                            porta nec. Fusce vulputate suscipit risus sit amet tempus. Praesent imperdiet eleifend
                            finibus.
                            Sed hendrerit pulvinar pharetra. Curabitur sodales purus in molestie efficitur. Aliquam
                            vitae
                            nulla ipsum. Donec vel ante felis. Donec pulvinar tempus diam eu ornare. Nullam interdum,
                            lectus
                            eu placerat tincidunt, mauris nunc rhoncus tortor, porta volutpat felis ligula non enim.
                        </p>
                        <p>
                            Cras at mi nisi. Mauris non ante sapien. Duis sit amet luctus justo. Nam mattis, eros in
                            venenatis maximus, velit tortor fermentum arcu, eget pharetra velit massa eget velit. Donec
                            in
                            enim ut erat efficitur ornare. Aliquam lacinia ullamcorper libero nec faucibus. Duis in
                            ullamcorper nulla. Fusce sodales mollis nisl, quis vestibulum leo fermentum quis. Maecenas
                            mattis et purus sit amet cursus. Phasellus in convallis purus. Maecenas imperdiet malesuada
                            quam
                            cursus tempor. Nam lacinia malesuada ipsum, quis laoreet massa rhoncus sed. Suspendisse vel
                            augue ullamcorper, mollis dui ac, malesuada massa. Nulla facilisi. Duis at tempor justo, nec
                            placerat neque.
                        </p>
                    </div>
                    <div className="about-grid-item">
                        <div id="large-image"><img src="/images/about_0.png" alt="large-image"/></div>
                        <div>
                            <img id="small-image" src="/images/about_1.png" alt="small-image-1"/>
                            <img id="small-image" src="/images/about_2.png" alt="small-image-2"/>
                            <div/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
