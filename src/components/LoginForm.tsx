import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../redux/api";
import { setUser } from "../redux/userSlice";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const { ref: emailInputRef, ...emailInputProps } = register("email", {
    required: "Введите свой email",
  });
  const { ref: passInputRef, ...passInputProps } = register("password", {
    required: "Введите пароль",
  });

  const [loginUser, { data }] = useLoginMutation();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginUser(data).unwrap();
      console.log(res);
      const { id, email, username } = res;
      dispatch(setUser({ id, email, username }));
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  if (data?.username) navigate("/");

  const inputStyle = {
    width: "40%",
  };

  return (
    <form
      style={{
        margin: "auto",
        display: "flex",
        alignItems: "center",
        gap: "2rem",
        flexDirection: "column",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography sx={{ marginTop: "1rem", fontWeight: 600 }} variant="h3">
        Вход
      </Typography>
      <TextField
        error={!!errors?.email}
        label={errors?.email ? "Введите email" : "Email"}
        style={inputStyle}
        type="email"
        id="email"
        inputRef={emailInputRef}
        {...emailInputProps}
      />
      <TextField
        error={!!errors?.password}
        label={errors?.password ? "Введите пароль" : "Пароль"}
        style={inputStyle}
        type="password"
        id="password"
        inputRef={passInputRef}
        {...passInputProps}
      />
      {error && (
        <Typography sx={{ color: "red" }}>
          Не получилось войти, попробуйте еще раз
        </Typography>
      )}
      <Button size="large" type="submit" variant="contained">
        Войти
      </Button>
      <Typography>
        У вас еще нет аккаунта? <Link href={"/signup"}>Зарегистрироваться</Link>
      </Typography>
    </form>
  );
};

export default LoginForm;
