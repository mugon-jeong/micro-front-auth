"use client";
import React, { useEffect, useState } from "react";
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
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { cn } from "@workspace/ui/lib/utils";
import { Input } from "@workspace/ui/components/input";
import { useTranslations } from "next-intl";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getAllSites } from "../_actions/site-action";
import { useInView } from "react-intersection-observer";
import { createRole } from "../_actions/auth-action";
import { useRouter } from "next/navigation";
interface AuthorityCreateModalProps {
  children?: React.ReactNode;
  siteId?: string;
}

const AuthorityCreateModal = ({
  children,
  siteId,
}: AuthorityCreateModalProps) => {
  const t = useTranslations("Authority.create");
  const { ref, inView } = useInView();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(siteId || "");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newItemKo, setNewItemKo] = useState("");
  const [newItemEn, setNewItemEn] = useState("");
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const router = useRouter();
  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["getAllSites", page, search],
    queryFn: () => getAllSites({ page: page, name: search }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
  const { mutate } = useMutation({
    mutationFn: createRole,
    onSuccess: (response) => {
      setDialogOpen(false);
      setValue("");
      setNewItemKo("");
      setNewItemEn("");
      router.push(`/authority/${response.data.id}`);
    },
  });

  useEffect(() => {
    if (inView && !data?.data.last) {
      setPage(page + 1);
    }
    if (!isPlaceholderData && data?.data.last) {
      queryClient.prefetchQuery({
        queryKey: ["getAllSites", page + 1, search],
        queryFn: () => getAllSites({ page: page + 1, name: search }),
      });
    }
  }, [data, isPlaceholderData, page, queryClient, inView]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    mutate({
      siteId: value,
      ko: newItemKo,
      en: newItemEn,
    });
  };

  const resetForm = () => {
    setValue("");
    setNewItemKo("");
    setNewItemEn("");
    setSearch("");
    setPage(0);
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) {
          resetForm();
          if (siteId) {
            setValue(siteId);
          }
        }
      }}
    >
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> {t("title")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("form.description")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? data?.data.content.find((site) => site.id === value)?.name
                    : t("form.select")}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[360px] p-0">
                <div className="p-2">
                  <Input
                    placeholder={t("form.select")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8"
                  />
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  {data?.data.content.length === 0 && (
                    <div className="p-2 text-sm text-muted-foreground">
                      No site found.
                    </div>
                  )}
                  {data?.data.content.map((site) => (
                    <DropdownMenuItem
                      key={site.id}
                      onSelect={() => {
                        setValue(site.id === value ? "" : site.id);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === site.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {site.name}
                    </DropdownMenuItem>
                  ))}
                  <div ref={ref} className="h-4">
                    {isFetching && (
                      <div className="flex justify-center p-2">
                        <span>Loading more...</span>
                      </div>
                    )}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <Button type="submit">{t("form.submit")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthorityCreateModal;
