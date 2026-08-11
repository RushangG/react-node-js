import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  username: string;
  email: string;
};

export default function UseFormHook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(data: FormData) {
    alert(JSON.stringify(data));
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name:</label>
          <input
            id="username"
            type="text"
            {...register("username", { required: "Name is required" })}
            className="border border-gray-300"
          />
          {errors.username && <span>{errors.username.message}</span>}
          <label>Email:</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="border border-gray-300"
          />
          {errors.email && <span>{errors.email.message}</span>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
