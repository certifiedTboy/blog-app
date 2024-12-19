import { Link } from "react-router-dom";
import heroImage from "../../assets/blog-image.png";
import styles from "./Home.module.css";
const Hero = () => {
  return (
    <section className={`container ${styles.hero_container}`}>
      <div className="row">
        <div className="col-md-6 mb-5">
          <img src={heroImage} className={styles.hero_image} />
        </div>
        <div className="col-md-6">
          <div>
            <h3>About Us</h3>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure
            eius earum ut molestias architecto voluptate aliquam nihil, eveniet
            aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            natus, earum, numquam quia laudantium nemo perspiciatis est
            blanditiis dolore eveniet quisquam expedita corrupti, sequi dolores!
            Odio commodi repellat harum soluta!
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            natus, earum, numquam quia laudantium nemo perspiciatis est
          </p>

          <div>
            <Link className={`btn  ${styles.about_btn}`} to={"/about"}>
              Read More...
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
