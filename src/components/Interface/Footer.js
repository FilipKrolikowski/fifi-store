import "./Footer.scss";

const footerStructure = [
  {
    name: "Informacje o sklepie",
    children: ["Fifi", "Poland", "filip.krolikowski8@gmail.com"],
  },
  {
    name: "Produkty",
    children: ["Bluzy", "Spodnie", "T-shirt", "Swetry", "Sukienki"],
  },
  {
    name: "Twoje konto",
    children: ["Dane osobowe", "Zamówienia", "Adresy", "Kupony", "Powiadomienia"],
  },
];

function Footer() {
  return (
    <div className="footer pt-5">
      <div className="row mx-auto">
        {footerStructure.map((el) => (
          <div key={el.name} className="col-12 col-md d-flex justify-content-center">
            <div className="col-container text-center text-md-start my-2 my-md-0">
              <div className="footer-title mb-4">{el.name}</div>
              <div>
                {el.children.map((child) => (
                  <div key={child} className="footer-text my-2 pointer">
                    {child}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="all-rights-reserved text-center mt-3 pt-3 mx-5">© 2021 Fifi. All rights reserved.</div>
    </div>
  );
}

export default Footer;
