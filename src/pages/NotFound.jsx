import { useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.scrollTop = 20;
  }, []);

  return (
    <div className="flex items-center justify-center h-[500px] px-6 md:px-12 lg:px-16">
      <div className="grid justify-center gap-6 w-fit">
        <p className="text-2xl">
          The resource you are looking for does not exist
        </p>

        <Button
          title="Go Home"
          classList="mx-auto px-8 py-2"
          onButtonClick={() => navigate("/")}
        />
      </div>
    </div>
  );
}
