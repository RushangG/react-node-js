import { useQuery, useMutation } from "@apollo/client/react";
import "../../index.css";
import {
  GET_CUSTOMER,
  DELETE_CUSTOMER,
} from "../../Apis/graphql-api/customer-api";
import { useNavigate } from "react-router-dom";
import { clientGql } from "../../Apis/graphql-api/graphql-client";
import { gql } from "@apollo/client";
import { useEffect } from "react";

export default function CustomerList() {
  const navigate = useNavigate();

  async function fetchCompanies() {
    const result = (await clientGql.query({
      query: gql`
        query companiesAll {
          companies {
            id
            name
            address
            industry
          }
        }
      `,
    })) as {
      data: {
        companies: {
          id: number;
          name: string;
          address: string;
          industry: string;
        }[];
      };
    };

    console.log("companies result", result.data.companies);
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  const { data, loading, error } = useQuery(GET_CUSTOMER, {
    fetchPolicy: "cache-and-network",
  });
  console.log("customer data", data);

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
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        let result = await deleteCustomer({
          variables: { id: Number(id) },
          refetchQueries: [{ query: GET_CUSTOMER }],
          awaitRefetchQueries: true,
        });
        console.log("Delete result:", result);
      } catch (err) {
        console.error("Mutation failed", err);
      }
    }
  }

  async function handleEditCustomer(id: number) {
    navigate(`/customer-form`, { state: { customerId: id } });
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Customer List</h1>
        <span>
          <button
            onClick={() => navigate("/customer-form")}
            className="border bg-green-200 rounded p-2 text-black ml-5 cursor-pointer hover:bg-green-400"
          >
            Add Customer
          </button>
        </span>

        {data?.customerAll.length === 0 ? (
          <p className="m-6">No customers found.</p>
        ) : (
          <table className="table-auto border-collapse border">
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
            <tbody className="border border-black-300">
              {data?.customerAll.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.company.name}</td>
                  <td>
                    <button
                      className="border p-1 mr-2"
                      onClick={() => handleEditCustomer(customer.id)}
                    >
                      edit
                    </button>
                    <button
                      className="border p-1"
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
