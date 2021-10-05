import React from "react";

const Footer = () => {
  return (
    <footer className="footer float-left fixed-bottom navbar navbar-dark bg-dark col-md-9 ml-md-auto col-lg-10 px-2 py-1 shadow">
      <div className="copyright">
        <span className="fa fa-copyright m-1" />
        کلیه حقوق این سایت متعلق به شرکت به پرداخت ملت می باشد.
      </div>
      <a
        className="d-none d-md-block"
        href="http://www.bpmellat.ir/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="logo mr-2"></div>
      </a>
    </footer>
  );
};

export default Footer;
