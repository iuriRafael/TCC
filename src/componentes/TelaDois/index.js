import React from "react";
import Navbar from "../navbar";
import './mapa.css';
function TelaDois(){
    return (

        <div id="dois">
            tela 2
            <iframe
                className="mapa"
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23342.378262362385!2d-50.79132656617006!3d-29.578522614773664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951923a90fb5284b%3A0xf1d1e1db8e3dfa4c!2sHospital%20Bom%20Pastor!5e0!3m2!1spt-BR!2sbr!4v1687547833477!5m2!1spt-BR!2sbr"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <Navbar />
        </div>


    );

}
export default TelaDois ;