import Service from "@utils/service";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    Service.verifyToken().then((val) => {
      if (val.isSuccess) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);

  return isAuthenticated;
};

export default useAuth;
