import { Form, useActionData } from "react-router-dom";
import { useRef, useEffect } from "react";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  console.log("formData", formData, typeof formData, formData.get("username"));
  const username = formData.get("username");
  return { Message: `Hello ${username} ` };
}

type ActionResponse = {
  Message?: string;
};

export default function InputForm() {
  const actionData = useActionData<ActionResponse>();

  const formRef = useRef<HTMLFormElement>(null);
  console.log("actionData", formRef, typeof formRef, formRef.current);

  useEffect(() => {
    if (actionData?.Message) {
      formRef.current?.reset();
    }
  }, [actionData]);
  return (
    <div className="flex flex-col gap-4 items-center mt-20">
      <Form method="post" ref={formRef} className="flex flex-col gap-4">
        <div>
          <label htmlFor="username">Username:</label>
          <input 
            type="text"
            name="username"
            placeholder="Enter your username"
            className="border border-gray-300 rounded px-2 py-1 ml-2"
            required
          />
          <p className="text-blue-500 mt-2">
            {actionData?.Message ? actionData.Message : "Waiting for input..."}
          </p>
        </div>
        <button
          type="submit"
          className="border border-blue-500 bg-blue-500 text-white rounded px-4 py-2 mt-2"
        >
          Submit
        </button>
      </Form>
    </div>
  );
}
