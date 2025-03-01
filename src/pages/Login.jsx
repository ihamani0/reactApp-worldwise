import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  // PRE-FILL FOR DEV PURPOSES  jack@example.com  - qwerty
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthneticated } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();

    if(email &&  password) login(email, password);
  };

  useEffect(() => {
    if (isAuthneticated) {
      navigate("/app/cities", { replace: true });
    }
  }, [isAuthneticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleClick}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClickEvent={handleClick}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
