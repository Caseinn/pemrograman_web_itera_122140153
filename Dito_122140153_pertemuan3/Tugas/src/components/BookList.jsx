import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import PropTypes from "prop-types";
import { Edit, Trash2 } from "lucide-react"; 

export const BookList = ({ books, onEdit, onDelete }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {books.map((b) => (
      <Card
        key={b.id}
        className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <CardContent className="space-y-2 pt-4">
          <h3 className="text-lg font-semibold text-gray-900">{b.title}</h3>
          <p className="text-sm text-gray-500">{b.author}</p>

          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              b.status === "Own"
                ? "bg-green-500 text-white"
                : b.status === "Reading"
                ? "bg-blue-500 text-white"
                : "bg-yellow-500 text-white"
            }`}
          >
            {b.status}
          </span>
        </CardContent>

        <div className="flex gap-2 p-4">
          <Tooltip content="Edit">
            <Button size="sm" variant="outline" onClick={() => onEdit(b)}>
              <Edit className="mr-2" /> Edit
            </Button>
          </Tooltip>
          <Tooltip content="Delete">
            <Button size="sm" variant="destructive" onClick={() => onDelete(b.id)}>
              <Trash2 className="mr-2" /> Delete
            </Button>
          </Tooltip>
        </div>
      </Card>
    ))}
  </div>
);

BookList.propTypes = {
    books: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired, // Assuming the id is a string
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        status: PropTypes.oneOf(["Own", "Reading", "Wishlist"]).isRequired, // Restrict to valid statuses
      })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };
