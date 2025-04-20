import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import PropTypes from "prop-types";

const empty = { id: "", title: "", author: "", status: "" };

export const BookForm = ({ onSubmit, current }) => {
  const [draft, setDraft] = useState(empty);

  useEffect(() => setDraft(current ?? empty), [current]);

  const disabled = !draft.title.trim() || !draft.author.trim() || !draft.status.trim();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ ...draft, id: draft.id || crypto.randomUUID() });
        setDraft(empty);
      }}
      className="flex flex-col gap-4"
    >
      <Input
        placeholder="Title"
        value={draft.title}
        onChange={e => setDraft({ ...draft, title: e.target.value })}
      />
      <Input
        placeholder="Author"
        value={draft.author}
        onChange={e => setDraft({ ...draft, author: e.target.value })}
      />
      <Select
        value={draft.status}
        onValueChange={status => setDraft({ ...draft, status })}
      >
        <SelectTrigger className="w-full">{draft.status || "Select Status"} </SelectTrigger>
        <SelectContent>
          <SelectItem value="Own">Own</SelectItem>
          <SelectItem value="Reading">Reading</SelectItem>
          <SelectItem value="Wishlist">Wishlist</SelectItem>
        </SelectContent>
      </Select>
      <Button disabled={disabled} type="submit">
        {draft.id ? "Update" : "Add"}
      </Button>
    </form>
  );
};

BookForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    current: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      status: PropTypes.oneOf(["Own", "Reading", "Wishlist"]),
    })
  };