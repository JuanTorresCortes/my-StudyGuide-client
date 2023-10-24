import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {addCompletedTest} from '../Api/api'
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Paper, Button } from '@mui/material';

const ScanTron = ({testKey, testTopic, _id}) => {
  const [keyArr, setKeyArr] = useState([]);
  const [testLength, setTestLength] = useState(40);
  const [onChangeAnswers, setOnChangeAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [score, setScore] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    const setUp = async () => {
        if (testKey) {
            let keyData = testKey.data.key;
            let keyLength = keyData.length;

            setKeyArr(keyData);
            setTestLength(keyLength);
        }
    }
    setUp();
}, [testKey]);

  const handleRadioChange = (question, event) => {
    setOnChangeAnswers({
      ...onChangeAnswers,
      [question]: event.target.value
    });
  };

  const handleSubmit = async () => {
    const answersArray = Array.from({ length: testLength }, (_, index) => onChangeAnswers[`question${index + 1}`] || '');
    setSubmittedAnswers(answersArray);
  
    // Calculate score
    let count = 0;
    for (let i = 0; i < keyArr.length; i++) {
        if (keyArr[i] === answersArray[i]) {
            count++;
        }
    }
    const equation = 100/testLength * count;
    setScore(equation.toString());  // Convert score to string if your schema requires it

    // Create an object based on the Mongoose schema
    const completedTest = {
        testTopic, 
        score: equation.toString()  // Use the calculated score directly and convert to string
    };

    try {
        const response = await addCompletedTest(_id, completedTest);
        if (response.success === true) {
            setKeyArr([]);
            setOnChangeAnswers({});
            setSubmittedAnswers([]);
            setScore('');  // Reset score to an empty string
            navigate("/archive");
        }
    } catch (error) {
        console.log(error);
    }
};

  const oddOptions = ['A', 'B', 'C', 'D'];
  const evenOptions = ['F', 'G', 'H', 'J'];


  return (
    <Paper style={{ maxWidth:'100%', maxHeight: '60vh', overflowY: 'auto' }}  className='dev-border'>
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
                value={onChangeAnswers[`question${questionNumber}`] || ''}
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
