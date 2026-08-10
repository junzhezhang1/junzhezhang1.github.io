import type { Metadata } from "next";
import ModernLoginSignup from "@/components/ui/modern-login-signup";

export const metadata: Metadata = {
  title: "Account",
  description: "Login and signup interface demonstration.",
};

export default function LoginPage() {
  return <ModernLoginSignup />;
}
