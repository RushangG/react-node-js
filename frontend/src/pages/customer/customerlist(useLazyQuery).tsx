import { useQuery, useLazyQuery, useMutation } from "@apollo/client/react";

import {
  GET_CUSTOMER,
  DELETE_CUSTOMER,
} from "../../Apis/graphql-api/customer-api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    id: number;
    name: string;
    address: string;
    industry: string;
  };
}

interface CustomerData {
  customerAll: Customer[];
}

export default function CustomerList() {
  const navigate = useNavigate();

  const [fetchCustomers, { data, loading, error }] = useLazyQuery(
    GET_CUSTOMER,
    {
      fetchPolicy: "network-only",
    },
  ) as [() => void, { data: CustomerData; loading: boolean; error: Error }];

  useEffect(() => {
    console.log("customer useEffect data", data);
    fetchCustomers();
  }, [fetchCustomers]);

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
        fetchPolicy: "network-only",
        refetchQueries: [{ query: GET_CUSTOMER }],
      });
      console.log("delete customer data", result);
      console.log("inside delete customer data", data);
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
        <h1 className="text-2xl font-bold mb-4">Customer List</h1>
        <button
          onClick={() => fetchCustomers()}
          className="border bg-green-200 rounded p-2 text-black ml-5"
        >
          fetch Customers
        </button>
        <span>
          <button
            onClick={() => navigate("/customer-form")}
            className="border bg-green-200 rounded p-2 text-black ml-5"
          >
            Add Customer
          </button>
        </span>

        {data?.customerAll.length === 0 ? (
          <p className="m-6">No customers found.</p>
        ) : (
          <table className="table-auto border-collapse border border-gray-300 m-6 w-11/12">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
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
                  <td>{customer.company.name}</td>
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
        )}
      </div>
    </>
  );
}
