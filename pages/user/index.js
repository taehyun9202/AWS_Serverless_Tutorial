import axios from "axios";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const submitHandler = () => {
    let id = uuidv4();
    console.log(id, name, location);
    const newUser = { id: id, name: name, location, location };
    axios
      .post(
        "https://46mvqgfymj.execute-api.us-east-1.amazonaws.com/prod/",
        newUser
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    router.push("/");
  };
  return (
    <div>
      <h3>create New user</h3>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="location"
        />

        <button onClick={() => submitHandler()}>Submit</button>
      </div>
      <Link href="/" passHref>
        <h5>Back to dashboard</h5>
      </Link>
    </div>
  );
};

export default CreateUser;
