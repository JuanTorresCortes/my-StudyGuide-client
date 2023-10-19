import React,{useState} from 'react'
import { Button, TextField, Container, Typography } from '@mui/material';
import { uploadTest } from '../Api/api';

const TestUpLoadForm = () => {
    const [file, setFile] = useState(null);
    const [testTopic, setTestTopic] = useState("");
    const [description, setDescription] = useState("");
    const [answerKey, setAnswerKey] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const testData = {
            file,
            testTopic,
            description,
            answerKey,
        }

        const result = await uploadTest(testData);

        if(result) {
            setFile("");
            setTestTopic("");
            setDescription("");
            setAnswerKey([]);
        }

    };
  return (

    <Container>
            <Typography variant="h4">Upload Test</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Test Topic" fullWidth onChange={e => setTestTopic(e.target.value)} />
                <TextField label="Description" fullWidth onChange={e => setDescription(e.target.value)} />
                <TextField label="Answer Key (comma separated)" fullWidth onChange={e => setAnswerKey(e.target.value)} />
                <input type="file" onChange={e => setFile(e.target.files[0])} />
                <Button type="submit" variant="contained" color="primary">Upload</Button>
            </form>
        </Container>

  )
}

export default TestUpLoadForm 