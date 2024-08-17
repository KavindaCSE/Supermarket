import axios from "axios";
import React, { useState } from "react";
import background from '../Components/assets/feedback_background.jpg'

function Feedback(){
    let [feedback,setfeedback] = useState({"feedback":"","product_id":-1})

    let handleSumbit = async(e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:8000/predictReview',feedback)
    }

    let handleChange = (e) => {
        let updatedFeedback = {...feedback}
        updatedFeedback[e.currentTarget.name] = e.currentTarget.value
        setfeedback(updatedFeedback)

    }

    return (
        <form onSubmit={handleSumbit}>
            <div className="form-group">
                <label htmlFor="Feedback">Feedback</label>
                <input 
                    type="text" 
                    value={feedback.feedback}
                    onChange={handleChange}
                    className="form-control" 
                    id="Feedback" 
                    name="feedback"/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default Feedback;