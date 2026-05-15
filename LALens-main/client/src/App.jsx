import { Route, Routes } from "react-router-dom";
import ShellLayout from "./components/ShellLayout";
import FloatingAssistant from "./components/FloatingAssistant";
import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Methodology from "./pages/Methodology";
import DataSources from "./pages/DataSources";
import Challenge from "./pages/Challenge";
// New portal pages
import Dashboard from "./pages/Dashboard";
import Simulator from "./pages/Simulator";
import Pipeline from "./pages/Pipeline";
import Intake from "./pages/Intake";
import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ShellLayout />}>
          <Route path="/platform" element={<Platform />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/data-sources" element={<DataSources />} />
          <Route path="/challenge" element={<Challenge />} />
        </Route>
        {/* New portal routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/intake" element={<Intake />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <FloatingAssistant />
    </>
  );
}

export default App;
