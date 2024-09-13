import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "../api/mock";

createRoot(document.getElementById("root")!).render(<App />);
