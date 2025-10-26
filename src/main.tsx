import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // ✅ CORRECTO
import "./index.css";
import { PokemonApiController } from "./Components/PokemonApiController.tsx";
import { MontarEquipoController } from "./MontarEquipoController.tsx";
import { QuizController } from "./QuizController.tsx";
import { SobremiComponent } from "./SobremiComponent.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<PokemonApiController />} />
        <Route path="/equipo" element={<MontarEquipoController />} />
        <Route path="/quiz" element={<QuizController />} />
        <Route path="/sobremi" element={<SobremiComponent />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
