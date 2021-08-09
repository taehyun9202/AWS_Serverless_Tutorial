import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (!user) {
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + id)
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
      .post(process.env.NEXT_PUBLIC_API_URL, updatedData)
      .then((res) => {
        console.log(res);
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = () => {
    axios
      .delete(process.env.NEXT_PUBLIC_API_URL + id)
      .then((res) => {
        console.log(res);
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {!user ? (
        <p>Unable to get user data</p>
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

// export async function getStaticPaths() {
//   let users = [];
//   const res = await axios.get(process.env.NEXT_PUBLIC_API_URL);
//   users = res.data;
//   const paths = users.map((user) => ({
//     params: { id: user.id },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   console.log(params);
//   const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + params.id);
//   let user = res.data;
//   console.log(user);
//   return {
//     props: { user },
//   };
// }

export default User;
