import Footer from "./Footer";

const About : React.FC = ()=>{

    return(
        <>
        <div className="h-auto min-h-screen ">
            {/* page 1 */}
            <div id="about-1">
                <h2 className="text-5xl font-bold text-center">Reimagining real estate</h2>
                <p className="text-gray-500 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat consectetur veniam excepturi debitis tenetur. Reprehenderit tenetur sequi vel repellat quis. Molestiae qui nihil a blanditiis, commodi ipsum illo magni perspiciatis!</p>
                <div className=" max-w-[1500px] flex-wrap flex gap-10  mx-auto" id="collage1">
                    <img className="w-[700px] rounded-lg" src="https://media.istockphoto.com/id/1320991884/photo/aerial-view-of-residential-distratic-at-major-mackenzie-dr-and-islinton-ave-detached-and.jpg?s=612x612&w=0&k=20&c=KY59fkCfg9zz9LkQRCRDn84j9xcNdG7NSgZ3jGJC81A=" alt="sky-view-homes" />
                    <img className="max-w-[400px] rounded-lg" src="https://www.janetbarrcfs.com/sites/default/files/users/janetbarr/real%20estate.jpg" alt="hand-house" />
                    <img className="max-w-[400px] rounded-lg" src="https://www.vidyard.com/media/real-estate-video-marketing-1920x1080-1.jpg" alt="keys" />
                    <img className="max-w-[610px] rounded-lg" src="https://www.marthastewart.com/thmb/lxfu2-95SWCS0jwciHs1mkbsGUM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/modern-living-rooms-wb-1-bc45b0dc70e541f0ba40364ae6bd8421.jpg" alt="living room" />
                </div>
            </div>

        </div>
        <Footer />
        </>
    );
}

export default About;