import React, {useEffect, useRef, useState} from 'react'
import { connect } from 'react-redux'
import "../../info_box.scss"
import "./reviews.css"
import { click1 } from '../../../../play_sounds/playVariousSfx'

interface IState {
   muteModeReducer: boolean,
}

const ReviewsPage: React.FC<IState> = ({muteModeReducer: isMuted}) => {

  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    setResult("");
    e.preventDefault();

    if (!name || !email || !subject || text?.length < 10) {
      setResult("Please, fill all fields, and make sure that the 'Text' field contains 10+ words");
      return null;
    }
    const data = { name, email, subject, text };
   fetch("http://127.0.0.1:3000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json?.message);
        setResult(`Result: ${json?.message}`);
      })
      .catch((error) => {
        console.log(error?.message);
        setResult(`Error: ${error?.message}`);
      });
  };
  
  useEffect(() => {
      nameRef.current.focus();
  }, []);

   return (
      <div className="infoBox">
         <div className="App">
            <h1>YOUR REVIEW GOES HERE!</h1>
            <form onSubmit={handleSubmit} className="form__container">
            <div className="form__controls">
               <label htmlFor="name">Name</label>
               <input
                  ref={nameRef}
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
            </div>
            <div className="form__controls">
               <label htmlFor="email">Email</label>
               <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div className="form__controls">
               <label htmlFor="subject">Subject</label>
               <input
                  id="subject"
                  className="input__subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
               />
            </div>
            <div className="form__controls">
               <label htmlFor="text">Text</label>
               <textarea
                  rows={5}
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
               />
            </div>
            <div className="form__controls">
               <button
               className={!name || !email || !subject || text?.length < 10 ? "button inactive" : "button"}
               disabled={!name || !email || !subject || text?.length < 10 ? true : false}
               onClick={() => isMuted ? click1.setVolume(0) : click1.play()}
               >Send</button>
            </div>
            </form>
            <p>{result}</p>
         </div>
      </div>
   )
}

const mapStateToProps = (state: IState) => {
      return {
            muteModeReducer: state.muteModeReducer,
      }
}

export default connect(mapStateToProps, null)(ReviewsPage);