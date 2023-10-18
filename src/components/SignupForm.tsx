import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../redux/api";
import { setUser } from "../redux/userSlice";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const { ref: usernameInputRef, ...usernameInputProps } = register(
    "username",
    {
      required: "Введите имя пользователя",
    }
  );
  const { ref: emailInputRef, ...emailInputProps } = register("email", {
    required: "Введите свой email",
  });
  const { ref: passInputRef, ...passInputProps } = register("password", {
    required: "Введите пароль",
  });

  const [registerUser, { data }] = useRegisterMutation();

  if (data?.username) navigate("/");

  const onSubmit = async (data: FormData) => {
    try {
      const res = await registerUser(data).unwrap();
      console.log(res);
      const { id, username, email } = res;
      dispatch(setUser({ id, email, username }));
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

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
        Регистрация
      </Typography>
      <TextField
        autoFocus
        error={!!errors?.username}
        label={
          errors?.username ? "Введите имя пользователя" : "Имя пользователя"
        }
        style={inputStyle}
        id="name"
        inputRef={usernameInputRef}
        {...usernameInputProps}
      />
      <TextField
        error={!!errors?.email}
        label={errors?.email ? "Введите свой email" : "Email"}
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
          Не удалось зарегестрироваться, попробуйте еще раз
        </Typography>
      )}
      <Button size="large" type="submit" variant="contained">
        Зарегистрироваться
      </Button>
      <Typography>
        У вас уже есть аккаунт? <Link href={"/login"}>Войти</Link>
      </Typography>
    </form>
  );
};

export default SignupForm;
