import CreateWorkspacePage from "@/components/global/create-workspace";

export default function Onboarding() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
          <div className="max-w-md w-full">
            <CreateWorkspacePage/>
          </div>
      </div>
    </>
  )
}