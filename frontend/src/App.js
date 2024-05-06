import Home from "./pages/Home";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
