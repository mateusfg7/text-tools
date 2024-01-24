import Link from "next/link";
import { Button } from "~/shared/components/button";

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col gap-10 items-center p-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl">Not Found</h2>
        <p className="text-lg">Could not find this page</p>
      </div>
      <Link href="/">
        <Button variant="outline" className="text-lg">
          Return home
        </Button>
      </Link>
    </div>
  );
}
