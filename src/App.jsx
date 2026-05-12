import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router/AppRouter";
import { Toaster } from "sonner";
import "./index.css";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors closeButton />
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
