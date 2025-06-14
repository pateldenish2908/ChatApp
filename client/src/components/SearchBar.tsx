import { SearchBarProps } from "@/types/chat.interface";
import { Form } from "react-bootstrap";

// Search Bar Component
const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => (
  <div className="p-3">
    <div className="position-relative">
      <i className="fas fa-search position-absolute" style={{ left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }}></i>
      <Form.Control
        type="text"
        className="search-input ps-5"
        placeholder="Search or start new chat"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  </div>
);

export default SearchBar;
