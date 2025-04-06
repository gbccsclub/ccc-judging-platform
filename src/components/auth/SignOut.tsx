import { SupabaseClient } from "@supabase/supabase-js";
import { Button } from "flowbite-react";

export interface SignOutProps {
    supabase: SupabaseClient;
}

export default function SignOut({
    supabase
}: SignOutProps) {
    return (
        <Button
            color="secondary"
            size='xs'
            onClick={() => supabase.auth.signOut()}
        >
            Sign Out
        </Button>
    );
};