import Header from "./components/Header";
import Home from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Home />
    </ErrorBoundary>
  );
}
