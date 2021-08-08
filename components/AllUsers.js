import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!users) {
      axios
        .get("https://46mvqgfymj.execute-api.us-east-1.amazonaws.com/prod/")
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
  }, [users]);

  return (
    <div>
      {!loading ? (
        <>
          <p>All User List</p>
          {users.map((user) => (
            <Link key={user.id} href={`/user/${user.id}`} passHref>
              <div
                style={{
                  background: "#333333",
                  color: "white",
                  width: "400px",
                  cursor: "pointer",
                }}
              >
                <p>ID: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>Location: {user.location}</p>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <>{error ? <p>Something went wrong</p> : <p>Loading...</p>}</>
      )}
    </div>
  );
};

export default AllUsers;
