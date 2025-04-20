import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import PropTypes from "prop-types";

export const BookFilter = ({ value, onChange }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-40">{value}</SelectTrigger>
    <SelectContent>
      <SelectItem value="All">All</SelectItem>
      <SelectItem value="Own">Own</SelectItem>
      <SelectItem value="Reading">Reading</SelectItem>
      <SelectItem value="Wishlist">Wishlist</SelectItem>
    </SelectContent>
  </Select>
);

BookFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
