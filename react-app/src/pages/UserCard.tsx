type UserCardProps = {
  userName: string;
  age?: number;
  status: "active" | "inactive";
};

export default function UserCard({ userName, age, status }: UserCardProps) {
  return (
    <>
      <div className="border p-4 rounded shadow-md max-w-sm">
        <h2>User : {userName}</h2>

        <p>Status : {status}</p>
        {age !== undefined && <p>Age : {age}</p>}
      </div>
    </>
  );
}
