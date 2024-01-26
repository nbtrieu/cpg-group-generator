// import GroupCpgsFilters from './components/GroupCpgsFilters/GroupCpgsFilters';
import GroupCpgsDropdown from './components/GroupCpgsDropdown/GroupCpgsDropdown';
import AddCpgs from './components/AddCpgs/AddCpgs';
import AddArticles from './components/AddArticles/AddArticles';
import AddFactors from './components/AddFactors/AddFactors';
import AddMicrobes from './components/AddMicrobes/AddMicrobes';
import AddDiseases from './components/AddDiseases/AddDiseases';
import ConnectMicrobesDiseases from './components/ConnectMicrobesDiseases/ConnectMicrobesDiseases';

function App() {
  return (
    <div>
      <main>
        <GroupCpgsDropdown/>
        <AddCpgs/>
        <AddArticles/>
        <AddFactors/>
        <AddMicrobes/>
        <AddDiseases/>
        <ConnectMicrobesDiseases/>
      </main>
    </div>
  );
}

export default App;
