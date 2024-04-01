import * as React from "react";
import { useAccount } from "wagmi";

import { User } from "@prisma/client";

type UseUserParams = { referrer?: string };

export function useUser({ referrer }: UseUserParams) {
  const { address } = useAccount();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const getUser = async () => {
      if (address) {
        const res = await fetch(
          `/api/user/${address}?ref=${referrer || "null"}`,
          {
            next: { tags: ["user"] },
          }
        );

        const user = await res.json();

        setUser(user);
      }
    };

    getUser();
  }, [address]);

  return user;
}
