import { useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client/react";
import {
  GET_CUSTOMER,
  DELETE_CUSTOMER,
} from "../../Apis/graphql-api/customer-api";
type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company_id?: number;
};

interface CustomerData {
  customerAll: Customer[];
}

export default function CustomerList() {
  //   const { data, loading, error, refetch } = useQuery(getCustomerGql) as {
  //     data: CustomerData;
  //     loading: boolean;
  //     error: any;
  //     refetch: () => void;
  //   };

  const { data, loading, error } = useQuery(GET_CUSTOMER);

  const [deleteCustomer, { loading: deleting }] = useMutation(DELETE_CUSTOMER, {
    refetchQueries: [{ query: GET_CUSTOMER }],
    onError: (err) => console.error("Error deleting customer:", err),
  });

  if (loading) {
    return <p>Loading customers...</p>;
  }

  if (error) {
    return <p>Error loading customers: {error.message}</p>;
  }

  async function handleDeleteCustomer(id: number) {
    try {
      let data = await deleteCustomer({
        variables: { id: Number(id) },
      });
      console.log("delete customer data", data);
    } catch (err) {
      console.error("Mutation failed", err);
    }
  }

  return (
    <>
      <div>
        <h1>Customer List</h1>

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
                  <button
                    disabled={deleting}
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    {deleting ? "Deleting..." : "Delete"}
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
