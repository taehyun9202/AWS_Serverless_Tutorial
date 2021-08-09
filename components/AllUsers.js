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
        .get(process.env.NEXT_PUBLIC_API_URL)
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

export async function getServerSideProps() {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  return {
    props: {
      hello: "world",
      fetchedUser: null,
    },
  };
}

export default AllUsers;
