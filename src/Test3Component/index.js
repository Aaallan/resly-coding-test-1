import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Spinner } from "reactstrap";
import UserInfo from "./UserInfo";

const Test3Component = () => {
  // TASK
  // 1. Click the button and fetch a random user from `https://jsonplaceholder.typicode.com/users` using async/await
  // 2. Display the user information in the <div> using your UI design skill, try to utilize the boostrap and reactstrap library and be as creative as you want here.

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    // get random user
    const user = users[Math.floor(Math.random() * users.length)];

    setUserData(user);
    setLoading(false);
  };

  return (
    <Card className="mb-4">
      <CardHeader>Test 3 - User information</CardHeader>
      <CardBody className="m-3">
        <div>
          <Button disabled={loading} onClick={handleFetch}>
            {!!loading && (
              <>
                <Spinner size="sm">Loading...</Spinner>{" "}
              </>
            )}
            Fetch User
          </Button>
        </div>

        <h3 className="mt-4">Result:</h3>
        <div>{userData && <UserInfo userData={userData}></UserInfo>}</div>
      </CardBody>
    </Card>
  );
};

export default Test3Component;
