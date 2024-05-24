import { getCandidateById } from "@/actions/candidates";
import { CandidateForm } from "@/app/(dashboard)/_components/candidate-form";

const ViewPage = async ({ params }: { params: { id: string } }) => {
  const data = await getCandidateById(params.id);
  return (
    <div className=" mx-5">
      {data && (
        <CandidateForm
          initialData={{
            id: data.id,
            name: data.name,
            email: data.email,
            experience: data.experience,
            address: data.address || "",
            province: data.province,
            resume: data.resume,
            status: data.status,
          }}
        />
      )}
    </div>
  );
};

export default ViewPage;
