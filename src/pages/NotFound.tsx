import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center px-4">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-2 text-xl text-foreground font-medium">Сторінку не знайдено</p>
        <p className="mb-8 text-muted-foreground">
          На жаль, сторінка за адресою <code className="text-sm bg-secondary px-2 py-1 rounded">{location.pathname}</code> не існує.
        </p>
        <Button asChild className="bg-primary text-primary-foreground hover:bg-steel-dark">
          <a href="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            На головну
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
