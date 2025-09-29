interface TermButtonProps {
  term: string;
  selection: string;
  setSelection: (term: string) => void;
}

const TermButton = ({ term, selection, setSelection }: TermButtonProps) => (
  <div>
    <input 
      type="radio" 
      id={term} 
      className="btn-check" 
      checked={term === selection} 
      autoComplete="off"
      onChange={() => setSelection(term)} 
    />
    <label className="btn btn-success mb-1 p-2" htmlFor={term}>
      {term}
    </label>
  </div>
);

export default TermButton;