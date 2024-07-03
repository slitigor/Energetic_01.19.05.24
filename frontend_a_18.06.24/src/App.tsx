import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { ThemeProvider } from "./components/theme-provider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DndProvider backend={HTML5Backend}>
        <main className="py-2 px-4">
          <Header />
          <MainContent />
          <Footer />
        </main>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
