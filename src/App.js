import { addDays, differenceInDays, format } from "date-fns";
import { useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
} from "reactstrap";
import "./App.css";
import Test3Component from "./Test3Component";

function App() {
  return (
    <div className="container">
      <h1 className="text-center py-4">Welcome to Resly Coding Challenge</h1>

      <div>
        <p>
          <strong>Instructions</strong>
        </p>
        <p>1. Please use React Hooks for all the tests.</p>
        <p>
          2. We use reactstrap as a front-end UI library. You can find the{" "}
          <a
            href="https://reactstrap.github.io/"
            target="_blank"
            rel="noreferrer"
          >
            documentation here
          </a>
        </p>
      </div>

      <Test1 />
      <Test2 />
      <Test3 />
    </div>
  );
}

const Test1 = () => {
  // TASK
  // 1. Click each fruit button will add 1 for its color in summary result
  // 2. Display the summary in the <div> below. Design it the way how it should look like.
  // Bonus: Try to only use one handleCount function and one state for all buttons

  const [result, setResult] = useState({ red: 0, green: 0, orange: 0 });

  const handleCount = (color) => {
    setResult((prevState) => ({
      ...prevState,
      [color]: prevState[color] + 1,
    }));
  };

  return (
    <Card className="mb-4">
      <CardHeader>Test 1 - Color Count</CardHeader>
      <CardBody className="m-3">
        <div>
          <Button onClick={() => handleCount(`red`)}>🍎</Button>
          <Button className="m-4" onClick={() => handleCount(`green`)}>
            🍏
          </Button>
          <Button className="me-2" onClick={() => handleCount(`orange`)}>
            🍊
          </Button>
          <Button
            color="link"
            onClick={() =>
              setResult({
                red: 0,
                green: 0,
                orange: 0,
              })
            }
          >
            Reset
          </Button>
        </div>

        <h3 className="mt-4">Result:</h3>
        <div>
          <p>🍎 X {result.red}</p>
          <p>🍏 X {result.green}</p>
          <p>🍊 X {result.orange}</p>
        </div>
      </CardBody>
    </Card>
  );
};

const Test2 = () => {
  // TASK
  // 1. Click Go and validate if the date entered is in the future, design an error response if the date is invalid.
  // 2. calculate the date difference from today and display to the end user

  // const [dateValue, setDateValue] = useState();
  const [dateString, setDateString] = useState();

  const tomorrowDateString = useMemo(() => {
    const currentDate = new Date();
    const tomorrow = addDays(currentDate, 1);
    const formattedDate = format(tomorrow, "yyyy-MM-dd");

    return formattedDate;
  }, []);

  const dateDiff = useMemo(() => {
    const today = new Date();
    const selectedDate = new Date(dateString);

    const dateDiff = differenceInDays(selectedDate, today);

    return dateDiff;
  }, [dateString]);

  const handleGo = () => {
    // setDateString(dateValue);
  };

  const renderResult = () => {
    if (!dateString) {
      return (
        <Alert color="warning">
          Please enter or select a valid future date
        </Alert>
      );
    }

    if (dateDiff <= 0) {
      return (
        <Alert color="warning">
          The date entered ({dateString}) is not a future date
        </Alert>
      );
    }

    return (
      <p>
        The date entered ({dateString}) is{" "}
        <strong>
          {dateDiff} {dateDiff === 1 ? `day` : `days`} from today
        </strong>
      </p>
    );
  };

  return (
    <Card className="mb-4">
      <CardHeader>Test 2 - Date</CardHeader>
      <CardBody className="m-3">
        <div className="mb-4">
          <InputGroup>
            <Input
              type="date"
              min={tomorrowDateString}
              value={dateString}
              onChange={(e) => {
                setDateString(e.target.value);
              }}
            />

            <Button onClick={handleGo}>Go</Button>
          </InputGroup>
        </div>

        <h3 className="mt-4">Result:</h3>
        {renderResult()}
      </CardBody>
    </Card>
  );
};

const Test3 = () => {
  // TASK
  // 1. Click the button and fetch a random user from `https://jsonplaceholder.typicode.com/users` using async/await
  // 2. Display the user information in the <div> using your UI design skill, try to utilize the boostrap and reactstrap library and be as creative as you want here.

  return <Test3Component></Test3Component>;
};

export default App;
