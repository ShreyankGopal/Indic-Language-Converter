import axios from "axios";
import React, { useState, useEffect } from "react";
import Home from "./home";

function Setting() {
    const [language, setLanguage] = useState('');
    const [items, setItems] = useState([]);
    const [lang,setLang]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:5003/setting")
        .then((response)=>{
          console.log(response.data);
          setLang(response.data);
         
        })
        .catch((error)=>{
          console.error('Error fetching data:', error);
                if (error.response) {
                    // Server responded with a status other than 200 range
                    console.error('Error response:', error.response.data);
                    console.error('Error status:', error.response.status);
                    console.error('Error headers:', error.response.headers);
                }  else {
                    // Something happened in setting up the request
                    console.error('Error message:', error.message);
                }
        })
      });
    const postData = (language) => {
        console.log(language)
        axios.post("http://localhost:5003/setting", { "key": language })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleLanguageChange = (lang) => {
        return () => {
            setLanguage(lang);
            console.log(lang);
            postData(lang);
        };
    };

    return (
        <div>
            
            <p className="lead">
                {lang.choose}
            </p>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={handleLanguageChange("kn")} />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    ಕನ್ನಡ
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={handleLanguageChange("te")} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    తెలుగు
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onClick={handleLanguageChange("hi")} />
                <label className="form-check-label" htmlFor="flexRadioDefault3">
                    हिंदी
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" onClick={handleLanguageChange("en")} />
                <label className="form-check-label" htmlFor="flexRadioDefault4">
                    English
                </label>
            </div>
        </div>
    );
}

export default Setting;
