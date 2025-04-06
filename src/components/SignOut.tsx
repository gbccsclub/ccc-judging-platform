import { SupabaseClient } from "@supabase/supabase-js";
import { Button } from "flowbite-react";

export interface SignOutProps {
    supabase: SupabaseClient;
}

export const SignOut = ({
    supabase
}: SignOutProps) => {
    return (
        <Button
            color="secondary"
            size='sm'
            onClick={() => supabase.auth.signOut()}
        >
            Sign Out
        </Button>
    );
};