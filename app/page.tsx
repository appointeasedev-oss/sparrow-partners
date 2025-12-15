import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { DASHBOARD_URL } from "@/constants";
import { SignInIcon } from "@/icons";
import { MarketingLayout } from "@/layouts/Marketing";
import { Button } from "@/primitives/Button";
import { Container } from "@/primitives/Container";
import styles from "./page.module.css";

export default async function Index() {
  const session = await auth();

  // If logged in, go to dashboard
  if (session) {
    redirect(DASHBOARD_URL);
  }

  return (
    <MarketingLayout>
      <Container className={styles.section}>
        <div className={styles.heroInfo}>
          <p className={styles.heroLead}>
            Welcome to Sparrow Partners, your internal hub for managing and collaborating on projects. Access your documents, track progress, and stay in sync with your team. Please sign in to continue.
          </p>
        </div>
        <div className={styles.heroActions}>
          <form
            action={async () => {
              "use server";
              await signIn(undefined, { redirectTo: "/signin" });
            }}
          >
            <Button icon={<SignInIcon />}>Sign in</Button>
          </form>
        </div>
      </Container>
    </MarketingLayout>
  );
}
