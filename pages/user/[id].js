import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (!user) {
      axios
        .get(
          "https://46mvqgfymj.execute-api.us-east-1.amazonaws.com/prod/" + id
        )
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [user, id]);

  const handleSubmit = () => {
    const updatedData = {
      ...user,
      name: name.length < 1 ? user.name : name,
      location: location.length < 1 ? user.location : location,
    };
    console.log(updatedData);

    axios
      .post(
        "https://46mvqgfymj.execute-api.us-east-1.amazonaws.com/prod/",
        updatedData
      )
      .then((res) => {
        console.log(res);
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = () => {
    axios
      .delete(
        "https://46mvqgfymj.execute-api.us-east-1.amazonaws.com/prod/" + id
      )
      .then((res) => {
        console.log(res);
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <div>ID: {user.id}</div>
          <div>
            Name:{" "}
            {edit ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={user.name}
              />
            ) : (
              <p>{user.name}</p>
            )}
          </div>
          <div>
            Location:{" "}
            {edit ? (
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={user.location}
              />
            ) : (
              <p>{user.location}</p>
            )}
          </div>

          <h5
            onClick={() => {
              setEdit(!edit);
              setName("");
              setLocation("");
            }}
          >
            {edit ? "Cancel" : "Edit"}
          </h5>
          {edit ? (
            <h5 onClick={() => handleSubmit()}>Apply</h5>
          ) : (
            <h5 onClick={() => handleRemove()}>Remove User</h5>
          )}
          <Link href="/" passHref>
            <h5>Back to dashboard</h5>
          </Link>
        </>
      )}
    </div>
  );
};

export default User;
