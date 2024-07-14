import React from 'react';
import './Footer.css'; 

function Footer() {
    return (
        <footer>
            <ul className="footer-list">
                <li><u><a href="mailto:hudson@kass.net">hudson@kass.net</a></u></li>
                <li className="separator">•</li>
                <li>{new Date().getFullYear()}</li>
            </ul>
        </footer>
    );
}

export default Footer;
