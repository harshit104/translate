import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Translate = () => {

    const [options, setOptions] = useState([]);
    const [toLang, setToLang] = useState("en");
    const [fromLang, setFromLang] = useState("en");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', fromLang);
    params.append('target', toLang);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    const translate = async () => {
        try {
            const reqVar = await axios.post('https://libretranslate.de/translate', params, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            console.log(reqVar);
            setOutput(reqVar.data.translatedText);
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        try {
            let getlang = async () => {
                let fetchLang = await axios.get('https://libretranslate.de/languages', { headers: { "Content-Type": "application/json" } });
                let resData = fetchLang.data;
                setOptions(resData);
            }

            getlang();
        } catch (e) {
            console.log(e)
        }

    }, [])


    return (
        <React.Fragment>
            <div className="TranslateAPiMain container" style={{ 'maxWidth': '1000px', 'margin': '0 auto' }}>

                <h2 className="text-center m-3">Translate Text</h2>
                <div className="row d-flex">
                    <div className="col-md-5 m-3">
                        <label className="input-group-text mb-2" htmlFor="inputGroupSelect02">From </label>
                        <select onChange={e => setFromLang(e.target.value)} className="form-select" id="inputGroupSelect02">
                            {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>
                            )}

                        </select>

                    </div>
                    <div className="col-md-5 m-3">
                        <label className="input-group-text mb-2" htmlFor="inputGroupSelect02">To </label>
                        <select onChange={e => setToLang(e.target.value)} className="form-select" id="inputGroupSelect02">
                            {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>
                            )}
                        </select>


                    </div>
                </div>
                <div className="row d-flex">
                    <div className="col-md-5 m-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Text</label>
                        <textarea onInput={e => setInput(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="8"></textarea>
                    </div>

                    <div className="col-md-5 m-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Translation</label>
                        <textarea defaultValue={output} className="form-control" id="exampleFormControlTextarea1" disabled rows="8"></textarea>
                    </div>
                </div>
                <div className="container row d-flex justify-content-center">
                    <button type="button" onClick={translate} className="checkBtn btn-outline-warning ">Check</button>
                </div>



            </div>
        </React.Fragment>
    )
}

export default Translate
