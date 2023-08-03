import './Footer.scss';

export const Footer = () => {
    return (

  <footer className="footer">
    <div className="footer__item">
      <h3>Kontakt:</h3>
      <p>Tel: +48 794 698 119</p>
      <p>E-mail: dmitrijkosow@gmail.com</p>
      <p>Adres: ul. Krakowska 123, 00-000 Kraków</p>
    </div>
    <div className="footer__item">
      <h3>O firmie:</h3>
      <p>Mojafirma.com to internetowy sklep, 
        który oferuje szeroki wybór wysokiej jakości 
        produktów w atrakcyjnych cenach. 
        Naszym celem jest zapewnienie naszym klientom najlepszych 
        zakupów online oraz doskonałej obsługi.</p>
    </div>
    <div className="footer__item">
      <h3>Polityka:</h3>
      <ul>
        <li><a href="#" >Wysyłka i dostawa</a></li>
        <li><a href="#" >Zwroty i reklamacje</a></li>
        <li><a href="#" >Polityka prywatności</a></li>
      </ul>
    </div>
  </footer>


    )
}