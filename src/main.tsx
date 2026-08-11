import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/context/AuthContext";
import LikeContextProvider from "@/context/LikeContext.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && <ReactQueryDevtools />}
      <AuthProvider>
        <LikeContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LikeContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
