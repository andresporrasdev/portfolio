import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="font-heading text-6xl font-bold text-accent">404</h1>
      <p className="mt-4 text-lg text-muted">Page not found</p>
      <div className="mt-8">
        <Button href="/">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
