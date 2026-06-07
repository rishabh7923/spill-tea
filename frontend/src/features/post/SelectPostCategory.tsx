"use client"
import type { Dispatch, SetStateAction } from 'react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const categories = [
  { value: "1", label: "News" },
  { value: "2", label: "Confession" },
  { value: "3", label: "Question" },
  { value: "4", label: "General" },
  { value: "5", label: "Meme" },
  { value: "6", label: "Issue" },
];

export function SelectPostCategory({
  category,
  setCategory,
}: {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}) {
  const selectedLabel =
    categories.find((c) => c.value === category)?.label || "Select Category";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" variant="secondary">
          {selectedLabel}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
            {categories.map((item) => (
              <DropdownMenuRadioItem key={item.value} value={item.value}>
                {item.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}