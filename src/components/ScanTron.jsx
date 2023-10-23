import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Paper, Button } from '@mui/material';

const ScanTron = ({testKey}) => {
  const [answerKey, setAnswerKey] = useState(null);
  const [testLength, setTestLength] = useState(30)
  const [answers, setAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState([]);

  const navigate = useNavigate();

  const handleRadioChange = (question, event) => {
    setAnswers({
      ...answers,
      [question]: event.target.value
    });
    
  };

  const handleSubmit = () => {
    // Convert answers object into an array
    const answersArray = Array.from({ length: testLength }, (_, index) => answers[`question${index + 1}`] || '');
    setSubmittedAnswers(answersArray);
    console.log(submittedAnswers)
  };

  // _id: { type: String, default: uuid },
  // testTopic: { type: String, required: true },
  // owner: { type: String, ref: "user", required: true },
  // score: { type: String, required: true },
  // createdAT: { type: Date, default: Date.now },

  const oddOptions = ['A', 'B', 'C', 'D'];
  const evenOptions = ['F', 'G', 'H', 'J'];

  return (
    // style={{ padding: '20px', maxWidth: '400px', margin: '20px auto' }}
    <Paper style={{  maxWidth:'100%', maxHeight: '60vh', overflowY: 'auto' }}  className='dev-border'>
      <h3>ScanTron</h3>
      {Array.from({ length: testLength }).map((_, index) => {
        const questionNumber = index + 1;
        return (
          <div key={questionNumber}>
            <FormControl component="fieldset" style={{ marginBottom: '15px' }}>
              <FormLabel component="legend">Question {questionNumber}</FormLabel>
              <RadioGroup
                row
                name={`question${questionNumber}`}
                value={answers[`question${questionNumber}`] || ''}
                onChange={(e) => handleRadioChange(`question${questionNumber}`, e)}
              >
                {(questionNumber % 2 === 1 ? oddOptions : evenOptions).map((option) => (
                  <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
            </FormControl>
            {index !== testLength - 1 && <hr />} {/* Only add <hr> if it's not the last question */}
          </div>
        );
      })}
      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
    </Paper>
  );
}

export default ScanTron;
