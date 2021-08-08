import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      axios
        .get(
          "https://46mvqgfymj.execute-api.us-east-1.amazonaws.com/prod/" + id
        )
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, [user, id]);

  return (
    <div>
      <p>ID: {user?.id}</p>
      <p>Name: {user?.name}</p>
      <p>Location: {user?.location}</p>

      <Link href="/" passHref>
        <h5>Back to dashboard</h5>
      </Link>
    </div>
  );
};

export default User;
