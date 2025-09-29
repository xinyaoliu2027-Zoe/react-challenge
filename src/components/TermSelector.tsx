import TermButton from './TermButton';

interface TermSelectorProps {
  selection: string;
  setSelection: (term: string) => void;
}

const terms = ['Fall', 'Winter', 'Spring'];

const TermSelector = ({ selection, setSelection }: TermSelectorProps) => (
  <div className="btn-group">
    {terms.map(term => (
      <TermButton 
        key={term} 
        term={term} 
        selection={selection} 
        setSelection={setSelection} 
      />
    ))}
  </div>
);

export default TermSelector;