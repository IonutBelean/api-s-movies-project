import { Container } from "react-bootstrap";
import FooterCSS from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${FooterCSS.footer} footer`}>
      <Container>
        <p className="text-light text-center m-0 py-3">
          Movieland © 2022. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
