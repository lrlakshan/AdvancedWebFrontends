import { dataTestIds } from "./tests/constants/components.js";

const App = () => {
  return (
    <div data-testid={dataTestIds.app}>
      <footer>
        <p>Copyright &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;
