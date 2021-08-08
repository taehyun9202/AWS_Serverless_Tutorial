import axios from "axios";
import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://taaj9nm4n7.execute-api.us-east-1.amazonaws.com/prod/user")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, [users.length]);

  return (
    <div>
      <p>All user List</p>
    </div>
  );
};

// export async function getStaticProps({ params }) {
//   let staticUsers = {};
//   const res = axios
//     .get(`${process.env.API_ADDRESS}/user`)
//     .then((res) => console.log(res.data))
//     .catch((err) => console.log(err));
//   let body = await JSON.parse(res.data.body);
//   staticUsers = body.data.Items;
//   return {
//     props: { staticUsers },
//   };
// }

export default AllUsers;
