import { getCandidates } from "@/actions/candidates";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { redirect } from "next/navigation";

export default async function Hiring() {
  const data = await getCandidates();
  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}
