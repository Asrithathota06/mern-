const filters = ['all', 'active', 'completed'];

function FilterBar({ current, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filter tasks">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`filter-btn btn-secondary ${current === filter ? 'active' : ''}`}
          onClick={() => onChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
