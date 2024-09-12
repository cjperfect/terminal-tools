import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "../mock";

createRoot(document.getElementById("root")!).render(<App />);
