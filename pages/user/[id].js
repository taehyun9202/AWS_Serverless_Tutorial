import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://taaj9nm4n7.execute-api.us-east-1.amazonaws.com/prod/user/" + id
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <p>user {id}</p>
    </div>
  );
};

export default User;
