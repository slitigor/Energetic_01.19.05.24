import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="py-2 px-4">
        <Header />
        <MainContent />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
