import { UpdatePasswordForm } from "@/components/supabase-ui/UpdatePassword";

function SignUpPage() {
  return (
    <div className='mt-16 flex-1 flex justify-center items-center'>
      <UpdatePasswordForm className='w-xl h-auto' />
    </div>
  );
}

export default SignUpPage;
