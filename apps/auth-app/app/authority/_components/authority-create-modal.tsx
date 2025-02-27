"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Check, ChevronDown, ChevronsUpDown, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command";
import { cn } from "@workspace/ui/lib/utils";
import { Input } from "@workspace/ui/components/input";
const sites = [
  { label: "Main Site", value: "Main Site" },
  { label: "Secondary Site", value: "Secondary Sit" },
  { label: "Test Site", value: "Test Site" },
];
const AuthorityCreateModal = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newItemKo, setNewItemKo] = useState("");
  const [newItemEn, setNewItemEn] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically add the new item to your data
    console.log("New item:", { siteId: value, ko: newItemKo, en: newItemEn });
    setDialogOpen(false);
    setValue("");
    setNewItemKo("");
    setNewItemEn("");
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> 새 항목 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>새 항목 추가</DialogTitle>
          <DialogDescription>
            새로운 항목의 정보를 입력하세요. 모든 필드를 채워주세요.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? sites.find((framework) => framework.value === value)
                        ?.label
                    : "Select site..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[360px] p-0">
                <Command>
                  <CommandInput placeholder="Search site..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No site found.</CommandEmpty>
                    <CommandGroup>
                      {sites.map((site) => (
                        <CommandItem
                          key={site.value}
                          value={site.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue,
                            );
                            setOpen(false);
                          }}
                        >
                          {site.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === site.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Input
              id="ko"
              placeholder="한국어"
              value={newItemKo}
              onChange={(e) => setNewItemKo(e.target.value)}
            />
            <Input
              id="en"
              placeholder="English"
              value={newItemEn}
              onChange={(e) => setNewItemEn(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">저장</Button>
          </DialogFooter>
        </form>
        {/*<Button className="absolute right-4 top-4" variant="ghost" size="icon" onClick={() => setDialogOpen(false)}>*/}
        {/*  <X className="h-4 w-4" />*/}
        {/*  <span className="sr-only">Close</span>*/}
        {/*</Button>*/}
      </DialogContent>
    </Dialog>
  );
};

export default AuthorityCreateModal;
