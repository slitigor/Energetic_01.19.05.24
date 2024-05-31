import { ThemeProvider } from "./components/theme-provider";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

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
