import { Spinner } from "../ui/spinner.jsx";
import { Button } from "../ui/button.jsx";

function Loader({ text = "Loading...", ...props }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button variant="outline" disabled size="sm">
        <Spinner data-icon="inline-start" />
        {text}
      </Button>
    </div>
  );
}

export default Loader;
