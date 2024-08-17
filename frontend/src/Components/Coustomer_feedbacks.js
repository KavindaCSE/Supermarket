import axios from "axios";
import React, { useState } from "react";
import './Feedback.css';  // Create a new CSS file for the styles
import { useParams } from "react-router-dom";

function Feedback(){
    let {id} = useParams()
    let [feedback, setfeedback] = useState({"feedback": "", "product_id": id});

    let handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:8000/predictReview', feedback);
        window.location = `/feedback/${feedback["product_id"]}`
    }

    let handleChange = (e) => {
        let updatedFeedback = { ...feedback };
        updatedFeedback[e.currentTarget.name] = e.currentTarget.value;
        setfeedback(updatedFeedback);
    }

    return (
        <div className="feedback-container">
            {<form onSubmit={handleSubmit} className="feedback-form">
                <div className="form-group">
                    <label htmlFor="Feedback"><strong>Feedback</strong></label>
                    <input 
                        type="text" 
                        value={feedback.feedback}
                        onChange={handleChange}
                        className="form-control" 
                        id="Feedback" 
                        name="feedback"
                    />
                    {feedback.feedback && 
                        <button type="submit" className="btn btn-primary">Submit</button>
                    }
                </div>
            </form>}
        </div>
    );
}

export default Feedback;
