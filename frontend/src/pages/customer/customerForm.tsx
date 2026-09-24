import { useEffect, useState } from "react";
import {
  ADD_CUSTOMER,
  GET_CUSTOMER_BY_ID,
  UPDATE_CUSTOMER,
} from "../../Apis/graphql-api/customer-api";
import { useMutation, useQuery } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface CustomerData {
  customer: {
    name: string;
    email: string;
    phone: string;
    company_id: number;
  };
}

export default function CustomerForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const customerId = location.state?.customerId;

  console.log("customerId", customerId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company_id: "",
  });

  const { data } = useQuery(GET_CUSTOMER_BY_ID, {
    variables: { id: Number(customerId) },
    skip: !customerId, // if no customerId, skip the query
  }) as {
    data: CustomerData;
  };

  useEffect(() => {
    if (data && data.customer) {
      setFormData({
        name: data.customer.name,
        email: data.customer.email,
        phone: data.customer.phone,
        company_id: data.customer.company_id.toString(),
      });
    }
  }, [data]);

  const [createCustomer] = useMutation(ADD_CUSTOMER);
  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Form submitted:", formData);

    if (customerId) {
      const result = await updateCustomer({
        variables: {
          id: Number(customerId),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company_id: parseInt(formData.company_id),
        },
      });

      if (result.data) {
        console.log("Customer updated successfully:", result);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company_id: "",
        });
        navigate("/customer-list");
      } else {
        console.error("Error updating customer:", result);
      }
    } else {
      const result = await createCustomer({
        variables: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company_id: parseInt(formData.company_id),
        },
      });

      if (result.data) {
        console.log("Customer created successfully:", result);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company_id: "",
        });
        navigate("/customer-list");
      } else {
        console.error("Error creating customer:", result);
      }
    }
  }

  return (
    <>
      <div className="flex flex-col items-center m-4  min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Customer Form</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              name="name"
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              name="phone"
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="company_id">Company ID:</label>
            <input
              type="text"
              id="company_id"
              value={formData.company_id}
              name="company_id"
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
