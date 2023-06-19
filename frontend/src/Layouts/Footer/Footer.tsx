import { Link } from 'react-router-dom';
import SimpleMap from '../../components/MyMap';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
    <div className="footer-container">
      <div className="footer-column">
        <h3>Menu</h3>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to=''>Men</Link></li>
          <li><Link to=''>Women</Link></li>
          <li><Link to=''>Collections</Link></li>
          <li><a href="#">Contacts</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>Help</h3>
        <ul>
          <li>FAQs</li>
          <li>Return Policy</li>
          <li>Terms of Use</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>Visit Us</h3>
        <ul>
          <li>Hanrapetutyun str.,</li>
          <li>Erevan, Armenia</li>
          <li>(374) 96 100 939</li>
          <li>info@-eyewear.com</li>
          <li>Monday - Sunday, 10:00-19:00</li>
        </ul>
      </div>
      <SimpleMap />
    </div><hr />
      <div className="footer-end">
       
        <p>Powered by Shopify © 2023</p>
      </div>
  </footer>
  
  )
}

export default Footer