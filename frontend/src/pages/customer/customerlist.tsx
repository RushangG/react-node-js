import { useQuery, useMutation } from "@apollo/client/react";

import {
  GET_CUSTOMER,
  DELETE_CUSTOMER,
} from "../../Apis/graphql-api/customer-api";
import { useNavigate } from "react-router-dom";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company_id?: number;
}

interface CustomerData {
  customerAll: Customer[];
}

export default function CustomerList() {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_CUSTOMER, {
    fetchPolicy: "network-only",
  }) as {
    data: CustomerData;
    loading: boolean;
    error: Error;
  };


  const [deleteCustomer, { loading: deleting }] = useMutation(DELETE_CUSTOMER, {
    onError: (err) => console.error("Error deleting customer:", err),
  });

  if (loading && !data) {
    return <p>Loading customers...</p>;
  }

  if (error) {
    return <p>Error loading customers: {error.message}</p>;
  }

  async function handleDeleteCustomer(id: number) {
    try {
      let result = await deleteCustomer({
        variables: { id: Number(id) },
        refetchQueries: [{ query: GET_CUSTOMER }],
        awaitRefetchQueries: true,
      });
      console.log("delete customer data", result);
    } catch (err) {
      console.error("Mutation failed", err);
    }
  }

  async function handleEditCustomer(id: number) {
    navigate(`/customer-form`, { state: { customerId: id } });
  }

  return (
    <>
      <div>
        <h1>Customer List</h1>
        <span>
          <button onClick={() => navigate("/customer-form")}>
            Add Customer
          </button>
        </span>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.customerAll.map((customer: Customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.company_id}</td>
                <td>
                  <button onClick={() => handleEditCustomer(customer.id)}>
                    edit
                  </button>
                  <button
                    disabled={deleting}
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
