import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Form = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().min(18).required(),
    password: yup.string().min(5).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "passwords doesn't match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="full name" {...register("fullName")} />
      <p>{errors.fullName?.message}</p>
      <input type="text" placeholder="email" {...register("email")} />
      <p>{errors.email?.message}</p>

      <input type="text" placeholder="age" {...register("age")} />
      <p>{errors.age?.message}</p>

      <input type="password" placeholder="password" {...register("password")} />
      <p>{errors.password?.message}</p>

      <input
        type="password"
        placeholder="confirm-password"
        {...register("confirmPassword")}
      />
      <p>{errors.confirmPassword?.message}</p>

      <input type="submit" />
    </form>
  );
};

export default Form;
