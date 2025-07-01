import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      if (!auth?.token) {
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.get("/api/v1/auth/user-auth", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (data?.ok) setOk(true);
        else navigate("/login");
      } catch (error) {
        localStorage.removeItem("auth");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    authCheck();
  }, [auth?.token, navigate]);

  return loading ? <Spinner /> : ok ? <Outlet /> : null;
}
